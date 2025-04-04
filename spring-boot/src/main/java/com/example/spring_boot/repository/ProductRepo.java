package com.example.spring_boot.repository;

import com.example.spring_boot.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepo extends JpaRepository<Product, Long> {

}
