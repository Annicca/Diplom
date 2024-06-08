package com.ru.mykonkursmobile.controllers;

import com.ru.mykonkursmobile.models.Participant;
import com.ru.mykonkursmobile.services.ParticipantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
@RequestMapping("/api")
public class ParticipantController {

    @Autowired
    ParticipantService service;

    @GetMapping("/participant/competition/{id}")
    @ResponseBody
    public Page<Participant> GetAllByCompetition(@PathVariable Integer id, @PageableDefault(size = 30) Pageable pageable){
        return service.allByCompetition(pageable, id);
    }

    @GetMapping("/participant/{idCompetition}/{idGroup}")
    @ResponseBody
    public Participant GetByCompetitionAndGroup(@PathVariable Integer idCompetition, @PathVariable Integer idGroup){
        return service.getById(idCompetition, idGroup);
    }
}
