package com.randy.springboot.myfirstwebapp.login;

import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {
    public boolean authenticate(String username, String password) {

        boolean isValidUserName = username.equalsIgnoreCase("user1");
        boolean isValidPassword = password.equalsIgnoreCase("pass1");

        return isValidUserName && isValidPassword;
    }
}