package com.ru.mykonkursmobile.controllers;

import com.ru.mykonkursmobile.models.Invitation;
import com.ru.mykonkursmobile.services.InvitationService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
@RequestMapping("/api/invitations")
public class InvitationController {

    @Autowired
    InvitationService service;

    @GetMapping("/{idGroup}")
    public Page<Invitation> GetByGroup(@PathVariable Integer idGroup, @PageableDefault Pageable pageable){
        return service.getByGroup(idGroup, pageable);
    }

    @GetMapping("/{idCompetition}")
    public Page<Invitation> GetByCompetition(@PathVariable Integer idCompetition, @PageableDefault Pageable pageable){
        return service.getByGroup(idCompetition, pageable);
    }

    @PostMapping
    public Invitation AddInvitation(@Valid Invitation invitation ) {
        return service.add(invitation);
    }

    @PutMapping("/accept/{id}")
    public Invitation AcceptInvitation(@PathVariable Integer id){
        return service.accept(id);
    }

    @PutMapping("/reject/{id}")
    public Invitation RejectInvitation(@PathVariable Integer id){
        return service.reject(id);
    }
}
