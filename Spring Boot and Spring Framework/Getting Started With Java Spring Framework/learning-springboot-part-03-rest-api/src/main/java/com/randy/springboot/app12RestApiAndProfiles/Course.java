package com.randy.springboot.app12RestApiAndProfiles;

public class Course {
    private long id;
    private String name;
    private String Author;

    public Course(long id, String name, String author) {
        this.id = id;
        this.name = name;
        Author = author;
    }

    public long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getAuthor() {
        return Author;
    }

    @Override
    public String toString() {
        return "Course{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", Author='" + Author + '\'' +
                '}';
    }
}
