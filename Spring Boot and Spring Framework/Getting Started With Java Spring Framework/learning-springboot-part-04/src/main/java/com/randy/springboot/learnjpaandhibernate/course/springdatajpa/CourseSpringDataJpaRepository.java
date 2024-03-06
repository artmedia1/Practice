package com.randy.springboot.learnjpaandhibernate.course.springdatajpa;

import com.randy.springboot.learnjpaandhibernate.course.Course;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseSpringDataJpaRepository extends JpaRepository <Course, Long> {//<Entity managed, PK field type?>
}
