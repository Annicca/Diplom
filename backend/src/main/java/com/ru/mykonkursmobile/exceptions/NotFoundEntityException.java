package com.ru.mykonkursmobile.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class NotFoundEntityException extends ResponseStatusException {
    public NotFoundEntityException(HttpStatus status, String message){
        super(status, message);
    }
}
