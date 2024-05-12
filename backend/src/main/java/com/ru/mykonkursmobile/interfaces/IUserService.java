package com.ru.mykonkursmobile.interfaces;

import com.ru.mykonkursmobile.dto.AuthenticationRequestDTO;
import com.ru.mykonkursmobile.dto.AuthenticationResponseDTO;
import com.ru.mykonkursmobile.enums.Role;
import com.ru.mykonkursmobile.exceptions.AuthException;
import com.ru.mykonkursmobile.exceptions.NotFoundEntityException;
import com.ru.mykonkursmobile.models.User;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface IUserService extends IService<User> {

    /**
     * A method that returns page of users from all users
     * if there are no records an empty page content is returned
     * @return page of the users
     */
    Page<User> all(Pageable pageable);

    /**
     * Method of getting a users whose login like login from the parameter
     * @param login - user login
     * @return list of users whose login is as login from the parameter {@link User}
     */
    Page<User> findByLogin(String login, Pageable pageable);

    /**
     * Method of getting a user whose login is equal to the login from the parameter
     * @param login - user login
     * @return user whose login is equal to the login from the parameter
     * @throws NotFoundEntityException - if user does not exist
     */
    User getByLogin(String login) throws NotFoundEntityException;
    /**
     * User registration method
     * @param user without id (data for registration)
     * @return registered user - see {@link User}
     * @throws AuthException if user with this login already exists
     */
    AuthenticationResponseDTO register(User user) throws AuthException;

    /**
     * User login method
     * @param auth - authorization data (login and password)
     * @return AuthenticationResponseDTO which contains user - see {@link User} and token
     */
    AuthenticationResponseDTO authenticate(AuthenticationRequestDTO auth);

    /**
     * Method for changing the user's role, which checks if the role matches and if it differs, then changes it
     * @param user - the user who needs to change the role
     * @param role - the role to change to
     * @return a user with a role as role in the parameter
     * @throws NotFoundEntityException if user not found
     */
    User changeRole(User user, Role role) throws NotFoundEntityException;

}
