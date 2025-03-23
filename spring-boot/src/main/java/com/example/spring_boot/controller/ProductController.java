package com.example.spring_boot.controller;

import com.example.spring_boot.model.Product;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.spring_boot.service.ProductService;

import java.math.BigInteger;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping // an empty GetMapping annotation means it just goes to the base root, which is /api
    public List<Product> getAllProducts(){
        return productService.getAllProducts();
    }

    @GetMapping("/{id}")
    public Product getProductById(@PathVariable Long id){
        return productService.getProductById(id);
    }

    // create a new product
    @PostMapping
    public ResponseEntity<Product> createProduct(@Valid @RequestBody Product product){
        Product savedProduct = productService.createProduct(product);

        // returns the product object as well as a status code (200 OK)
        return ResponseEntity.ok(savedProduct);
    }

    // update a product by their ID
    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @Valid @RequestBody Product updatedProduct){
        Product product = productService.updateProduct(id, updatedProduct);

        // returns the product object as well as a status code (200 OK)
        return ResponseEntity.ok(product);
    }

    // delete a product by ID
    @DeleteMapping("/{id}")
    public String deleteProduct(@PathVariable Long id){
        productService.deleteProduct(id);
        return "Product with ID " + id + " deleted successfully.";
    }

}