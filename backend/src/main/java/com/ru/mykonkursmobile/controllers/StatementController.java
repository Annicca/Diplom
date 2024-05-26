package com.ru.mykonkursmobile.controllers;

import com.ru.mykonkursmobile.dto.StatementDTO;
import com.ru.mykonkursmobile.exceptions.FileException;
import com.ru.mykonkursmobile.models.Statement;
import com.ru.mykonkursmobile.services.StatementServices;
import jakarta.servlet.ServletContext;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MaxUploadSizeExceededException;

import javax.print.DocFlavor;
import java.io.File;
import java.io.IOException;
import java.net.URL;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
@RequestMapping("/api")
public class StatementController {

//    @Value("${upload.path}")
//    private String uploadPath;
    @Autowired
    ServletContext context;

    @Autowired
    StatementServices service;

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

//    @PostMapping("/statements/{idUser}")
//    public Statement CreateStatement(@PathVariable(value = "idUser") Integer idUser, @ModelAttribute @Valid StatementDTO statement ){
//
//        return service.add(statement);
//    }

    @PostMapping("/statements/{idUser}")
    public Statement CreateStatement(@PathVariable(value = "idUser") Integer idUser, @ModelAttribute @Valid StatementDTO statement ) throws IOException, MaxUploadSizeExceededException, FileException {
        System.out.println("aaa");
        return service.addDto(statement, idUser);
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
