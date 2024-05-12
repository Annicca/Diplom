package com.ru.mykonkursmobile.controllers;

import com.ru.mykonkursmobile.models.User;
import com.ru.mykonkursmobile.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
@RequestMapping("/api")
public class UserController{

    @Autowired
    private UserService service;


    @GetMapping("/users")
    @ResponseBody
    public Page<User> GetAllUsers(@PageableDefault(size = 30) Pageable pageable){

        return service.all(pageable);
    }

    @GetMapping("/users/search/{login}")
    @ResponseBody
    public Page<User> GetUsersByLogin(@PathVariable String login, @PageableDefault(size = 1)Pageable pageable){
        return service.findByLogin(login, pageable);
    }

    @GetMapping("/users/{id}")
    @ResponseBody
    public User GetUser(@PathVariable Integer id){

        return service.getById(id);
    }

//    @PostMapping("/users")
//    @ResponseBody
//    public User AddUser(@RequestBody User user){
//        User userResult = service.add(user);
//        return service.getByLogin(userResult.getLoginUser());
//    }

    @PutMapping("/users")
    @ResponseBody
    public User UpdateUser(@RequestBody User user){
        return service.update(user);
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<String> DeleteUser(@PathVariable Integer id){
        service.delete(id);
        return ResponseEntity.status(HttpStatus.OK).body("Успешно удален пользователь с id = " + id);
    }
}
