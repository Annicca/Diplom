package com.ru.mykonkursmobile.exceptions;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
@ControllerAdvice
public class AuthExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(AuthException.class)
    protected ResponseEntity<ResponseException> handleException(AuthException ex) {
        ResponseException response = new ResponseException(ex.getReason());
        return new ResponseEntity<>(response, ex.getStatusCode());
    }

}
