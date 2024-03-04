# Spring Boot 3 and Spring Framework 6

## Table of Context
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
  - ...
