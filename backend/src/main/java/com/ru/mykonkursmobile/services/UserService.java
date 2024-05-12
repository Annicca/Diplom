package com.ru.mykonkursmobile.services;

import com.ru.mykonkursmobile.dto.AuthenticationRequestDTO;
import com.ru.mykonkursmobile.dto.AuthenticationResponseDTO;
import com.ru.mykonkursmobile.enums.Role;
import com.ru.mykonkursmobile.exceptions.AuthException;
import com.ru.mykonkursmobile.exceptions.JwtAuthenticationException;
import com.ru.mykonkursmobile.exceptions.NotFoundEntityException;
import com.ru.mykonkursmobile.interfaces.IUserService;
import com.ru.mykonkursmobile.models.User;
import com.ru.mykonkursmobile.repositoryes.UserRepository;
import com.ru.mykonkursmobile.security.auth.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.MethodArgumentNotValidException;

@Service
public class UserService implements IUserService {

	@Autowired
	private UserRepository repository;

	@Autowired
	PasswordEncoder passwordEncoder;

	@Autowired
	JwtService jwtService;

	@Autowired
	private AuthenticationManager authenticationManager;

	@Override
	public Page<User> all(Pageable pageable){
		return repository.findAll(pageable);
	}

	@Override
	public AuthenticationResponseDTO register(User user) {

		if(getByLogin(user.getLoginUser()) != null){
			throw new AuthException(HttpStatus.BAD_REQUEST, "Пользователь с таким логином уже существует");
		}
		user.setPasswordUser(passwordEncoder.encode(user.getPasswordUser()));
		user.setRole(Role.CLIENT);

		User registeredUser = repository.save(user);
		registeredUser = getByLogin(registeredUser.getLoginUser());
		String jwtToken = jwtService.generateToken(registeredUser);
		return new AuthenticationResponseDTO(registeredUser, jwtToken);
	}

	@Override
	public AuthenticationResponseDTO authenticate(AuthenticationRequestDTO auth){
		try{

			String login = auth.getLogin();
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(login, auth.getPassword()));

			User user = getByLogin(login);
			if(user == null){
				throw  new UsernameNotFoundException("Пользователь с логином" + login + " не найден");
			}

			String jwtToken = jwtService.generateToken(user);
			return new AuthenticationResponseDTO(user, jwtToken);

		}catch(AuthenticationException e){
			throw new AuthException(HttpStatus.FORBIDDEN, "Неверный логин или пароль");
		}
	}

	@Override
	public User add(User user) throws NotFoundEntityException, DataIntegrityViolationException {
		return repository.save(user);
	}

	@Override
	public User update(User user) throws NotFoundEntityException, DataIntegrityViolationException {
		if(repository.findById(user.getIdUser()).isEmpty()){
			throw new NotFoundEntityException(HttpStatus.NOT_FOUND, "Вы не можете изменить несуществующего пользователя");
		}
		return repository.save(user);
	}

	@Override
	public User getById(Integer id) throws NotFoundEntityException{

		User user = repository.findById(id).orElseThrow(
				() -> new NotFoundEntityException(HttpStatus.NOT_FOUND, "Пользователь не существует")
		);
		return user;
	}


	@Override
	public void delete(Integer id) {
		User user = getById(id);

		repository.delete(user);
	}

	@Override
	public Page<User> findByLogin(String login, Pageable pageable) {
		return repository.findByLogin(login, pageable);
	}

	@Override
	public User getByLogin(String login) {
		return repository.getByLogin(login);
	}

	@Override
	public User changeRole(User user, Role role) throws NotFoundEntityException{
		if(!repository.existsById(user.getIdUser())){
			throw new NotFoundEntityException(HttpStatus.NOT_FOUND, "Вы не можете изменить роль несуществующего пользователя");
		}
		if(user.getRole() != role){
			user.setRole(role);
			return repository.save(user);

		}else return user;
	}

}