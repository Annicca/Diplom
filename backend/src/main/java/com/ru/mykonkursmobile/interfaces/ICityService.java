package com.ru.mykonkursmobile.interfaces;

import com.ru.mykonkursmobile.models.City;

import java.util.List;

public interface ICityService {

    /**
     * Get all city
     * @return List of city
     */
    List<City> all();

    /**
     * get city by id
     * @param id - id city
     * @return city - see {@link City}
     */
    City getById(Integer id);
}
