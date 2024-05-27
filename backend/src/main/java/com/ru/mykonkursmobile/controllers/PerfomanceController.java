package com.ru.mykonkursmobile.controllers;

import com.ru.mykonkursmobile.models.Perfomance;
import com.ru.mykonkursmobile.services.PerfomanceService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
@RequestMapping("/api")
public class PerfomanceController {
    @Autowired
    PerfomanceService service;

    @PutMapping("/perfomance")
    @ResponseBody
    public Perfomance UpdatePerfomance(@RequestBody @Valid Perfomance perfomance) {
        System.out.println(perfomance.getAward());
        return service.update(perfomance);
    }
}
