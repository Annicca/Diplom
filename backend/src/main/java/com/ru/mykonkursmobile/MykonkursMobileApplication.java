package com.ru.mykonkursmobile;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

//
@SpringBootApplication
@ComponentScan(basePackages = {"com.ru.mykonkursmobile.controllers", "com.ru.mykonkursmobile.services", "com.ru.mykonkursmobile.config", "com.ru.mykonkursmobile.security" , "com.ru.mykonkursmobile.security.auth"})
@EntityScan(basePackages = {"com.ru.mykonkursmobile.models", "com.ru.mykonkursmobile.dto"})
@EnableJpaRepositories("com.ru.mykonkursmobile.repositoryes")
public class MykonkursMobileApplication {
	public static void main(String[] args) {
		SpringApplication.run(MykonkursMobileApplication.class, args);
	}

}
