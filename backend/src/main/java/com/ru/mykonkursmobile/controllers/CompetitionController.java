package com.ru.mykonkursmobile.controllers;

import com.ru.mykonkursmobile.dto.CompetitionChangeDTO;
import com.ru.mykonkursmobile.filter.CompetitionFilter;
import com.ru.mykonkursmobile.models.ArtGroup;
import com.ru.mykonkursmobile.models.Competition;
import com.ru.mykonkursmobile.models.CompetitionUpdate;
import com.ru.mykonkursmobile.models.GroupUpdate;
import com.ru.mykonkursmobile.services.CompetitionService;
import com.ru.mykonkursmobile.services.CompetitionUpdateService;
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

    @Autowired
    CompetitionUpdateService competitionUpdateService;

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

    @GetMapping("/competitions/moderations/all")
    @ResponseBody
    public Page<CompetitionUpdate> GetAllCompetitionsByModeration(@PageableDefault(size = 30)Pageable pageable){
        return competitionUpdateService.all(pageable);
    }

    @GetMapping("/competitions/moderations/{idCompetitionUpdate}")
    @ResponseBody
    public CompetitionUpdate GetGroupByModeration(@PathVariable Integer idCompetitionUpdate){
        return competitionUpdateService.getById(idCompetitionUpdate);
    }

    @PutMapping("/competitions/moderations/passed/{idCompetitionUpdate}")
    @ResponseBody
    public CompetitionUpdate PassedModeration(@PathVariable Integer idCompetitionUpdate) throws IOException {

        return competitionUpdateService.passedUpdate(idCompetitionUpdate);
    }

    @PutMapping("/competitions/moderations/notpassed/{idCompetitionUpdate}")
    @ResponseBody
    public CompetitionUpdate NotPassedModeration(@PathVariable Integer idCompetitionUpdate) {

        return competitionUpdateService.notPassedUpdate(idCompetitionUpdate);
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

    @GetMapping("/mycompetitions/started/{userId}")
    @ResponseBody
    public Page<Competition> GetMyCompetitionsStarted(@PathVariable Integer userId, Pageable pageable){

        return service.getStartedByOrganizerId(userId, pageable);
    }

    @PutMapping("/competitions")
    @ResponseBody
    public CompetitionUpdate UpdateCompetition(@ModelAttribute @Valid CompetitionChangeDTO competition) throws IOException {

        return competitionUpdateService.requestUpdate(competition);
    }

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
