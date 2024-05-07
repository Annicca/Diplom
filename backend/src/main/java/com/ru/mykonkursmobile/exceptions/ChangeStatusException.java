package com.ru.mykonkursmobile.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class ChangeStatusException extends ResponseStatusException {
    public ChangeStatusException(HttpStatus status, String message){
        super(status, message);
    }
}
