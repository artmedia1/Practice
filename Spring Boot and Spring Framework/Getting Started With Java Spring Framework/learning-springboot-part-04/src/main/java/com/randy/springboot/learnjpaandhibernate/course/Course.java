package com.randy.springboot.learnjpaandhibernate.course;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import org.springframework.stereotype.Component;

@Entity //(name="Course_Details") Note, this is not needed because database column name and variable name matches, if our table name is Course_Details instead we would.
public class Course {

    @Id
    private long id;

//    @Column(name="name") Note, this is not needed because database column name and variable name matches
    private String name;

//    @Column(name="author") Note, this is not needed because database column name and variable name matches
    private String author;

    public Course(){

    }

    public Course(long id, String name, String author) {
        this.id = id;
        this.name = name;
        this.author = author;
    }

    public long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getAuthor() {
        return author;
    }

    public void setId(long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    @Override
    public String toString() {
        return "Course{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", author='" + author + '\'' +
                '}';
    }
}
