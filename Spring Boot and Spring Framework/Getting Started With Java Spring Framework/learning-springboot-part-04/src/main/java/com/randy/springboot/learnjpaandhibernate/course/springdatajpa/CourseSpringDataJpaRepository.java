package com.randy.springboot.learnjpaandhibernate.course.springdatajpa;

import com.randy.springboot.learnjpaandhibernate.course.Course;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CourseSpringDataJpaRepository extends JpaRepository <Course, Long> {//<Entity managed, PK field type?>
    List<Course> findByAuthor(String author);
    List<Course> findByName(String Name);
}
