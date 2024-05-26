package com.ru.mykonkursmobile.services;

import com.ru.mykonkursmobile.enums.Status;
import com.ru.mykonkursmobile.enums.StatusCompetition;
import com.ru.mykonkursmobile.exceptions.ChangeStatusException;
import com.ru.mykonkursmobile.exceptions.NotFoundEntityException;
import com.ru.mykonkursmobile.exceptions.TakePartException;
import com.ru.mykonkursmobile.interfaces.IStatementParticipant;
import com.ru.mykonkursmobile.models.*;
import com.ru.mykonkursmobile.repositoryes.StatementParticipantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class StatementParticipantService implements IStatementParticipant {

    @Autowired
    StatementParticipantRepository repository;

    @Autowired
    CompetitionService competitionService;

    @Autowired
    GroupService groupService;

    @Autowired
    UserService userService;

    @Autowired
    PerfomanceService perfomanceService;

    @Transactional
    @Override
    public StatementParticipant add(StatementParticipant statementParticipant) {
        Competition competition = competitionService.findById(statementParticipant.getCompetition().getIdCompetition());
        ArtGroup group = groupService.getById(statementParticipant.getGroup().getIdGroup());

        if(competition.getStatusCompetition() != StatusCompetition.CREATED) {
            throw new TakePartException(HttpStatus.BAD_REQUEST, "К сожадению, вы не можете принять участие в конкурсе");
        }

        StatementParticipant existStatement = repository.findFirstByCompetitionAndGroup(competition, group);

        if(existStatement != null) {
            throw new TakePartException(HttpStatus.BAD_REQUEST, "Вы уже отправили заявку на данный конкурс. Подождите пока вашу заявку рассмотрят или проверьте личный кабинет");
        }

        List<Perfomance> perfomanceList = perfomanceService.setStatement(statementParticipant.getPerfomances(), statementParticipant);
        statementParticipant.setPerfomances(perfomanceList);

        Double cost = competition.getCompetitionFee() * statementParticipant.getCountParticipants();
        statementParticipant.setCost(cost);

        return repository.save(statementParticipant);
    }

    @Override
    public StatementParticipant update(StatementParticipant statement) throws NotFoundEntityException {
        if(!repository.existsById(statement.getId())){
            throw new NotFoundEntityException(HttpStatus.BAD_REQUEST,"Такой заявки не существует");
        }
        return repository.save(statement);
    }

    @Override
    public void delete(Integer id) throws NotFoundEntityException {
        StatementParticipant statement = getById(id);

        repository.delete(statement);
    }

    @Override
    public StatementParticipant getById(Integer id) throws NotFoundEntityException {
        StatementParticipant statement = repository.findById(id).orElseThrow(
                ()-> new NotFoundEntityException(HttpStatus.NOT_FOUND, "Такой заявки не существует")
        );
        return statement;
    }

    @Override
    public StatementParticipant accept(Integer id) throws NotFoundEntityException, ChangeStatusException {
        StatementParticipant statementParticipant = getById(id);
        statementParticipant.setStatus(Status.ACCEPTED);
        //добавить в участники
        return repository.save(statementParticipant);
    }

    @Override
    public StatementParticipant reject(Integer id) throws NotFoundEntityException, ChangeStatusException {
        StatementParticipant statement = getById(id);
        statement.setStatus(Status.REJECTED);
        return update(statement);
    }

    @Override
    public Page<StatementParticipant> getByDirectorId(Integer idUser, Pageable pageable) throws NotFoundEntityException {
        User user = userService.getById(idUser);
        return repository.findAll(pageable);
    }

    @Override
    public Page<StatementParticipant> getByCompetition(Integer idCompetition, Pageable pageable) throws NotFoundEntityException {
        Competition competition = competitionService.getById(idCompetition);
        return repository.findAllByCompetition(competition, pageable);
    }
}
