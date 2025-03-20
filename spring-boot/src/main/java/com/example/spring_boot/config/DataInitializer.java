package com.example.spring_boot.config;

import com.example.spring_boot.model.Product;
import com.example.spring_boot.repository.ProductRepo;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

// this class is used to load in temporary sample data!!!
@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initDatabase(ProductRepo repository){
        return args -> {
            repository.save(new Product("phone", 99.99, "put this in your pocket!", "in-stock", 10));
            repository.save(new Product("basketball", 5, "bouncy ball", "out-of-stock", 0));
            repository.save(new Product("jacket", 50, "keeps u warm", "pre-order", 100));


        };
    }
}
