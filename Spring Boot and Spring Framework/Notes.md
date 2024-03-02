# Spring Boot 3 and Spring Framework 6

## Table of Context
- [Terminology](#terminology)
  - [Tightly Coupled Code](#tightly-coupled-code)
  - [Loosely Coupled Code](#loosely-coupled-code)
- [Spring Bean](#spring-beans)
  - [Simple Spring Bean](#simple-spring-bean)


## Terminology

### Tightly Coupled Code
- **Definition**: Tightly coupled code refers to a scenario where components (classes, modules, functions) are heavily dependent on each other.
- **Characteristics**:
  - Changing one component often requires changes to several other components.
  - Components are hard to reuse because they have so many dependencies on other components.
  - Makes the system harder to understand, maintain, and extend.

### Simple Code Example:

```python
# Example of tightly coupled code

class HardDrive:
    def store_data(self, data):
        print(f"Storing data: {data}")

class Computer:
    def __init__(self):
        # Direct dependency on the HardDrive class
        self.hard_drive = HardDrive()

    def save_data(self, data):
        self.hard_drive.store_data(data)

# Using the Computer class to save data
computer = Computer()
computer.save_data("Some important data")
```

Breaking Change Requirement:
Now, we want the Computer class to support saving data to a cloud service, not just a hard drive. This requirement cannot be met without modifying the Computer class because of its tight coupling with the HardDrive class.

```python
class CloudStorage:
    def store_data(self, data):
        print(f"Saving data to cloud: {data}")

# Attempt to modify Computer class to use CloudStorage instead of HardDrive
class Computer:
    def __init__(self):
        # Now tightly coupled to CloudStorage, but what if we need both options?
        self.storage = CloudStorage()

    def save_data(self, data):
        self.storage.store_data(data)

# Using the modified Computer class to save data to the cloud
computer = Computer()
computer.save_data("Some important data")
```

Problems:
The Computer class is still tightly coupled, but now to CloudStorage instead of HardDrive.
Any change in storage options requires modifications to the Computer class.
This design does not support multiple storage options (e.g., both hard drive and cloud storage) without further complicating the Computer class.



### Loosely Coupled Code
- **Definition**: Loosely coupled code refers to a scenario where components (classes, modules, functions) have fewer dependencies on each other.
- **Characteristics**:
  - Changes in one component require fewer changes to others.
  - Components are easier to reuse because they don't have as many dependencies.
  - Makes the system easier to understand, maintain, and extend.

### Simple Code Example:
```Python 
class StorageInterface:
    def store_data(self, data):
        pass

class HardDrive(StorageInterface):
    def store_data(self, data):
        print(f"Storing data on the hard drive: {data}")

class CloudStorage(StorageInterface):
    def store_data(self, data):
        print(f"Saving data to the cloud: {data}")

class Computer:
    def __init__(self, storage: StorageInterface):
        # Dependency is on an interface, not a concrete class
        self.storage = storage

    def save_data(self, data):
        self.storage.store_data(data)

# Using the Computer class with different storage options
hard_drive = HardDrive()
cloud_storage = CloudStorage()

computer_with_hard_drive = Computer(hard_drive)
computer_with_cloud_storage = Computer(cloud_storage)

computer_with_hard_drive.save_data("Some important data")
computer_with_cloud_storage.save_data("Some important data")
```

This approach makes the Computer class loosely coupled with the storage mechanism. It uses a StorageInterface to interact with any storage type that implements this interface, allowing for flexibility and easier maintenance. Changes to storage mechanisms or adding new ones do not require changes to the Computer class, as long as they implement the StorageInterface. This design supports multiple storage options without complicating the Computer class.

## Spring Beans

### Simple Spring Bean

This code demonstrates how to configure and use Spring beans using annotations like `@Bean`, `@Primary`, and `@Qualifier` within a Spring application.

### Key Concepts

- `@Configuration`: Indicates that the class has `@Bean` definitions. Spring uses it to generate Spring beans.
- `@Bean`: Marks a method to create a Spring bean managed by the Spring container.
- `@Primary`: Designates a bean as the primary candidate for autowiring when multiple beans match a dependency. It's used to give higher preference to a bean.
- `@Qualifier`: Specifies which bean to autowire when there are multiple beans of the same type. It helps in further narrowing down the bean to be used.

### Code Snippets

1. **Person and Address Records**: Simple Java records for Person and Address.
2. **Bean Definitions**: Methods annotated with `@Bean` to define beans for `Person`, `Address`, and basic types like `String` and `Integer`.
3. **Primary Bean**: Using `@Primary` on `person4Parameters` method to indicate it's the primary `Person` bean.
4. **Qualifier Bean**: Using `@Qualifier` with `person5Qualifier` method to specify which address bean to use when creating the person bean.
5. **Address Beans**: Two beans of type `Address` are defined. `@Primary` is used on `address2` to make it the default choice. `@Qualifier` is used to specify `address3` for specific injections.

### Running the Application

- The `AppGamingSpring` class demonstrates how to launch a Spring context and retrieve beans using `getBean` method.
- It showcases how `@Primary` and `@Qualifier` annotations influence the bean selection process.

This setup allows for flexible and maintainable Spring bean configuration, demonstrating the power of Spring's inversion of control (IoC) container.

### Configuration
```Java
package com.randy.learningspringboot.app02springbeansbeginner;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

record Person(String name, int age, Address address){};
record Address(String firstLine, String secondLine) {
}

@Configuration
public class AppGamingSpringConfiguration {
    @Bean
    public String name(){
        return "Randy";
    }

    @Bean
    public Integer age(){
        return 15;
    }

    @Bean
    public Person person(){
        var person = new Person("Randy", 20, new Address("Test", "Test2"));
        return person;
    }

    @Bean
    public Person person2MethodClass(){
        var person = new Person(name(), age(), address2());
        return person;
    }

    @Bean
    public Person person3Parameters(String name, int age, Address address2){
        var person = new Person(name, age, address2);
        return person;
    }

    @Bean
    @Primary
    public Person person4Parameters(String name, int age, Address address){ //This showcases @Primary, takes the primary Address
        var person = new Person(name, age, address);
        return person;
    }

    @Bean
    public Person person5Qualifier(String name, int age, @Qualifier("address3qualifier") Address address){
        var person = new Person(name, age, address);
        return person;
    }

    @Bean(name = "address2")
    @Primary
    public Address address2() {
        return new Address("123 Main St", "Primary Springfield");
    }
    @Bean(name = "address3")
    @Qualifier("address3qualifier")
    public Address address3() {
        return new Address("231 Main St", "Qualifier Springfield");
    }
}
```

### Driver Code
```Java
package com.randy.learningspringboot.app02springbeansbeginner;

import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class AppGamingSpring {
    public static void main(String[] args){
        // Step 1
        // Configure the things we want Spring to manage - @Configuration
        // Step 2
        // Launch a Spring Context
        try(var context = new AnnotationConfigApplicationContext           (AppGamingSpringConfiguration.class)){
            System.out.println(context.getBean("name"));
            System.out.println(context.getBean("age"));
            System.out.println(context.getBean("person"));
            System.out.println(context.getBean("address2"));
            System.out.println(context.getBean("person2MethodClass"));
            System.out.println(context.getBean("person3Parameters"));
            System.out.println(context.getBean("person4Parameters")); //This showcases @Primary
            System.out.println(context.getBean("person5Qualifier"));
            System.out.println(context.getBean(Person.class)); //This showcases @Primary
//        System.out.println(context.getBeanDefinitionNames().getClass().getName());
//        Arrays.stream(context.getBeanDefinitionNames()).forEach(System.out::println);
        }


    }
}
```

### Output
```Randy
15
Person[name=Randy, age=20, address=Address[firstLine=Test, secondLine=Test2]]
Address[firstLine=123 Main St, secondLine=Primary Springfield]
Person[name=Randy, age=15, address=Address[firstLine=123 Main St, secondLine=Primary Springfield]]
Person[name=Randy, age=15, address=Address[firstLine=123 Main St, secondLine=Primary Springfield]]
Person[name=Randy, age=15, address=Address[firstLine=123 Main St, secondLine=Primary Springfield]]
Person[name=Randy, age=15, address=Address[firstLine=231 Main St, secondLine=Qualifier Springfield]]
Person[name=Randy, age=15, address=Address[firstLine=123 Main St, secondLine=Primary Springfield]]
```