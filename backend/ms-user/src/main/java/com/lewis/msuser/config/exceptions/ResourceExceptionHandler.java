package com.lewis.msuser.config.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import javax.servlet.http.HttpServletRequest;
import java.time.Instant;

@ControllerAdvice
public class ResourceExceptionHandler {

        @ExceptionHandler(value = IllegalArgumentException.class)
        protected ResponseEntity<StandardError> illegalArgumentException(IllegalArgumentException exception, HttpServletRequest request)
        {
            String messageError = "Invalid Input please verify!";
            HttpStatus status = HttpStatus.BAD_REQUEST;

            StandardError standardError =  new StandardError(
                Instant.now(),status.value(), exception.getMessage(), messageError,request.getRequestURI()
            );

            return ResponseEntity.badRequest().body(standardError);
        }

        @ExceptionHandler(value= NullPointerException.class)
        protected  ResponseEntity<StandardError> NullPointException(NullPointerException exception, HttpServletRequest request)
        {
            String messageError = "Invalid ID user Not Found:";
            HttpStatus status = HttpStatus.NOT_FOUND;
            StandardError standardError = new StandardError(
                    Instant.now(), status.value(), exception.getMessage(), messageError, request.getRequestURI()
            );
            
            return ResponseEntity.status(status).body(standardError);
        }

}
