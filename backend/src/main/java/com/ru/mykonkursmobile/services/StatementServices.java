package com.ru.mykonkursmobile.services;

import com.ru.mykonkursmobile.dto.StatementDTO;
import com.ru.mykonkursmobile.enums.*;
import com.ru.mykonkursmobile.exceptions.ChangeStatusException;
import com.ru.mykonkursmobile.exceptions.FileException;
import com.ru.mykonkursmobile.exceptions.NotFoundEntityException;
import com.ru.mykonkursmobile.interfaces.IStatementService;
import com.ru.mykonkursmobile.models.*;
import com.ru.mykonkursmobile.repositoryes.StatementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class StatementServices implements IStatementService {
    @Autowired
    StatementRepository repository;

    @Autowired
    UserService userService;

    @Autowired
    CompetitionService competitionService;

    @Autowired
    GroupService groupService;

    @Autowired
    CityService cityService;

    @Autowired
    private FileService fileServise;

    @Override
    public Page<Statement> all(Pageable pageable) {
        return repository.findAllByOrderByStatusStatement(pageable);
    }

    @Override
    public Statement add(Statement statement) {
        return repository.save(statement);
    }

    public Statement addDto(StatementDTO statementDto, Integer idUser) throws NotFoundEntityException, IOException, FileException {
        User user = userService.getById(idUser);
        City city = cityService.getById(statementDto.getIdCity());
        Statement statement = new Statement(
                user,
                statementDto.getType(),
                statementDto.getName(),
                statementDto.getDescription(),
                city,
                statementDto.getAddress(),
                statementDto.getDateStart(),
                statementDto.getDateFinish(),
                statementDto.getCompetitionFee()
        );
        if( statementDto.getRegulation() != null){
            statement.setRegulation(fileServise.saveFile(statementDto.getRegulation()));
        }
        if( statementDto.getRules() != null){
            statement.setRules(fileServise.saveFile(statementDto.getRules()));
        }
        return repository.save(statement);
    }

    @Override
    public Statement update(Statement statement) throws NotFoundEntityException {
        if(!repository.existsById(statement.getIdStatement())){
            throw new NotFoundEntityException(HttpStatus.BAD_REQUEST,"Такой заявки не существует");
        }
        return repository.save(statement);
    }


    @Override
    public Statement getById(Integer id) throws NotFoundEntityException {
        Statement statement = repository.findById(id).orElseThrow(
                ()-> new NotFoundEntityException(HttpStatus.NOT_FOUND, "Такой заявки не существует")
        );
        return statement;
    }

    @Override
    public Page<Statement> getByUserId(Integer idUser, Pageable pageable) throws NotFoundEntityException {
        User user = userService.getById(idUser);
        return  repository.findAllByUserId(user.getIdUser(), pageable);
    }

    @Override
    public Statement accept(Integer id) throws NotFoundEntityException, ChangeStatusException, DataIntegrityViolationException {

        Statement statement = getById(id);
        if(statement.getStatusStatement() != null){
            throw new ChangeStatusException(HttpStatus.BAD_REQUEST, "Вы не можете изменить статус заявки, так как у неё уже есть статус");
        }

        statement.setStatusStatement(Status.ACCEPTED);

        User user = userService.getById(statement.getUser().getIdUser());

        if(statement.getType() == TypeStatement.GROUP && (user.getRole() == Role.DIRECTOR || user.getRole() == Role.CLIENT)){
            ArtGroup group = new ArtGroup(
                    statement.getUser(),
                    statement.getName(),
                    statement.getDescription(),
                    statement.getCity(),
                    statement.getAddress()
            );
            groupService.add(group);
            if(user.getRole() == Role.CLIENT) {
                userService.changeRole(user, Role.DIRECTOR);
            }
        } else if(statement.getType() == TypeStatement.COMPETITION && (user.getRole() == Role.ORGANIZER || user.getRole() == Role.CLIENT)){
            Competition competition = new Competition(
                                statement.getUser(),
                                statement.getName(),
                                statement.getDescription(),
                                statement.getDateStart(),
                                statement.getDateFinish(),
                                statement.getCity(),
                                StatusCompetition.CREATED,
                                statement.getCompetitionFee(),
                                StatusModeration.PASSED,
                                statement.getRules(),
                                statement.getRegulation()
                        );
            competitionService.add(competition);
            if(user.getRole() == Role.CLIENT) {
                userService.changeRole(user, Role.ORGANIZER);
            }
        } else{
            throw new ChangeStatusException(HttpStatus.BAD_REQUEST,"Не удалось разместить коллектив или конкурс. Возможно пользователь имеет неподходящую роль");
        }
        return update(statement);
    }

    @Override
    public Statement reject(Integer id) throws NotFoundEntityException, ChangeStatusException {
        Statement statement = getById(id);
        if(statement.getStatusStatement() != null){
            throw new ChangeStatusException(HttpStatus.BAD_REQUEST, "Вы не можете изменить статус заявки, так как у неё уже есть статус");
        } else{
            statement.setStatusStatement(Status.REJECTED);
        }

        return update(statement);
    }

    @Override
    public void delete(Integer id) throws NotFoundEntityException{
        Statement statement = getById(id);
        repository.delete(statement);
    }


    @Override
    public Page<Statement> findById(Integer id, Pageable pageable){
        return repository.findAllByIdStatement(id, pageable);
    }

}
