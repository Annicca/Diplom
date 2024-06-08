package com.ru.mykonkursmobile.controllers;

import com.ru.mykonkursmobile.dto.GroupChangeDTO;
import com.ru.mykonkursmobile.models.ArtGroup;
import com.ru.mykonkursmobile.services.GroupService;
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
    public ArtGroup UpdateGroup(@ModelAttribute @Valid GroupChangeDTO group) throws IOException {

        return service.update(group);
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
