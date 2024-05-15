package com.ru.mykonkursmobile.controllers;

import com.ru.mykonkursmobile.models.City;
import com.ru.mykonkursmobile.repositoryes.CityRepository;
import com.ru.mykonkursmobile.services.CityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
@RequestMapping("/api")
public class CityController {

    @Autowired
    private CityService service;

    @GetMapping("/cities")
    @ResponseBody
    public List<City> GetAllCities(){
        return service.all();
    }
}
