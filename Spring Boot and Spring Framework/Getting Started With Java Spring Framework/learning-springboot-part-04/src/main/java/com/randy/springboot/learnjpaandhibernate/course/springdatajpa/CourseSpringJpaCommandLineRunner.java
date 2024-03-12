package com.randy.springboot.learnjpaandhibernate.course.springdatajpa;

import com.randy.springboot.learnjpaandhibernate.course.Course;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class CourseSpringJpaCommandLineRunner implements CommandLineRunner {
    @Autowired
    private CourseSpringDataJpaRepository repository;

    @Override
    public void run(String... args) throws Exception {
        repository.save(new Course(1,"Learn JPA", "Randy Huynh"));
        repository.save(new Course(2,"Learn JPA 2", "Randy Huynh"));
        repository.save(new Course(3,"Learn JPA 3", "Randy Huynh"));
        repository.save(new Course(3,"Hello!", "Test"));
        repository.deleteById(1l);
        System.out.println(repository.findById(3l));
        System.out.println(repository.findAll());
        System.out.println(repository.count());
        System.out.println(repository.findByAuthor("Test"));
    }
}
