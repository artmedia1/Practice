//package com.randy.springboot.learnjpaandhibernate.course.jpa;
//
//import com.randy.springboot.learnjpaandhibernate.course.Course;
//import com.randy.springboot.learnjpaandhibernate.course.jdbc.CourseJdbcRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.stereotype.Component;
//
//@Component
//public class CourseJpaCommandLineRunner implements CommandLineRunner {
//    @Autowired
//    private CourseJpaRepository repository;
//
//    @Override
//    public void run(String... args) throws Exception {
//        repository.insert(new Course(1,"Learn JPA", "Randy Huynh"));
//        repository.insert(new Course(2,"Learn JPA 2", "Randy Huynh"));
//        repository.insert(new Course(3,"Learn JPA 3", "Randy Huynh"));
//        repository.deleteById(1);
//        System.out.println(repository.findById(3));
//    }
//}