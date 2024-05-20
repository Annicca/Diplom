package com.ru.mykonkursmobile.services;

import com.ru.mykonkursmobile.exceptions.NotFoundEntityException;
import com.ru.mykonkursmobile.interfaces.IActService;
import com.ru.mykonkursmobile.models.Act;
import com.ru.mykonkursmobile.repositoryes.ActRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ActService implements IActService {
    @Autowired
    ActRepository repository;

    @Override
    public List<Act> all() {
        return repository.findAll();
    }

    @Override
    public Act add(Act act) {
        return repository.save(act);
    }

    @Override
    public Act update(Act act) throws NotFoundEntityException {
        return repository.save(act);
    }

    @Override
    public void delete(Integer id) throws NotFoundEntityException {
        Act act = getById(id);
        repository.delete(act);
    }

    @Override
    public Act getById(Integer id) throws NotFoundEntityException {
        return repository.findById(id).orElseThrow(
                () -> new NotFoundEntityException(HttpStatus.NOT_FOUND, "Такого номера не существует")
        );
    }
}
