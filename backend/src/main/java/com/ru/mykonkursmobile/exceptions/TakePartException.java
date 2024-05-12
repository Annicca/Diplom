package com.ru.mykonkursmobile.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class TakePartException extends ResponseStatusException {
    public TakePartException(HttpStatus status, String message){
        super(status, message);
    }
}
