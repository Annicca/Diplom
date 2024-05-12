package com.ru.mykonkursmobile.controllers;

import com.ru.mykonkursmobile.dto.AuthenticationRequestDTO;
import com.ru.mykonkursmobile.dto.AuthenticationResponseDTO;
import com.ru.mykonkursmobile.models.User;
import com.ru.mykonkursmobile.services.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
@RequestMapping("/api")
public class AuthorizationController {

    @Autowired
    private UserService service;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody @Valid AuthenticationRequestDTO auth){

        return ResponseEntity.ok(service.authenticate(auth));

    }

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody @Valid User user){
        AuthenticationResponseDTO auth = service.register(user);

        return ResponseEntity.ok(auth);
    }
}
