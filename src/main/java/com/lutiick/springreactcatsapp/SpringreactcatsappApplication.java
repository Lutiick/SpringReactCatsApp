package com.lutiick.springreactcatsapp;

import com.lutiick.springreactcatsapp.model.Role;
import com.lutiick.springreactcatsapp.model.User;
import com.lutiick.springreactcatsapp.service.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class SpringreactcatsappApplication {

    public static void main(String[] args) {
        SpringApplication.run(SpringreactcatsappApplication.class, args);
    }

//    @Bean
//    CommandLineRunner run(UserService userService) {
//        return args -> {
//            Role role = new Role();
//            role.setName("ROLE_USER");
//            userService.saveRole(role);
//            User user = new User();
//            user.setUsername("123");
//            user.setPassword("123");
//            user.setName("name");
//            userService.saveUser(user);
//            userService.addRoleToUser(user.getUsername(), role.getName());
//        };
//    }
}
