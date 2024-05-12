package com.ru.mykonkursmobile.controllers;

import com.ru.mykonkursmobile.models.Statement;
import com.ru.mykonkursmobile.models.User;
import com.ru.mykonkursmobile.services.StatementServices;
import com.ru.mykonkursmobile.services.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
@RequestMapping("/api")
public class StatementController {

    @Autowired
    StatementServices service;
    @Autowired
    UserService userService;

    @GetMapping("/statements")
    @ResponseBody
    public Page<Statement> GetAllStatements(@PageableDefault(size = 30) Pageable pageable){

        return service.all(pageable);
    }

    @GetMapping("/statements/search/{idStatement}")
    @ResponseBody
    public Page<Statement> GetAllStatementsById(@PathVariable(value = "idStatement") Integer id, @PageableDefault(size = 50)Pageable pageable){

        return service.findById(id, pageable);
    }

    @GetMapping("/statements/{id}")
    @ResponseBody
    public Statement GetStatementById(@PathVariable Integer id){
        return service.getById(id);
    }

    @GetMapping("/mystatements/{userId}")
    @ResponseBody
    public Page<Statement> GetStatementsByUser(@PathVariable Integer userId, @PageableDefault(size = 50)Pageable pageable){
        return service.getByUserId(userId, pageable);
    }

    @PostMapping("/statements/{idUser}")
    public Statement CreateStatement(@PathVariable(value = "idUser") Integer idUser, @RequestBody @Valid Statement statement ){
        User user = userService.getById(idUser);
        statement.setUser(user);
        return service.add(statement);
    }

    @PutMapping("/statements/accept/{id}")
    public Statement AcceptStatement(@PathVariable Integer id){
        return service.accept(id);
    }

    @PutMapping("/statements/reject/{id}")
    public Statement RejectStatement(@PathVariable Integer id){
        return service.reject(id);
    }
}
