package com.ru.mykonkursmobile.services;

import com.ru.mykonkursmobile.exceptions.NotFoundEntityException;
import com.ru.mykonkursmobile.interfaces.IPerfomanceService;
import com.ru.mykonkursmobile.models.Participant;
import com.ru.mykonkursmobile.models.Perfomance;
import com.ru.mykonkursmobile.models.StatementParticipant;
import com.ru.mykonkursmobile.repositoryes.PerfomanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@SuppressWarnings("SpringJavaInjectionPointsAutowiringInspection")
@Service
public class PerfomanceService implements IPerfomanceService {

    @Autowired
    PerfomanceRepository repository;

    @Override
    public List<Perfomance> all() {
        return repository.findAll();
    }

    @Override
    public Perfomance add(Perfomance act) {
        return repository.save(act);
    }

    @Override
    public Perfomance update(Perfomance act) throws NotFoundEntityException {
        getById(act.getId());
        return repository.save(act);
    }

    @Override
    public void delete(Integer id) throws NotFoundEntityException {
        Perfomance act = getById(id);
        repository.delete(act);
    }

    @Override
    public Perfomance getById(Integer id) throws NotFoundEntityException {
        return repository.findById(id).orElseThrow(
                () -> new NotFoundEntityException(HttpStatus.NOT_FOUND, "Такого номера не существует")
        );
    }

    public List<Perfomance> setStatement (List<Perfomance> perfomances, StatementParticipant statementParticipant) {
        perfomances.forEach(perfomance -> perfomance.setStatementParticipant(statementParticipant));
        return new ArrayList<>(perfomances);
    }

    public List<Perfomance> setParticipant (List<Perfomance> perfomances, Participant participant) {
        perfomances.forEach(perfomance -> perfomance.setParticipant(participant));
        return new ArrayList<>(perfomances);
    }
}
