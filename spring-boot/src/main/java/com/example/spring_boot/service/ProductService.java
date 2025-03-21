package com.example.spring_boot.service;

import com.example.spring_boot.model.Product;
import com.example.spring_boot.repository.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepo productRepository;

    public List<Product> getAllProducts(){
        return productRepository.findAll();
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Could not find a product with id: " + id));
    }

    public Product createProduct(Product product){
        return productRepository.save(product);
    }

    public Product updateProduct(Long id, Product updatedProduct){
        // 1. find the product by ID
        Optional<Product> existingProductOpt = productRepository.findById(id);

        if(existingProductOpt.isPresent()){
            // 2. get the existing product
            Product existingProduct = existingProductOpt.get();

            // 3. update the fields
            existingProduct.setName(updatedProduct.getName());
            existingProduct.setPrice(updatedProduct.getPrice());
            existingProduct.setAvailability(updatedProduct.getAvailability());
            existingProduct.setQuantity(updatedProduct.getQuantity());
            existingProduct.setDescription(updatedProduct.getDescription());

            return productRepository.save(existingProduct);
        } else {
            throw new RuntimeException("Product with ID " + id + " not found.");
        }
    }

    public void deleteProduct(Long id){
        productRepository.deleteById(id);
    }
}
