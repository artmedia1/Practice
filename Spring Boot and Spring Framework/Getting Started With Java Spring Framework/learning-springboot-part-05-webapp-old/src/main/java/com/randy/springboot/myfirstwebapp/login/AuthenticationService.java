package com.randy.springboot.myfirstwebapp.login;

import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {

    public boolean authenticate(String username, String password) {

        boolean isValidUserName = username.equalsIgnoreCase("test");
        boolean isValidPassword = password.equalsIgnoreCase("test");

        return isValidUserName && isValidPassword;
    }
}