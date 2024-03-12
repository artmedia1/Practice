# Spring Boot 3 and Spring Framework 6

## Table of Contents
- [Terminology](#terminology)
  - [Tightly Coupled Code](#tightly-coupled-code)
  - [Loosely Coupled Code](#loosely-coupled-code)
  - [Annotations and Descriptions](#annotations-and-descriptions)
  - [Important Spring Concepts](#important-spring-concepts)
- [Spring Core](#spring-core)
  - [Understanding Dependencies in Spring](#understanding-dependencies-in-spring)
  - [When to Use `@Autowired`](#using-autowired-in-spring)
  - [Simple Spring Bean](#simple-spring-bean)
  - [Auto Created Spring Bean](#auto-created-spring-bean)
  - [`@Primary` vs `@Qualifier`](#primary-vs-qualifier---which-one-to-use)
  - [`@Component` vs `@Bean`](#component-vs-bean)
  - [Lazy vs Eager Initialization](#comparing-lazy-initialization-vs-eager-initialization)
  - [Bean Scopes - Prototype and Singleton](#bean-scopes---prototype-and-singleton)
  - [Spring Boot `@PreConstruct` and `@PostDestroy` Annotations](#spring-boot-preconstruct-and-postdestroy-annotations)
  - [Evolution of Jakarta EE: vs J2EE vs Java EE](#evolution-of-jakarta-ee-vs-j2ee-vs-java-ee)
  - [Jakarta Contexts & Dependency Injection (CDI)](#jakarta-contexts--dependency-injection-cdi)
  - [Spring Stereotype Annotations - `@Component` & more..](#spring-stereotype-annotations---component--more)
  - [Annotations and Descriptions Review](#annotations-and-descriptions-review)
  - [Important Spring Concepts Review](#important-spring-concepts-review)
- [Spring Framework](#spring-framework)
  - [Spring Big Picture - Framework and Modules](#spring-big-picture---framework-and-modules)
  - [Spring Big Picture - Spring Projects](#spring-big-picture---spring-projects)
  - [Spring Big Picture - Framework, Modules and Projects](#spring-big-picture---framework-modules-and-projects)
- [Spring Boot](#spring-boot)
  - [Getting Started with Spring Boot - Approach](#getting-started-with-spring-boot---approach)
  - [Goal of Spring Boot](#goal-of-spring-boot)
  - [Spring Boot Starter Projects](#exploring-spring-boot-starter-projects)
  - [Spring Boot Auto Configuration](#exploring-spring-boot-auto-configuration)
  - [Spring Boot Devtools](#build-faster-with-spring-boot-devtools)
  - [Profiles in Spring Boot](#managing-app-configuration-using-profiles)
  - [Spring Boot Actuator](#why-is-actuator-important)
  - [Spring Ecosystem Review](#understanding-spring-boot-vs-spring-mvc-vs-spring-review)
- [JPA and Hibernate](#jpa-and-hibernate)
    - [Learning JPA and Hibernate with Spring Boot](#learning-jpa-and-hibernate---approach)
    - [JDBC vs Spring JDBC vs JPA vs Spring Data JPA](#jdbc-to-spring-jdbc-to-jpa-to-spring-data-jpa)
    - [Hardcoded Spring JDBC Insertion Example](#hardcoded-spring-jdbc-entry)
    - [Dynamic JDBC Queries](#dynamic-jdbc-queries)
    - [JPA Integration in Spring Boot](#jpa-integration-in-spring-boot)
    - [Spring Data JPA](#spring-data-jpa-integration)
    - [Hibernate vs JPA](#hibernate-vs-jpa)
    - [Hibernate](#hibernate)
    - [More Hibernate Code Examples](#more-hibernate-code-examples)
- [Building Your First Web Application Notes](#building-your-first-web-application)



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



## Loosely Coupled Code
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

## Annotations and Descriptions

| Annotation        | Description |
|-------------------|-------------|
| `@Configuration`  | Indicates that a class declares one or more `@Bean` methods and may be processed by the Spring container to generate bean definitions |
| `@ComponentScan`  | Define specific packages to scan for components. If specific packages are not defined, scanning will occur from the package of the class that declares this annotation |
| `@Bean`           | Indicates that a method produces a bean to be managed by the Spring container |
| `@Component`      | Indicates that an annotated class is a "component" |
| `@Service`        | Specialization of `@Component` indicating that an annotated class has business logic |
| `@Controller`     | Specialization of `@Component` indicating that an annotated class is a "Controller" (e.g., a web controller). Used to define controllers in your web applications and REST API |
| `@Repository`     | Specialization of `@Component` indicating that an annotated class is used to retrieve and/or manipulate data in a database |
| `@Primary` | Indicates that a bean should be given preference when multiple candidates are qualified to autowire a single-valued dependency |
| `@Qualifier` | Used on a field or parameter as a qualifier for candidate beans when autowiring |
| `@Lazy` | Indicates that a bean has to be lazily initialized. Absence of `@Lazy` annotation will lead to eager initialization. |
| `@Scope` (value = `ConfigurableBeanFactory.SCOPE_PROTOTYPE`) | Defines a bean to be a prototype - a new instance will be created every time you refer to the bean. Default scope is singleton - one instance per IOC container. |
| `@PostConstruct` | Identifies the method that will be executed after dependency injection is done to perform any initialization |
| `@PreDestroy` | Identifies the method that will receive the callback notification to signal that the instance is in the process of being removed by the container. Typically used to release resources that it has been holding. |
| `@Named` | Jakarta Contexts & Dependency Injection (CDI) Annotation similar to Component |
| `@Inject` | Jakarta Contexts & Dependency Injection (CDI) Annotation similar to Autowired |

## Important Spring Concepts
| Concept             | Description |
|---------------------|-------------|
| Dependency Injection | Identify beans, their dependencies and wire them together (provides IOC - Inversion of Control) |
| Constr. injection    | Dependencies are set by creating the Bean using its Constructor |
| Setter injection     | Dependencies are set by calling setter methods on your beans |
| Field injection      | No setter or constructor. Dependency is injected using reflection. |
| IOC Container        | Spring IOC Context that manages Spring beans & their lifecycle |
| Bean Factory         | Basic Spring IOC Container |
| Application Context  | Advanced Spring IOC Container with enterprise-specific features - Easy to use in web applications with internationalization features and good integration with Spring AOP |
| Spring Beans         | Objects managed by Spring |
| Auto-wiring          | Process of wiring in dependencies for a Spring Bean |

## Spring Core

Spring Framework manages the lifecycle of objects, what you will need to do is:
 - Mark components using annotations: @Component (and others...)
 - Mark dependencies using @Autowired
 - Allow Spring Framework to do it's magic!
### Example - BusinessCalculationService
![BusinessCalculationService](image.png)
    Check example2 in app05dependencyinjection

## Understanding Dependencies in Spring

In Spring, a dependency is an object that another bean requires for its operations. For example, if we have a `Car` class that requires an `Engine` and `Wheels` to function, `Engine` and `Wheels` are dependencies of `Car`.

Here's the example:

```java
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class Car {

    // The Car class depends on the Engine and Wheels classes to function properly
    private Engine engine;
    private Wheels wheels;

    // Spring injects an instance of Engine here, making Engine a dependency of Car
    @Autowired
    public Car(Engine engine) {
        this.engine = engine;
    }

    // Spring also injects an instance of Wheels here, making Wheels another dependency of Car
    @Autowired
    public void setWheels(Wheels wheels) {
        this.wheels = wheels;
    }
}

@Component
class Engine {
    // Engine details - other classes may depend on Engine
}

@Component
class Wheels {
    // Wheels details - other classes may depend on Wheels
}
```

Key Points on Dependencies:

- Wiring: Dependencies are "wired" into a class where they're needed. In the example, Car needs Engine and Wheels to operate. Spring 'wires' these dependencies using the @Autowired annotation.
- Inversion of Control (IoC): Instead of the Car class creating its own Engine and Wheels, which would tightly couple the classes, Spring takes the responsibility of creating and providing these dependencies. This is called Inversion of Control.
- Loose Coupling: Dependency Injection helps in achieving loose coupling between classes. The Car class doesn't need to know the details of the creation or management of Engine or Wheels.
- Interchangeability: If you wanted to use a different type of Engine or Wheels, you could simply provide Spring with a different bean configuration, and the Car class would remain unchanged.

Dependencies are thus crucial for creating modular, testable, and maintainable applications.


## Using `@Autowired` in Spring

The `@Autowired` annotation in Spring is used for automatic dependency injection. Spring provides the matching bean from its context and injects it into the marked field.

Here's a simple example:

```java
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class Car {

    private Engine engine;
    private Wheels wheels;

    // Using @Autowired on a constructor
    @Autowired
    public Car(Engine engine) {
        this.engine = engine;
    }

    // Using @Autowired on a setter method
    @Autowired
    public void setEngine(Engine engine) {
        this.engine = engine;
    }
}

@Component
class Engine {
    // Engine details
}

@Component
class Wheels {
    // Wheels details
}
```

## When to Use @Autowired
- Constructor Injection: When you want to inject dependencies via the constructor, ensuring that required dependencies are not null and promoting immutability.
- Setter Injection: When you need to inject dependencies via setter methods, which allows for reconfiguration or re-injection of dependencies later.
- Field Injection: Although not recommended due to several drawbacks (like difficulty in unit testing, not being able to mark the field as final, etc.), it can be used for quick and less verbose configuration when starting out or in simple applications.

## Simple Spring Bean

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

### Classes
```Java
//GameRunner.java
package com.randy.learningspringboot.game;

public class GameRunner {
    GamingConsole game;
    public GameRunner(GamingConsole game){
        this.game = game;
    }

    public void run() {
        System.out.println("Running game: " + game.getName());
        game.up();
        game.down();
        game.left();
        game.right();
    }
}
```

```Java
//GamingConsole.java
package com.randy.learningspringboot.game;

public interface GamingConsole {
    String getName();
    void up();
    void down();
    void left();
    void right();
}
```

```Java
//MarioGame.java
package com.randy.learningspringboot.game;

public class MarioGame implements GamingConsole{
    public String getName(){
        return("MarioGame");
    }
    public void up(){
        System.out.println("Jump");
    }

    public void down(){
        System.out.println("Go Down Pipe");
    }

    public void left(){
        System.out.println("Move Left");
    }

    public void right(){
        System.out.println("Move Right");
    }
}
```

```Java
//SuperContraGame.java
package com.randy.learningspringboot.game;

public class SuperContraGame implements GamingConsole{
    public String getName(){
        return("SuperContraGame");
    }

    public void up(){
        System.out.println("Jump");
    }

    public void down(){
        System.out.println("Crouch");
    }

    public void left(){
        System.out.println("Move Left");
    }

    public void right(){
        System.out.println("Move Right");
    }
}
```
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

## Auto Created Spring Bean
Previously, we had 2 separate files, a drive code file and a configuration file. We have merged them into one now and also have spring auto creating our beans.

We will need to do two things

1. Add @Component to the component files
2. Add @ComponentScan to our Driver coder

### Classes
```Java
//GameRunner.java
package com.randy.learningspringboot.game;

@Component
public class GameRunner {
    GamingConsole game;
    public GameRunner(GamingConsole game){
        this.game = game;
    }

    public void run() {
        System.out.println("Running game: " + game.getName());
        game.up();
        game.down();
        game.left();
        game.right();
    }
}
```

```Java
//GamingConsole.java
package com.randy.learningspringboot.game;

public interface GamingConsole {
    String getName();
    void up();
    void down();
    void left();
    void right();
}
```

```Java
//MarioGame.java
package com.randy.learningspringboot.game;

@Component
@Primary
public class MarioGame implements GamingConsole{
    public String getName(){
        return("MarioGame");
    }
    public void up(){
        System.out.println("Jump");
    }

    public void down(){
        System.out.println("Go Down Pipe");
    }

    public void left(){
        System.out.println("Move Left");
    }

    public void right(){
        System.out.println("Move Right");
    }
}
```

```Java
//SuperContraGame.java
package com.randy.learningspringboot.game;

@Component
public class SuperContraGame implements GamingConsole{
    public String getName(){
        return("SuperContraGame");
    }

    public void up(){
        System.out.println("Jump");
    }

    public void down(){
        System.out.println("Crouch");
    }

    public void left(){
        System.out.println("Move Left");
    }

    public void right(){
        System.out.println("Move Right");
    }
}
```

### Driver Code
```Java
package com.randy.learningspringboot.game;

import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ComponentScan("com.randy.learningspringboot.game")
public class AppGamingSpringBean {

    public static void main(String[] args) {
        try (var context = new AnnotationConfigApplicationContext(AppGamingSpringBean.class);) {
            context.getBean(GamingConsole.class).up();
            context.getBean(GameRunner.class).run();
        }
    }
}
```

## Output
```Jump
Running game: MarioGame
Jump
Go Down Pipe
Move Left
Move Right
```

## @primary vs @qualifier - Which one to use?

- `@Primary` is used to give a bean a higher preference when multiple beans of the same type are available in the Spring container. When you autowire a dependency without specifying any qualifiers, Spring will inject the bean marked with `@Primary`.

- `@Qualifier` is used when you want to specify exactly which bean to autowire when you have more than one bean of the same type. It is useful when you want to select a specific bean to be injected among multiple candidates.

- Always think from the perspective of the class that is using the `SortingAlgorithm`:
  1. Just `@Autowired`: This tells Spring to inject the preferred `SortingAlgorithm` bean, and if there's a bean marked with `@Primary`, it will be selected.
  2. `@Autowired` + `@Qualifier`: This is more specific and tells Spring to inject the `SortingAlgorithm` bean that matches the given qualifier.

- (REMEMBER) `@Qualifier` has a higher priority than `@Primary` when both are specified.

#### Code Example:

```java
@Component @Primary
class QuickSort implements SortingAlgorithm { ... }

@Component
class BubbleSort implements SortingAlgorithm { ... }

@Component @Qualifier("RadixSortQualifier")
class RadixSort implements SortingAlgorithm { ... }

@Component
class ComplexAlgorithm {
    @Autowired
    private SortingAlgorithm algorithm; // This will get the bean marked with @Primary
}

@Component
class AnotherComplexAlgorithm {
    @Autowired @Qualifier("RadixSortQualifier")
    private SortingAlgorithm iWantToUseRadixSortOnly; // This will specifically require RadixSort
}
```

## @Component vs @Bean

| Heading | @Component | @Bean |
|-----|-----|-----|
| Where?| Can be used on any Java class| Typically used on methods in Spring Configuration classes|
| Ease of use| Very easy. Just add an annotation.| You write all the code.|
| Autowiring| Yes - Field, Setter or Constructor Injection| Yes - method call or method parameters|
| Who creates beans?| Spring Framework| You write bean creation code|
| Recommended For| Instantiating Beans for Your Own Application Code: @Component | 1: Custom Business Logic 2: Instantiating Beans for 3rd-party libraries: @Bean |

    Custom Business Logic: When you write your own classes that contain business logic specific to your application, you typically use @Component. This annotation lets Spring know to automatically detect and instantiate your class as a bean through classpath scanning.

    Third-party Libraries: For classes that are not part of your application's codebase, such as those from third-party libraries, you cannot add annotations directly to the classes. Instead, you configure these beans using @Bean annotation within a configuration class, where you define the method to instantiate and configure these external class instances.

### Example
```Java
@Configuration
public class AppConfig {

// Example of @Bean used to instantiate a third-party library class
@Bean
public ThirdPartyClass thirdPartyClass() {
    return new ThirdPartyClass();
}
}

// Your own business logic class annotated with @Component
@Component
public class MyBusinessService {
// Spring will manage this bean and inject dependencies where needed
}
```
    In this example, AppConfig is a configuration class that defines how to instantiate ThirdPartyClass which is from an external library, while MyBusinessService is a component of your application that Spring will discover and manage.

## Lazy Intialization

When the below code is run but Driver code, initialization of the bean is automatically performed (Eager Initializtion by default). If we don't want that we need to add @Lazy.

### Class
```Java
package com.randy.learningspringboot.app05LazyInitialization;

import org.springframework.stereotype.Component;

@Component
public class ClassB {
    ClassA classA;

    public ClassB(ClassA classA){
        //logic
        System.out.println("Some Initialization logic");
        this.classA = classA;
    }
}```

### Driver
```Java
package com.randy.learningspringboot.app05LazyInitialization;

import com.randy.learningspringboot.app05dependencyinjection.example1.YourBusinessClass;
import com.randy.learningspringboot.app05dependencyinjection.example2.BusinessCalculationService;
import com.randy.learningspringboot.app05dependencyinjection.example2.RealWorldSpringContextLauncherApplication;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;

@Configuration
@ComponentScan
public class LazyInitializationLauncherApplication {
    public static void main(String[] args) {
        try (var context = new AnnotationConfigApplicationContext(LazyInitializationLauncherApplication.class);) {
        }
    }
}
```
### Output Before @Lazy

    Some Initialization logic

### Output After @Lazy

    //None - This is just a note

The bean is only intializaed when ClassB is referenced like below
```Java
@Configuration
@ComponentScan
public class LazyInitializationLauncherApplication {
    public static void main(String[] args) {
        try (var context = new AnnotationConfigApplicationContext(LazyInitializationLauncherApplication.class);) {
            context.getBean(ClassB.class);
        }
    }
}
```

## Comparing Lazy Initialization vs Eager Initialization

| Heading                | Lazy Initialization                           | Eager Initialization                           |
|------------------------|-----------------------------------------------|------------------------------------------------|
| **Initialization time**| Bean initialized when it is first made use of in the application | Bean initialized at startup of the application |
| **Default**            | NOT Default                                   | Default                                        |
| **Code Snippet**       | `@Lazy` OR `@Lazy(value=true)`                | `@Lazy(value=false)` OR (Absence of `@Lazy`)   |
| **What happens if there are errors in initializing?** | Errors will result in runtime exceptions | Errors will prevent application from starting up |
| **Usage**              | Rarely used                                   | Very frequently used                           |
| **Memory Consumption** | Less (until bean is initialized)              | All beans are initialized at startup           |
| **Recommended Scenario**| Beans very rarely used in your app            | Most of your beans                             |

## Bean Scopes - Prototype and Singleton
Spring Beans are defined to be used in a specific scope:

- **Singleton**: One object instance per Spring IoC container
- **Prototype**: Possibly many object instances per Spring IoC container

Scopes applicable ONLY for web-aware Spring `ApplicationContext`:

- **Request**: One object instance per single HTTP request
- **Session**: One object instance per user HTTP Session
- **Application**: One object instance per web application runtime
- **Websocket**: One object instance per WebSocket instance

## Java Singleton (Gang Of Four) vs Spring Singleton

- **Spring Singleton**: One object instance per Spring IoC container
- **Java Singleton (GOF)**: One object instance per JVM




| Heading        | Prototype                         | Singleton                                        |
|----------------|-----------------------------------|--------------------------------------------------|
| Instances      | Possibly Many per Spring IOC Container | One per Spring IOC Container                 |
| Beans          | New bean instance created every time the bean is referred to | Same bean instance reused |
| Default        | NOT Default                       | Default                                          |
| Code Snippet   | `@Scope(value=ConfigurableBeanFactory.SCOPE_PROTOTYPE)` | `@Scope(value=ConfigurableBeanFactory.SCOPE_SINGLETON)` OR Default |
| Usage          | Rarely used                       | Very frequently used                             |
| Recommended Scenario | Stateful beans                | Stateless beans                                  |


When we run the code velow without prototype, we can see that we get the same class hashcodes. That is because by default, all beans created by Spring Framework are singletons. Classes with prototype class scope will get a new instance.

### Classes
```Java
package com.randy.learningspringboot.app07BeanScopes;

import org.springframework.stereotype.Component;

@Component
public class NormalClass {
}
```

```Java
package com.randy.learningspringboot.app07BeanScopes;

import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

@Scope(value= ConfigurableBeanFactory.SCOPE_PROTOTYPE)
@Component
public class PrototypeClass {
}
```
```Java
package com.randy.learningspringboot.app07BeanScopes;

import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;

@Configuration
@ComponentScan
public class BeanScopesApplicationLauncher {

    public static void main(String[] args) {
        try (var context = new AnnotationConfigApplicationContext(BeanScopesApplicationLauncher.class);) {
            System.out.println(context.getBean(NormalClass.class));
            System.out.println(context.getBean(NormalClass.class));
            System.out.println(context.getBean(PrototypeClass.class));
            System.out.println(context.getBean(PrototypeClass.class));
            System.out.println(context.getBean(PrototypeClass.class));
        }
    }
}
```
### Output
    com.randy.learningspringboot.app07BeanScopes.NormalClass@3e84448c
    com.randy.learningspringboot.app07BeanScopes.NormalClass@3e84448c
    com.randy.learningspringboot.app07BeanScopes.PrototypeClass@4a7f959b
    com.randy.learningspringboot.app07BeanScopes.PrototypeClass@429bffaa
    com.randy.learningspringboot.app07BeanScopes.PrototypeClass@5403f35f

## Spring Boot PreConstruct and PostDestroy Annotations

This example demonstrates the use of `@PostConstruct` and `@PreDestroy` annotations in a Spring Boot application. These annotations are used for defining methods that should be executed after bean initialization and just before bean destruction, respectively.

### Overview

- The `PrePostAnnotatioLauncherApp` class bootstraps the Spring application context using `AnnotationConfigApplicationContext`. It scans for Spring components to create and manage beans within the application.
- `SomeClass` is a Spring-managed component that depends on `SomeDependency`.
- Upon bean construction, `SomeClass` prints a message indicating all dependencies are ready.
- The `@PostConstruct` annotated method `initialize` is called after the bean of `SomeClass` is created and all its dependencies are injected. It's used to perform any initialization logic, like preparing resources.
- The `@PreDestroy` annotated method `cleanup` is executed before the bean is destroyed, which is typically when the application context is closed. This method is used for cleanup activities, such as releasing resources or closing connections with databases.

## Code Snippets

### Application Launcher
```java
@Configuration
@ComponentScan
public class PrePostAnnotatioLauncherApp {
    public static void main(String[] args) {
        try (var context = new AnnotationConfigApplicationContext(PrePostAnnotatioLauncherApp.class);) {
            // Application context is closed automatically here, triggering @PreDestroy
        }
    }
}
```
### Component with Lifecycle Methods
```java
@Component
public class SomeClass {
    private SomeDependency someDependency;

    public SomeClass(SomeDependency someDependency){
        this.someDependency = someDependency;
        System.out.println("All Dependencies are ready");
    }

    @PostConstruct
    public void initialize(){
        someDependency.getReady();
    }

    @PreDestroy
    public void cleanup(){
        System.out.println("Clean up");
    }
}
```
### Dependency Component
```java
@Component
public class SomeDependency {
    public void getReady(){
        System.out.println("Some logic using SomeDependency");
    }
}
```
## Output
    All Dependencies are ready
    Some logic using SomeDependency
    Clean up

The @PostConstruct annotation is useful for any logic that needs to run after the object is fully initialized and all its dependencies are set. The @PreDestroy annotation is useful to release resources that the bean might be holding before the bean is destroyed.

## Evolution of Jakarta EE: vs J2EE vs Java EE

- Enterprise capabilities were initially built into JDK.
- With time, they were separated out:
  - **J2EE** - Java 2 Platform Enterprise Edition
  - **Java EE** - Java Platform Enterprise Edition (Rebranding)
  - **Jakarta EE** (Oracle gave Java EE rights to the Eclipse Foundation)
    - Important Specifications:
      - Jakarta Server Pages (JSP)
      - Jakarta Standard Tag Library (JSTL)
      - Jakarta Enterprise Beans (EJB)
      - Jakarta RESTful Web Services (JAX-RS)
      - Jakarta Bean Validation
      - Jakarta Contexts and Dependency Injection (CDI)
      - Jakarta Persistence (JPA)
    - Supported by Spring 6 and Spring Boot 3
      - That's why we use `jakarta.*` packages (instead of `javax.*`).

## Jakarta Contexts & Dependency Injection (CDI)

- Spring Framework V1 was released in 2004.
- CDI specification introduced into Java EE 6 platform in December 2009.
- Now called Jakarta Contexts and Dependency Injection (CDI).
- CDI is a specification (interface).
  - Spring Framework implements CDI.
- Important Inject API Annotations:
  - `@Inject` (~Autowired in Spring)
  - Named (~Component in Spring)
  - Qualifier
  - Scope
  - Singleton


## Spring Stereotype Annotations - `@Component` & more..

### `@Component` - Generic annotation applicable for any class
- Base for all Spring Stereotype Annotations

### Specializations of `@Component`:
- `@Service` - Indicates that an annotated class has business logic
- `@Controller` - Indicates that an annotated class is a "Controller" (e.g., a web controller)
  - Used to define controllers in your web applications and REST API
- `@Repository` - Indicates that an annotated class is used to retrieve and/or manipulate data in a database

### What should you use?
- **(MY RECOMMENDATION)** Use the most specific annotation possible

### Why?
- By using a specific annotation, you are giving more information to the framework about your intentions.
- You can use AOP at a later point to add additional behavior
  - Example: For `@Repository`, Spring automatically wires in JDBC Exception translation features

## Annotations and Descriptions Review

| Annotation        | Description |
|-------------------|-------------|
| `@Configuration`  | Indicates that a class declares one or more `@Bean` methods and may be processed by the Spring container to generate bean definitions |
| `@ComponentScan`  | Define specific packages to scan for components. If specific packages are not defined, scanning will occur from the package of the class that declares this annotation |
| `@Bean`           | Indicates that a method produces a bean to be managed by the Spring container |
| `@Component`      | Indicates that an annotated class is a "component" |
| `@Service`        | Specialization of `@Component` indicating that an annotated class has business logic |
| `@Controller`     | Specialization of `@Component` indicating that an annotated class is a "Controller" (e.g., a web controller). Used to define controllers in your web applications and REST API |
| `@Repository`     | Specialization of `@Component` indicating that an annotated class is used to retrieve and/or manipulate data in a database |
| `@Primary` | Indicates that a bean should be given preference when multiple candidates are qualified to autowire a single-valued dependency |
| `@Qualifier` | Used on a field or parameter as a qualifier for candidate beans## Quick Review of Important Spring Concepts
| Dependency Injection | Identify beans, their dependencies and wire them together (provides IOC - Inversion of Control) |
| Constr. injection    | Dependencies are set by creating the Bean using its Constructor |
| Setter injection     | Dependencies are set by calling setter methods on your beans |
| Field injection      | No setter or constructor. Dependency is injected using reflection. |
| IOC Container        | Spring IOC Context that manages Spring beans & their lifecycle |
| Bean Factory         | Basic Spring IOC Container |
| Application Context  | Advanced Spring IOC Container with enterprise-specific features - Easy to use in web applications with internationalization features and good integration with Spring AOP |
| Spring Beans         | Objects managed by Spring |
| Auto-wiring          | Process of wiring in dependencies for a Spring Bean | when autowiring |
| `@Lazy` | Indicates that a bean has to be lazily initialized. Absence of `@Lazy` annotation will lead to eager initialization. |
| `@Scope` (value = `ConfigurableBeanFactory.SCOPE_PROTOTYPE`) | Defines a bean to be a prototype - a new instance will be created every time you refer to the bean. Default scope is singleton - one instance per IOC container. |
| `@PostConstruct` | Identifies the method that will be executed after dependency injection is done to perform any initialization |
| `@PreDestroy` | Identifies the method that will receive the callback notification to signal that the instance is in the process of being removed by the container. Typically used to release resources that it has been holding. |
| `@Named` | Jakarta Contexts & Dependency Injection (CDI) Annotation similar to Component |
| `@Inject` | Jakarta Contexts & Dependency Injection (CDI) Annotation similar to Autowired |


## Important Spring Concepts Review

| Concept             | Description |
|---------------------|-------------|
| Dependency Injection | Identify beans, their dependencies and wire them together (provides IOC - Inversion of Control) |
| Constr. injection    | Dependencies are set by creating the Bean using its Constructor |
| Setter injection     | Dependencies are set by calling setter methods on your beans |
| Field injection      | No setter or constructor. Dependency is injected using reflection. |
| IOC Container        | Spring IOC Context that manages Spring beans & their lifecycle |
| Bean Factory         | Basic Spring IOC Container |
| Application Context  | Advanced Spring IOC Container with enterprise-specific features - Easy to use in web applications with internationalization features and good integration with Spring AOP |
| Spring Beans         | Objects managed by Spring |
| Auto-wiring          | Process of wiring in dependencies for a Spring Bean |

# Spring Framework

## Spring Big Picture - Framework and Modules
![Alt text](image-1.png)
- Spring Framework contains multiple `Spring Modules`:
  - Fundamental Features: Core (IOC Container, Dependency Injection, Auto Wiring, ...)
  - Web: Spring MVC etc (Web applications, REST API)
  - Web Reactive: Spring WebFlux etc
  - Data Access: JDBC, JPA etc
  - Integration: JMS etc
  - Testing: Mock Objects, Spring MVC Test etc

## Why is Spring Framework divided into Modules?
- Each application can choose modules they want to make use of
- They do not need to make use of everything in Spring framework!

## Spring Big Picture - Spring Projects
![Alt text](image-2.png)
- Application architectures evolve continuously
  - Web > REST API > Microservices > Cloud > ...
- Spring evolves through Spring Projects:
  - First Project: Spring Framework
  - Spring Security: Secure your web application or REST API or microservice
  - Spring Data: Integrate the same way with different types of databases: NoSQL and Relational
  - Spring Integration: Address challenges with integration with other applications
  - Spring Boot: Popular framework to build microservices
  - Spring Cloud: Build cloud native applications

## Spring Big Picture - Framework, Modules and Projects

- Hierarchy: Spring Projects > Spring Framework > Spring Modules
- Why is Spring Ecosystem popular?
  - Loose Coupling: Spring manages creation and wiring of beans and dependencies
    - Makes it easy to build loosely coupled applications
    - Make writing unit tests easy! (Spring Unit Testing)
  - Reduced Boilerplate Code: Focus on Business Logic
    - Example: No need for exception handling in each method!
    - All Checked Exceptions are converted to Runtime or Unchecked Exceptions
    - Example: Code needed to talk to databases reduced from 50-60 lines to 5 with Spring Framework, Spring Data JDA and JDBC
  - Architectural Flexibility: Spring Modules and Projects
    - You can pick and choose which ones to use (You DON'T need to use all of them!)
  - Evolution with Time: Microservices and Cloud
    - Spring Boot, Spring Cloud etc.

# Spring Boot

## Getting Started with Spring Boot - Approach

- 1: Understand the world before Spring Boot (10000 Feet)
- 2: Create a Spring Boot Project
- 3: Build a simple REST API using Spring Boot
- 4: Understand the MAGIC of Spring Boot
  - Spring Initializr
  - Starter Projects
  - Auto Configuration
  - Developer Tools
  - Actuator

## Goal Of Spring Boot

The primary goal of **Spring Boot** is to simplify the process of developing **production-ready** applications and services.

### Key Features of Spring Boot

- **Quick Development**:
  1. Utilize [**Spring Initializr**](https://start.spring.io/) for project scaffolding.
  2. Benefit from [**Spring Boot Starter Projects**](#exploring-spring-boot-starter-projects) to quickly set up common configurations.
  3. Employ [**Spring Boot Auto Configuration**](#exploring-spring-boot-auto-configuration) to automatically configure your application based on the libraries on your classpath.
  4. Take advantage of [**Spring Boot DevTools**](#build-faster-with-spring-boot-devtools) for automatic restarts, live reload, and enhanced development experience.

- **Production-Ready Features**:
  - Incorporate **Logging** for insightful information about the application behavior.
  - Configure applications differently for different environments using **Profiles** and `ConfigurationProperties`.
  - Implement **Monitoring** with tools like **Spring Boot Actuator** for application health and metrics.

## Exploring Spring Boot Starter Projects

Spring Boot aims to simplify the development of production-ready applications by providing a set of tools and frameworks. Starters are a set of convenient dependency descriptors that you can include in your application.

### Why Use Starter Projects?

- **Frameworks for Application Features**: To build application features such as REST APIs or to write unit tests, you would need to integrate various frameworks like Spring, Spring MVC, Tomcat for server support, JSON processing libraries, Spring Test, JUnit, Mockito, and more.

- **Grouping Dependencies**: Starters allow you to group all these related dependencies together, simplifying the build configuration.

### Advantages of Starter Projects

- They reduce the risk of version conflicts by managing versions of dependencies for you.
- Starters provide a quick way to get a new project or feature off the ground with minimum fuss.
- They make it easier to follow best practices and use the right libraries to fulfill a given requirement.

### Spring Boot's Variety of Starter Projects

- **Web Application & REST API**: Utilize `Spring Boot Starter Web` which includes `spring-webmvc`, `spring-boot-starter-tomcat`, and `spring-boot-starter-json`.

- **Unit Tests**: Easily write and run unit tests with `Spring Boot Starter Test`.

- **JPA Database Access**: Integrate JPA to talk to databases with `Spring Boot Starter Data JPA`.

- **JDBC Database Access**: Use JDBC with `Spring Boot Starter JDBC`.

- **Security**: Secure your web application or REST API with `Spring Boot Starter Security`.

For starting your project, you can use [Spring Initializr](https://start.spring.io/).

## Exploring Spring Boot Auto Configuration

Spring Boot facilitates application development by reducing the need for manual configuration.

### Simplifying Configuration

- **Complexity in Configuration**: Building a Spring application typically requires a lot of configuration, such as setting up a Component Scan, DispatcherServlet, Data Sources, JSON Conversion, etc.

- **Auto Configuration**: Spring Boot simplifies this by providing automated configuration for your application.
  - It decides the configuration based on:
    - The frameworks available in the classpath.
    - The existing configuration specified by annotations and other means.

### Examples of Auto Configuration in Spring Boot

- **Spring Boot Starter Web**: Simplifies the setup of web applications.
  - **Dispatcher Servlet**: Automatically configured by `DispatcherServletAutoConfiguration`.
  - **Embedded Servlet Container**: By default, Tomcat is configured using `EmbeddedWebServerFactoryCustomizerAutoConfiguration`.
  - **Default Error Pages**: Provided by `ErrorMvcAutoConfiguration`.
  - **Bean to JSON Conversion**: Handled by `JacksonHttpMessageConvertersConfiguration`, which sets up JSON conversion using Jackson libraries.

Auto Configuration significantly streamlines the process of setting up a Spring application, enabling developers to focus more on the business logic rather than boilerplate configuration.

## Build Faster with Spring Boot DevTools

Spring Boot DevTools is a set of tools that can improve your development workflow.

### Benefits of Using DevTools

- **Increase in Productivity**: DevTools are designed to increase developer productivity by enabling features like automatic restart.
  
- **Efficient Development**: Avoid the hassle of manually restarting the server with every code change. DevTools automates this process, except when there are changes in `pom.xml`.

### Important Note

- **Dependency Changes**: Remember that for changes to dependencies in `pom.xml`, you will need to restart the server manually.

### Adding DevTools to Your Project

To include Spring Boot DevTools in your project, add the following dependency to your `pom.xml` file:

```xml
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-devtools</artifactId>
</dependency>
```

## Spring Boot Profiles


![Alt text](image-3.png)

## Managing App. Configuration using Profiles

In the development lifecycle, applications are often deployed in multiple environments, such as:

- **Development (Dev)**
- **Quality Assurance (QA)**
- **Staging (Stage)**
- **Production (Prod)**

Each of these environments can have distinct configurations:

- **Databases**: Connections to different database instances or types.
- **Web Services**: URLs and credentials for various internal or third-party services.

### Providing Different Configurations

To manage environment-specific configurations, Spring Boot uses the concept of **Profiles**. Profiles allow developers to define sets of configurations that are only activated in certain environments.

### Why Use Profiles?

- **Flexibility**: Profiles make it easy to switch between different configurations without changing the code.
- **Convenience**: They help in maintaining a clean project structure by segregating configurations.
- **Maintainability**: Reduces the chance of errors when moving from one environment to another by clearly defining what should be run where.

### Example of Profile Configuration in Spring Boot

Note: This example is found in App12

In `application.properties`, you can specify the active profiles like this:

```properties
logging.level.org.springframework=debug
spring.profiles.active=dev

# Default currency service configuration
currency-service.url=http://default.randy-huynh.com
currency-service.username=defaultusername
currency-service.key=defaultkey
```

In `application-dev.properties`, override the default configuration for the development environment:
```properties
logging.level.org.springframework=trace

currency-service.url=http://dev.randy-huynh.com
currency-service.username=devusername
currency-service.key=devkey
```

In `application-prod.properties`, override the default configuration for the development environment:
```properties
logging.level.org.springframework=info

currency-service.url=http://prod.randy-huynh.com
currency-service.username=produsername
currency-service.key=prodkey
```

### Spring Boot Configuration Class:

Use @ConfigurationProperties to map these properties into a Spring bean:
```java
package com.randy.springboot.app12RestApiAndProfiles;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@ConfigurationProperties(prefix = "currency-service")
@Component
public class CurrencyServiceConfiguration {
    private String url;
    private String username;
    private String key;

    // Standard getters and setters
}
```

### Spring Boot Controller:

Then, you can inject these properties into a REST controller to use them as needed:
```java
package com.randy.springboot.app12RestApiAndProfiles;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CurrencyConfigurationController {
    @Autowired
    private CurrencyServiceConfiguration configuration;

    @RequestMapping("/currency-configuration")
    public CurrencyServiceConfiguration retrieveConfiguration() {
        return configuration;
    }
}
```

### How It Works:

- The spring.profiles.active property specifies the active profile.
- When the application runs with the dev profile, it uses configurations from application-dev.properties.
- The CurrencyServiceConfiguration class is annotated with @ConfigurationProperties to bind properties with the prefix currency-service.
- The CurrencyConfigurationController serves the active configuration when the /currency-configuration endpoint is hit.

Using profiles in this way ensures that your application uses the correct configurations for each environment, thus reducing the likelihood of configuration issues when deploying your application.

## Monitor Applications using Spring Boot Actuator

Spring Boot Actuator is a vital tool for monitoring and managing your application in production.

### Key Features of Spring Boot Actuator

- **Monitor and Manage**: Gain insights and control over your application in the production environment.

- **Actuator Endpoints**: It provides several built-in endpoints for various monitoring needs:
  - `beans`: Displays a complete list of all the Spring beans in your application.
  - `health`: Shows application health information.
  - `metrics`: Provides application metrics.
  - `mappings`: Gives details about all the request mappings.

### Why is Actuator Important?

- **Real-Time Monitoring**: It allows you to access real-time information about the application's state and its components.
  
- **Ease of Use**: Actuator integrates with the application seamlessly and requires minimal configuration.

- **Production-Ready Features**: It provides critical insights necessary for understanding and troubleshooting application behavior in production.

### Configuring Actuator Endpoints

To expose specific endpoints, such as `health` and `metrics`, add the following to your `application.properties` file:

```properties
management.endpoints.web.exposure.include=health,metrics
```

If you want to monitor all available endpoints, you can uncomment and use:

```properties
management.endpoints.web.exposure.include=*
```

# Understanding Spring Boot vs Spring MVC vs Spring Review

Exploring the differences and components of Spring Boot, Spring MVC, and the Spring Framework can provide clarity on their respective roles in the development of Java applications.

## Spring Boot vs Spring MVC vs Spring: What's in it?

### Spring Framework
- **Dependency Injection**: Core feature that manages components and dependencies.
  - Uses annotations like `@Component`, `@Autowired`, and requires component scanning.
  - However, dependency injection alone isn't enough for a full application. Integration with other frameworks (like Hibernate/JPA for persistence and Mockito for unit testing) is needed, which are facilitated by Spring Modules and Spring Projects.

### Spring MVC (Spring Module)
- **Web Application Development Simplified**: A module of Spring Framework to ease building web applications and REST APIs, better than older methods like Struts.
  - Annotations such as `@Controller`, `@RestController`, and `@RequestMapping` help define web controllers and mappings.

### Spring Boot (Spring Project)
- **Rapid Production-Ready Applications**: Designed to accelerate development, making it easy to create stand-alone, production-grade applications.
  - **Starter Projects**: Pre-configured templates to jump-start various types of applications.
  - **Auto Configuration**: Reduces the need for manual configuration of Spring and other frameworks.
  
- **Non-Functional Requirements (NFRs)**:
  - **Actuator**: Provides advanced monitoring capabilities for applications.
  - **Embedded Server**: Eliminates the need for separate application server setups.
  - **Logging and Error Handling**: Out-of-the-box support for application logging and error response handling.
  - **Profiles and ConfigurationProperties**: Supports different configurations for different environments, improving manageability.

By distinguishing these aspects, developers can better understand how to efficiently build and manage Spring-based applications.

# JPA and Hibernate

## Learning JPA and Hibernate - Approach

Understanding Java Persistence API (JPA) and Hibernate can be facilitated by hands-on experience using a systematic approach with Spring Boot and an in-memory database like H2.

### Steps for Learning JPA and Hibernate with Spring Boot

1. **Create a Spring Boot Project with H2**
   - Start by generating a new Spring Boot project and include H2, which is an in-memory database, perfect for development and testing due to its lightweight nature and ease of configuration.

2. **Create COURSE Table**
   - Define the schema for a `COURSE` table which will be used to interact with the database.

3. **Use Spring JDBC to Interact with COURSE Table**
   - Begin by using Spring JDBC to understand the basics of Spring database interactions.

4. **Use JPA and Hibernate to Interact with COURSE Table**
   - Move on to JPA and Hibernate to abstract and simplify the database interaction layer further.

5. **Use Spring Data JPA to Interact with COURSE Table**
   - Finally, use Spring Data JPA which provides a powerful repository and custom object-mapping abstraction, simplifying data access layers even more.

### Understanding H2 Database

- **H2 Database**: An open-source, lightweight in-memory database. It can be embedded in Java applications or run in client-server mode and is often used for development and testing purposes.

### Configuring H2 and Spring Boot

To enable and configure H2 database within your Spring Boot application, add the following properties to your `application.properties` file:

```properties
spring.h2.console.enabled=true
spring.datasource.url=jdbc:h2:mem:testdb
```

### Creating a Database Schema

1. Create a Schema File: In your Spring Boot project, create a file named `schema.sql` in the `src/main/resources` folder.

2. Define Your Table: Add the SQL statements to define the schema of your COURSE table. For example:

```sql
create table course
(
    id bigint NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    author varchar(255) NOT NULL,
    PRIMARY KEY(id)
);
```

`Spring Boot Schema Initialization`: Spring Boot will automatically pick up this schema.sql file on startup and initialize the H2 database with the defined schema.

By following these steps, you will gain a comprehensive understanding of how to work with JPA and Hibernate within a Spring Boot application, using H2 as an in-memory database for simplicity and speed.

## JDBC to Spring JDBC to JPA to Spring Data JPA

The evolution from using JDBC to Spring Data JPA reflects a journey towards simplifying database interactions in Java applications.

![Alt text](image-4.png)

- **JDBC**
  - Write a lot of SQL queries! (e.g., `delete from todo where id=?`)
  - Write a lot of Java code to manage database operations.

- **Spring JDBC**
  - Still write SQL queries, but write less Java code thanks to `JdbcTemplate`.

- **JPA**
  - No need to write SQL queries for CRUD operations.
  - Just map Java entities to database tables.

- **Spring Data JPA**
  - Makes JPA even simpler, abstracting boilerplate code.
  - Manages repositories that take care of most common operations automatically.

### JDBC
- **Verbose**: Requires writing extensive SQL queries and Java code to manage the database interactions.
  - SQL Example: `delete from todo where id=?`
  - JDBC Java Code:
    ```java
    public void deleteTodo(int id) {
        PreparedStatement st = null;
        try {
            st = db.conn.prepareStatement("delete from todo where id=?");
            st.setInt(1, id);
            st.execute();
        } catch (SQLException e) {
            logger.fatal("Query Failed : ", e);
        } finally {
            if (st != null) {
                try { st.close(); }
                catch (SQLException e) { }
            }
        }
    }
    ```

### Spring JDBC
- **Less Verbose**: Still requires SQL queries but simplifies the Java code with the `JdbcTemplate`.
  - SQL remains the same.
  - Spring JDBC Java Code:
    ```java
    public void deleteTodo(int id) {
        jdbcTemplate.update("delete from todo where id=?", id);
    }
    ```

### JPA

- **Not Verbose**: Eliminates the need for SQL for CRUD operations by using EntityManager.
    - JPA Java Code:
        ```java
        public void deleteById(long id){
            Course course = entityManager.find(Course.class, id);
            entityManager.remove(course);
        }
        ```

### Spring Data JPA
- **Most Simplified**: Further abstracts data layer complexity by using Spring Data repositories.
    - No explicit Java code needed for simple CRUD operations.
    - Spring Data JPA Code:
        ```java
        repository.deleteById(1L); // 'L' denotes the long data type
        ```

Using Spring JDBC reduces boilerplate code, as it provides a template that takes care of common tasks like creating and closing connections, handling exceptions, and managing transactions.

### Advantages of Using Spring JDBC Over Plain JDBC
- Reduces the amount of boilerplate code required for database operations.
- Improves readability and maintainability of the data access layer.
- Provides a simpler API for database interactions, making error handling and resource management more efficient.

As you progress to using JPA and Spring Data JPA, the amount of required SQL and Java code reduces further, making data access layers even more efficient and domain-focused.

## Hardcoded Spring JDBC Entry

```java
package com.randy.springboot.learnjpaandhibernate.course.jdbc;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class CourseJdbcCommandLineRunner implements CommandLineRunner {
    @Autowired
    private CourseJdbcRepository repository;

    @Override
    public void run(String... args) throws Exception {
        repository.insert();
    }
}
```

```java
package com.randy.springboot.learnjpaandhibernate.course.jdbc;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class CourseJdbcRepository {

    @Autowired
    private JdbcTemplate springJdbcTemplate;
    private static String INSERT_QUERY =
            """
                    INSERT INTO course (id, name, author)
                    VALUES (1, 'Learn Spring', 'Randy');
                    """;

    public void insert() {
        springJdbcTemplate.update(INSERT_QUERY);
    }
}
```

### Component Definition:
The CourseJdbcCommandLineRunner class is annotated with @Component, making it a bean managed by the Spring container. This class implements CommandLineRunner, which is an interface provided by Spring Boot that allows you to run code after the application context is loaded.

### Dependency Injection:
Within CourseJdbcCommandLineRunner, you inject CourseJdbcRepository using the @Autowired annotation. This is where the actual database operation is defined.

### Execution Point:
The run method of CourseJdbcCommandLineRunner will be executed automatically by Spring Boot at startup. Inside this method, you call repository.insert(), which triggers the insert operation.

### Repository Definition:
CourseJdbcRepository is annotated with @Repository, indicating that it's a data access object (DAO). Spring provides exception translation for classes annotated with @Repository, translating SQL exceptions into Spring's data access exceptions.

### JdbcTemplate Injection:
The JdbcTemplate is injected into CourseJdbcRepository with @Autowired. JdbcTemplate is a helper class that simplifies database interactions, eliminating the need for boilerplate code like opening connections, managing transactions, handling exceptions, and closing connections.

### Insert Query:
INSERT_QUERY is a static string that contains the SQL command to insert a new row into the course table with fixed values for the columns.

### Executing the Insert:
The insert method uses springJdbcTemplate to execute the INSERT_QUERY. The update method of JdbcTemplate is used here to execute the insert SQL statement. This method can be used for insert, update, and delete operations.

### Hardcoded Data Insertion:
When insert is called, it inserts a new course with an id of 1, a name of 'Learn Spring', and an author named 'Randy' into the course table. This is a hardcoded insertion because the values are fixed in the SQL statement.

## Dynamic JDBC Queries

- CourseJdbcRepository uses JdbcTemplate to handle JDBC operations in a Spring Boot application.
- It provides methods to insert, delete, and find Course records in the database.
- The insert and deleteById methods execute update operations with parameterized SQL queries.
- The findById method retrieves a course using a SELECT query and maps the resulting row to a Course object with BeanPropertyRowMapper.
- BeanPropertyRowMapper automatically maps a row's columns to bean properties by matching the column names to bean property names.
- The Course class is a domain model with properties for id, name, and author, along with getters and setters.
- CourseJdbcCommandLineRunner demonstrates the repository's functionality by inserting courses and outputting the result of a findById operation to the console.

The following code snippets illustrate how to perform dynamic insert and delete operations using Spring JDBC in a Spring Boot application. Unlike hardcoded data, the CourseJdbcRepository allows for dynamic data manipulation by passing parameters to the SQL queries at runtime. The Course class is a simple Java domain object that represents the course data, and CourseJdbcCommandLineRunner uses the repository to insert dynamic course entries and delete one based on the provided ID upon application startup.

### Repository Code

```java
package com.randy.springboot.learnjpaandhibernate.course.jdbc;

import com.randy.springboot.learnjpaandhibernate.course.Course;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class CourseJdbcRepository {

    @Autowired
    private JdbcTemplate springJdbcTemplate;

    // SQL queries using placeholders
    private static final String INSERT_QUERY =
            "INSERT INTO course (id, name, author) VALUES (?, ?, ?);";
    private static final String DELETE_QUERY =
            "DELETE FROM course WHERE id = ?;";
    private static final String SELECT_QUERY =
            "SELECT * FROM course WHERE id = ?;";

    // Inserts a new course record into the database
    public void insert(Course course) {
        springJdbcTemplate.update(INSERT_QUERY, 
                                  course.getId(), 
                                  course.getName(), 
                                  course.getAuthor());
    }

    // Deletes a course record by its id
    public void deleteById(long id) {
        springJdbcTemplate.update(DELETE_QUERY, id);
    }

    // Finds a course record by its id and maps it to a Course object
    public Course findById(long id) {
        return springJdbcTemplate.queryForObject(SELECT_QUERY, 
                                                 new BeanPropertyRowMapper<>(Course.class), 
                                                 id);
    }
}
```

### Command Line Runner Code

```java
package com.randy.springboot.learnjpaandhibernate.course.jdbc;

import com.randy.springboot.learnjpaandhibernate.course.Course;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class CourseJdbcCommandLineRunner implements CommandLineRunner {
    @Autowired
    private CourseJdbcRepository repository;

    // Executes on application startup
    @Override
    public void run(String... args) throws Exception {
        // Inserting course records
        repository.insert(new Course(1, "Learn Spring Boot", "Randy Huynh"));
        repository.insert(new Course(2, "Learn Spring Boot 2", "Randy Huynh"));
        repository.insert(new Course(3, "Learn Spring Boot 3", "Randy Huynh"));
        
        // Deleting the course with id 1
        repository.deleteById(1);
        
        // Retrieving and printing the course with id 3
        System.out.println(repository.findById(3));
    }
}
```


### Domain Class Code


```java
package com.randy.springboot.learnjpaandhibernate.course;

import org.springframework.stereotype.Component;

public class Course {
    private long id;
    private String name;
    private String author;

    // Default and parameterized constructors
    public Course() {}

    public Course(long id, String name, String author) {
        this.id = id;
        this.name = name;
        this.author = author;
    }

    // Getters and setters
    // ...

    // toString method for logging
    @Override
    public String toString() {
        return "Course{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", author='" + author + '\'' +
                '}';
    }
}
```

## JPA Integration in Spring Boot
- Mapped Java objects (Course class) to SQL table using JPA annotations.
- Utilized EntityManager to manage persistence contexts and CRUD operations.
- Annotated CourseJpaRepository with @Transactional to handle transaction boundaries.
- Used @PersistenceContext to inject the EntityManager instance.
- Defined insert, findById, and deleteById methods in CourseJpaRepository to interact with the database.
- CourseJpaRepository replaces CourseJdbcRepository for database operations with JPA.
- In the Course entity, the @Id annotation marks the primary key.
- Annotations like @Column are optional when the field name matches the column name in the database.
- CourseJpaCommandLineRunner demonstrates repository operations at application startup.
- JPA requires the repository code to be labelled with `@Transactional` as well

### Repository Code

```java
package com.randy.springboot.learnjpaandhibernate.course.jpa;

import com.randy.springboot.learnjpaandhibernate.course.Course;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Repository;

@Repository
@Transactional
public class CourseJpaRepository {

    @PersistenceContext
    private EntityManager entityManager;

    public void insert(Course course) {
        entityManager.merge(course);
    }

    public Course findById(long id) {
        return entityManager.find(Course.class, id);
    }

    public void deleteById(long id) {
        Course course = findById(id);
        entityManager.remove(course);
    }
}
```


### Command Line Runner Code

```java
package com.randy.springboot.learnjpaandhibernate.course.jpa;

import com.randy.springboot.learnjpaandhibernate.course.Course;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class CourseJpaCommandLineRunner implements CommandLineRunner {
    @Autowired
    private CourseJpaRepository repository;

    @Override
    public void run(String... args) throws Exception {
        repository.insert(new Course(1, "Learn Spring Boot", "Randy Huynh"));
        repository.insert(new Course(2, "Learn Spring Boot 2", "Randy Huynh"));
        repository.insert(new Course(3, "Learn Spring Boot 3", "Randy Huynh"));
        repository.deleteById(1);
        System.out.println(repository.findById(3));
    }
}
```


### Entity Code


```java
package com.randy.springboot.learnjpaandhibernate.course;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Course {

    @Id
    private long id;
    private String name;
    private String author;

    // Constructors, getters, setters, and toString method...
}
```


### Entity Code

```java
package com.randy.springboot.learnjpaandhibernate.course;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Course {

    @Id
    private long id;
    private String name;
    private String author;

    // Constructors, getters, setters, and toString method...
}
```

If you wish to see what queries are being run by JPA and Hibernate, include this line of code into applications.properties:
```properties
spring.jpa.show-sql=true
```

## Spring Data JPA Integration

Spring Data JPA is designed to reduce the amount of boilerplate code required for data access operations in your application. By extending JpaRepository, you gain access to a wide array of common CRUD methods without the need for implementation. This enables you to perform operations such as save, delete, and find with minimal effort.

### Application Class Code
```java
package com.randy.springboot.learnjpaandhibernate;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class LearnJpaAndHibernateApplication {

    public static void main(String[] args) {
        SpringApplication.run(LearnJpaAndHibernateApplication.class, args);
    }
}
```


### Spring Data JPA Repository Code


```java
package com.randy.springboot.learnjpaandhibernate.course.springdatajpa;

import com.randy.springboot.learnjpaandhibernate.course.Course;
import org.springframework.data.jpa.repository.JpaRepository;

// By extending JpaRepository, you get a lot of boilerplate CRUD operations pre-implemented.
// JpaRepository<T, ID>
// T is the type of the entity class that you are creating the repository for. This is the domain type the repository manages and typically is an entity represented by a table in your database.
// ID represents the type of the primary key of the entity that the repository manages. This is used to identify instances of T.
// You can make custom queries by using the following naming convention: findBy<Column>
public interface CourseSpringDataJpaRepository extends JpaRepository<Course, Long> {
    List<Course> findByAuthor(String author);
    List<Course> findByName(String Name);
}
```


### Command Line Runner Code

```java
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
        // Using the built-in save method to create or update courses
        repository.save(new Course(1, "Learn JPA", "Randy Huynh"));
        repository.save(new Course(2, "Learn JPA 2", "Randy Huynh"));
        repository.save(new Course(3, "Learn JPA 3", "Randy Huynh"));
        
        // Using the built-in deleteById method to remove a course
        repository.deleteById(1L); // 'L' is for long data type
        
        // Using the built-in findById method to fetch a course
        System.out.println(repository.findById(3L)); // Optional wrapping the Course
        System.out.println(repository.findAll());
        System.out.println(repository.count());
        System.out.println(repository.findByAuthor("Test"));
    }
}
```

By leveraging Spring Data JPA's repositories, you can focus more on the business logic and less on the data access code, promoting cleaner and more maintainable code within your Spring Boot application.

## Hibernate vs JPA

### JPA Specification

- JPA (Java Persistence API) provides a specification for:
    - Defining entities using the @Entity annotation.
    - Mapping attributes with annotations like @Column, @Id, @GeneratedValue, etc.
    - Managing entities through the EntityManager interface.

```java
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Column;

@Entity
public class SomeEntity {
    @Id
    @GeneratedValue
    private Long id;

    @Column(name = "name")
    private String name;

    // getters and setters
}
```


#### Hibernate as a JPA Implementation
- **Hibernate** is an ORM framework that implements JPA:
  - It provides additional features like caching and batch processing.
  - Hibernate `Session` is the equivalent of JPA's `EntityManager`.

```java
import org.hibernate.Session;
import org.hibernate.Transaction;

Session session = sessionFactory.openSession();
Transaction tx = session.beginTransaction();

SomeEntity entity = new SomeEntity();
entity.setName("Some Name");
session.save(entity);

tx.commit();
session.close();
```


#### Avoiding Direct Hibernate Dependency
- **Direct usage of Hibernate** ties your application to Hibernate-specific APIs:
  - This can limit your flexibility to switch ORM providers.
  - You can use JPA's `EntityManager` to stay vendor-independent.

```java
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

public class SomeDao {
    @PersistenceContext
    private EntityManager entityManager;

    public void saveEntity(SomeEntity entity) {
        entityManager.persist(entity);
    }
}
```


- Other JPA implementations, like **EclipseLink** (formerly known as Toplink), offer similar functionality with slight variations.


```java
import jakarta.persistence.EntityManager;
import jakarta.persistence.Persistence;

EntityManager entityManager = Persistence.createEntityManagerFactory("your-unit").createEntityManager();

entityManager.getTransaction().begin();

SomeEntity entity = new SomeEntity();
entity.setName("Another Name");
entityManager.persist(entity);

entityManager.getTransaction().commit();
entityManager.close();
```

## Hibernate Setup

### Hibernate cfg
```xml
<?xml version='1.0' encoding='utf-8'?>
<!--
  ~ Hibernate, Relational Persistence for Idiomatic Java
  ~
  ~ License: GNU Lesser General Public License (LGPL), version 2.1 or later.
  ~ See the lgpl.txt file in the root directory or <http://www.gnu.org/licenses/lgpl-2.1.html>.
  -->
<!DOCTYPE hibernate-configuration PUBLIC
	   "-//Hibernate/Hibernate Configuration DTD 3.0//EN"
	   "http://www.hibernate.org/dtd/hibernate-configuration-3.0.dtd">

<hibernate-configuration>

    <session-factory>

	   <!-- Database connection settings -->
	   <property name="connection.driver_class">org.h2.Driver</property>
	   <property name="connection.url">jdbc:h2:~/database;AUTO_SERVER=TRUE</property>
	   <property name="connection.username">sa</property>
	   <property name="connection.password"></property>

	   <!-- SQL dialect -->
	   <property name="dialect">org.hibernate.dialect.H2Dialect</property>

	   <!-- Echo all executed SQL to stdout -->
	   <property name="show_sql">true</property>

	   <!-- Names the annotated entity class -->
	   <mapping class="org.example.User"/>

    </session-factory>

</hibernate-configuration>
```

### Schema
```sql
create table users (
				   id identity primary key,
				   name varchar(255),
				   birth_date date
);

insert into users (name, birth_date) values ('marco', '1950-01-01');
insert into users (name, birth_date) values ('ocram', '1960-01-01');
```

### User Class
```java
package org.example;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "USERS")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(name = "birth_date")
    private LocalDate birthDate;

    public User() {
    }


    public User(String name, LocalDate birthDate) {
	   this.name = name;
	   this.birthDate = birthDate;
    }

    public Long getId() {
	   return id;
    }

    public void setId(Long id) {
	   this.id = id;
    }

    public String getName() {
	   return name;
    }

    public void setName(String name) {
	   this.name = name;
    }

    public LocalDate getBirthDate() {
	   return birthDate;
    }

    public void setBirthDate(LocalDate birthDate) {
	   this.birthDate = birthDate;
    }

    @Override
    public String toString() {
	   return "User{" +
			 "id=" + id +
			 ", name='" + name + '\'' +
			 ", birthDate=" + birthDate +
			 '}';
    }
}
```

### Hibernate
```java
package org.example;


import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.boot.MetadataSources;
import org.hibernate.boot.registry.StandardServiceRegistry;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Unit test for simple App.
 */
public class HibernateFullTest {

    private SessionFactory sessionFactory;

    @BeforeEach
    protected void setUp() throws Exception {
	   // A SessionFactory is set up once for an application!
	   final StandardServiceRegistry registry = new StandardServiceRegistryBuilder()
			 .configure() // configures settings from hibernate.cfg.xml
			 .build();
	   try {
		  sessionFactory = new MetadataSources( registry ).buildMetadata().buildSessionFactory();
	   }
	   catch (Exception e) {
		  // The registry would be destroyed by the SessionFactory, but we had trouble building the SessionFactory
		  // so destroy it manually.
		  StandardServiceRegistryBuilder.destroy( registry );
	   }
    }

    @AfterEach
    protected void tearDown() throws Exception {
	   if ( sessionFactory != null ) {
		  sessionFactory.close();
	   }
    }

    @SuppressWarnings("unchecked")
    @Test
    public void testBasicUsage() {
	   // create a couple of events...
	   Session session = sessionFactory.openSession();
	   session.beginTransaction();
	   session.remove(new User("Marco's Friend", LocalDate.now()));
	   session.getTransaction().commit();
	   session.close();

	   session = sessionFactory.openSession();
	   session.beginTransaction();
	   List<User> result = session.createQuery( "select u from User u" , User.class).list();
	   for ( User user : result) {
		  System.out.println( "User (" + user.getName() + ") : " + user.getBirthDate() );
	   }
	   session.getTransaction().commit();
	   session.close();
    }

    @Test
    public void marco_is_in_the_house() {
	   assertThat(1).isGreaterThanOrEqualTo(0);
    }
}
```

### More Hibernate Code Examples

```java
@Test
void save_my_first_object_to_the_db() {
    // Create a new instance of the User entity
    User user = new User("Lisa", LocalDate.now());

    // Open a new session from the session factory
    try (Session session = sessionFactory.openSession()) {
        // Begin a new transaction
        session.beginTransaction();

        // Save the user entity to the database
        session.persist(user);

        // Commit the transaction to finalize the insert operation
        session.getTransaction().commit();
    }
    // The session is automatically closed at the end of the try-with-resources block
}
```


```java
@Test
 void hql_fetch_users() {
        // Opening a session from the sessionFactory
        try (Session session = sessionFactory.openSession()) {
            // Starting a transaction for the current session
            session.beginTransaction();

            // Executing a Hibernate Query Language (HQL) query to fetch all User entities
            // The query is specified in a type-safe manner to return instances of User
            List<User> users = session.createQuery("from User u", User.class).list();

            // Iterating over the result list and printing each User object
            // Uses method reference for concise syntax
            users.forEach(System.out::println);

            // The transaction is not being committed or rolled back because we're only reading data
            // but it's a good practice to commit or rollback even read-only transactions
        }
        // Session is auto-closed due to try-with-resources, which ensures proper resource management
    }
```

### Building Your First Web Application

Building a web application involves understanding and integrating a variety of concepts and tools:

- **Web Application Fundamentals**
  - Browser interactions using HTML and CSS
  - Handling HTTP requests and responses
  - Managing user sessions and authentication

- **Spring MVC Components**
  - Dispatcher Servlet for request routing
  - View Resolvers for rendering views
  - Model-View-Controller (MVC) pattern for application structure
  - Validations for input data integrity

- **Spring Boot Features**
  - Starters for simplified dependency management
  - Auto Configuration for reducing boilerplate configuration

- **Supporting Frameworks/Tools**
  - JSP and JSTL for view templates
  - JPA for database interaction
  - Bootstrap for frontend styling
  - Spring Security for secure authentication
  - Databases like MySQL and H2 for data persistence

- **Goal**
  - To create a Todo Management Web Application using Spring Boot
  - Emphasize a modern approach with a hands-on experience
