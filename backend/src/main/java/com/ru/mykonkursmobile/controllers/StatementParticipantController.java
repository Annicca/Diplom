package com.ru.mykonkursmobile.controllers;

import com.ru.mykonkursmobile.models.StatementParticipant;
import com.ru.mykonkursmobile.services.StatementParticipantService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/api/statementsparticipant")
public class StatementParticipantController {

    @Autowired
    StatementParticipantService service;

//    @GetMapping("/{id}")
//    @ResponseBody
//    public StatementParticipant GetStatementParticipantById(@PathVariable Integer id){
//        return service.getById(id);
//    }

    @GetMapping("/{idDirector}")
    @ResponseBody
    public Page<StatementParticipant> GetStatementParticipantByDirector(@PathVariable(value = "idDirector")  Integer idDirector, @PageableDefault Pageable pageable){
        return service.getByDirectorId(idDirector, pageable);
    }

    @GetMapping("competition/{idCompetition}")
    @ResponseBody
    public Page<StatementParticipant> GetStatementParticipantByCompetition(@PathVariable(value = "idCompetition")  Integer idCompetition, @PageableDefault Pageable pageable){
        return service.getByCompetition(idCompetition, pageable);
    }

    @PostMapping
    public StatementParticipant CreateStatementParticipant( @RequestBody @Valid StatementParticipant statement ){
        return service.add(statement);
    }

    @PutMapping("/accept/{id}")
    public StatementParticipant AcceptStatementParticipant(@PathVariable Integer id){
        return service.accept(id);
    }

    @PutMapping("/reject/{id}")
    public StatementParticipant RejectStatementParticipant(@PathVariable Integer id){
        return service.reject(id);
    }
}
