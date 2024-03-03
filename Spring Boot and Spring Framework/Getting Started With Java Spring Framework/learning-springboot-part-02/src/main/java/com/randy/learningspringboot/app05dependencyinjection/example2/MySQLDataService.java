package com.randy.learningspringboot.app05dependencyinjection.example2;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class MySQLDataService implements DataService {
    @Override
    public int[] retrieveData() {
        return new int[]{1,2,3,4,5};
    }
}
