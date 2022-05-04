package com.lutiick.springreactcatsapp.exceptions;

public class NoIdExistException extends Exception{
    public NoIdExistException(String errorMessage) {
        super(errorMessage);
    }
}
