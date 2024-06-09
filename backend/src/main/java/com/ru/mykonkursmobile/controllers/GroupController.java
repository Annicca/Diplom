package com.ru.mykonkursmobile.controllers;

import com.ru.mykonkursmobile.dto.GroupChangeDTO;
import com.ru.mykonkursmobile.models.ArtGroup;
import com.ru.mykonkursmobile.models.GroupUpdate;
import com.ru.mykonkursmobile.services.GroupService;
import com.ru.mykonkursmobile.services.GroupUpdateService;
import jakarta.annotation.Nullable;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
@RequestMapping("/api")
public class GroupController {

    @Autowired
    GroupService service;

    @Autowired
    GroupUpdateService groupUpdateService;

    @GetMapping("/groups")
    @ResponseBody
    public Page<ArtGroup> GetAllGroupsByCity(@RequestParam @Nullable String city, @PageableDefault(size = 30)Pageable pageable){

        if(city == null) {
            return service.all(pageable);
        } else {
            return service.getByCity(pageable, city);
        }
    }

    @GetMapping("/groups/all")
    @ResponseBody
    public Page<ArtGroup> GetAllGroups(@PageableDefault(size = 30)Pageable pageable){
        return service.all(pageable);
    }

    @GetMapping("/groups/{id}")
    @ResponseBody
    public ArtGroup GetGroupById(@PathVariable Integer id){
        return service.getById(id);
    }

    @PutMapping("/groups")
    @ResponseBody
    public GroupUpdate UpdateGroup(@ModelAttribute @Valid GroupChangeDTO group) throws IOException {

        return groupUpdateService.requestUpdate(group);
    }

    @GetMapping("/groups/moderations/all")
    @ResponseBody
    public Page<GroupUpdate> GetAllGroupsByModeration(@PageableDefault(size = 30)Pageable pageable){
        return groupUpdateService.all(pageable);
    }

    @GetMapping("/groups/moderations/{idGroupUpdate}")
    @ResponseBody
    public GroupUpdate GetGroupByModeration(@PathVariable Integer idGroupUpdate){
        return groupUpdateService.getById(idGroupUpdate);
    }

    @PutMapping("/groups/moderations/passed/{idGroupUpdate}")
    @ResponseBody
    public GroupUpdate PassedModeration(@PathVariable Integer idGroupUpdate) throws IOException {

        return groupUpdateService.passedUpdate(idGroupUpdate);
    }

    @PutMapping("/groups/moderations/notpassed/{idGroupUpdate}")
    @ResponseBody
    public GroupUpdate NotPassedModeration(@PathVariable Integer idGroupUpdate) throws IOException {

        return groupUpdateService.notPassedUpdate(idGroupUpdate);
    }

    @GetMapping("/mygroups/{userId}")
    @ResponseBody
    public Page<ArtGroup> GetMyGroups(@PathVariable Integer userId, @PageableDefault Pageable pageable){

        return service.getByDirectorId(userId, pageable);
    }

    @GetMapping("/mygroups/list/{userId}")
    @ResponseBody
    public List<ArtGroup> GetMyGroups(@PathVariable Integer userId){

        return service.getListByDirectorId(userId);
    }

    @DeleteMapping("/groups/{id}")
    @ResponseBody
    public Page<ArtGroup> DeleteGroup(@PathVariable Integer id, @PageableDefault(size = 1)Pageable pageable){
        service.delete(id);
        return service.all(pageable);
    }

//    @GetMapping("/mycompetitions/participants/{id}")
//    @ResponseBody
//    public List<ArtGroup> GetParticipants(@PathVariable Integer id){
//        return service.getParticipant(id);
//    }

    @GetMapping("/mycompetitions/participants/{id}")
    @ResponseBody
    public Page<ArtGroup> GetParticipants(@PathVariable Integer id, @PageableDefault Pageable pageable){
        return service.getPageParticipants(id, pageable);
    }
}
