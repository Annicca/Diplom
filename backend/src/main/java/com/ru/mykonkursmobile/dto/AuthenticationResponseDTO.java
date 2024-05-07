package com.ru.mykonkursmobile.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ru.mykonkursmobile.models.User;

public class AuthenticationResponseDTO {
    @JsonProperty("user")
    private User authUser;
    private String token;

    public User getAuthUser() {
        return authUser;
    }

    public void setAuthUser(User authUser) {
        this.authUser = authUser;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public AuthenticationResponseDTO(User user,String token){
        this.authUser = user;
        this.token = token;
    }
}
