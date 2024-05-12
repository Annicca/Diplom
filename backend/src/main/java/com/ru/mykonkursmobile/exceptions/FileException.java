package com.ru.mykonkursmobile.exceptions;

import org.springframework.http.HttpStatusCode;
import org.springframework.web.server.ResponseStatusException;

public class FileException extends ResponseStatusException {
    public FileException(HttpStatusCode status, String reason) {
        super(status, reason);
    }
}
