package com.randy.springboot.myfirstwebapp.security;

import java.util.function.Function;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SpringSecurityConfiguration {
    //LDAP or Database
    //In Memory

    //InMemoryUserDetailsManager
    //InMemoryUserDetailsManager(UserDetails... users)

    @Bean
    public InMemoryUserDetailsManager createUserDetailsManager() {
//        The first String inside the < > specifies the type of the argument that the function accepts. In this context, it means the Function takes a String as input.
//        The second String inside the < > specifies the return type of the function. In this context, it means the Function returns a String as its result.
        Function<String, String> passwordEncoder //
                = input -> passwordEncoder().encode(input);

		UserDetails userDetails1 = createNewUser(passwordEncoder, "test1", "1");
        UserDetails userDetails2 = createNewUser(passwordEncoder, "test2", "2");
        return new InMemoryUserDetailsManager(userDetails1, userDetails2);
    }

    private static UserDetails createNewUser(Function<String, String> passwordEncoder, String username, String password) {
        UserDetails userDetails = User.builder()
                .passwordEncoder(passwordEncoder)
                .username(username)
                .password(password)
                .roles("USER", "ADMIN")
                .build();
        return userDetails;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        // Configure authorization for HTTP requests
        http.authorizeHttpRequests((auth) ->
                auth.anyRequest().authenticated()  // Require authentication for all requests
        );

        // Configure form-based authentication with default settings
        http.formLogin(Customizer.withDefaults());

        // Disable Cross-Site Request Forgery (CSRF) protection
        // Typically done for services where clients do not need to hold a CSRF token (e.g., REST APIs)
        http.csrf((csrf) -> csrf.disable());

        // Disable the X-Frame-Options header to allow frames from any origin
        // This can be necessary for allowing iframes to display content from this application
        http.headers((headers) -> headers.frameOptions((frameOptions) -> frameOptions.disable()));

        // Build and return the SecurityFilterChain instance with the above configurations
        return http.build();
    }


}