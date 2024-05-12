package com.ru.mykonkursmobile.services;

import com.ru.mykonkursmobile.exceptions.NotFoundEntityException;
import com.ru.mykonkursmobile.interfaces.ICityService;
import com.ru.mykonkursmobile.models.City;
import com.ru.mykonkursmobile.repositoryes.CityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CityService implements ICityService {

    @Autowired
    private CityRepository repository;

    public List<City> all(){
        return repository.findAll();
    }


    public City getById(Integer id) {
        return repository.findById(id).orElseThrow(
                () -> new NotFoundEntityException(HttpStatus.NOT_FOUND, "Такого города не существует")
        );
    }
}
