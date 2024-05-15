package com.ru.mykonkursmobile.controllers;

import com.ru.mykonkursmobile.dto.CompetitionChangeDTO;
import com.ru.mykonkursmobile.filter.CompetitionFilter;
import com.ru.mykonkursmobile.models.ArtGroup;
import com.ru.mykonkursmobile.models.Competition;
import com.ru.mykonkursmobile.services.CompetitionService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173", "http://localhost:5174"})
@RequestMapping("/api")
public class CompetitionController {

    @Autowired
    private CompetitionService service;

    @GetMapping("/competitions")
    @ResponseBody
    public Page<Competition> GetAllCompetitions(CompetitionFilter filter, @PageableDefault(size = 30)Pageable pageable){
        return service.filterCompetition(filter, pageable);

    }

    @GetMapping("/competitions/all")
    @ResponseBody
    public Page<Competition> GetAdminAllCompetitions(CompetitionFilter filter, @PageableDefault(size = 30)Pageable pageable){
        return service.getAll(pageable);

    }

    @GetMapping("/competitions/{id}")
    @ResponseBody
    public Competition GetCompetition(@PathVariable Integer id){

        return service.getById(id);
    }

    @GetMapping("/mycompetitions/{userId}")
    @ResponseBody
    public Page<Competition> GetMyCompetitions(@PathVariable Integer userId, @PageableDefault(size = 30)Pageable pageable){

        return service.getByOrganizerId(userId, pageable);
    }

    @PutMapping("/competitions")
    @ResponseBody
    public ResponseEntity UpdateCompetition(@ModelAttribute @Valid CompetitionChangeDTO competition) throws IOException {

        try {
            return ResponseEntity.ok(service.update(competition));
        }catch(IOException e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

//    @PutMapping("/competitions")
//    @ResponseBody
//    public ResponseEntity UpdateCompetitionJson(@RequestBody @Valid CompetitionChangeDTO competition) throws IOException {
//
//        try {
//            return ResponseEntity.ok(service.update(competition));
//        }catch(IOException e){
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
//        }
//    }

    @PutMapping("/competitions/cancel/{id}")
    @ResponseBody
    public Page<Competition> CancelCompetition(@PathVariable Integer id, @PageableDefault(size = 30)Pageable pageable){

        return service.cancel(id, pageable);
    }

    @PutMapping("/competitions/participants/{idCompetition}/{idGroup}")
    @ResponseBody
    public ResponseEntity<String> TakePart(@PathVariable Integer idCompetition, @PathVariable Integer idGroup){
        service.takePart(idCompetition, idGroup);
        return ResponseEntity.status(HttpStatus.OK).body("Вы приняли участие в конкурсе");
    }

    @GetMapping("mygroups/competitions/{id}")
    @ResponseBody
    public Page<Competition> GetMyGroupsCompetitions(@PathVariable Integer id, @PageableDefault(size = 10)Pageable pageable){
        return service.getCompetitionByGroup(id ,pageable);
    }

}
