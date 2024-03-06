package com.randy.springboot.app12RestApiAndProfiles;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
public class CourseController {
    @RequestMapping("/courses")
    public List<Course> retrieveAllCourses(){
        return Arrays.asList(
                new Course(1, "Learn AWS", "Randy Huynh"),
                new Course(2, "Learn DevOps", "Randy Huynh"),
                new Course(3, "Learn Azure", "Randy Huynh"),
                new Course(4, "Learn Java", "Randy Huynh"),
                new Course(5, "Learn Java", "Randy Huynh"),
                new Course(6, "Learn Java", "Randy Huynh"),
                new Course(7, "Learn Java", "Randy Huynh"),
                new Course(8, "Learn Java", "Randy Huynh")
        );
    }
}
