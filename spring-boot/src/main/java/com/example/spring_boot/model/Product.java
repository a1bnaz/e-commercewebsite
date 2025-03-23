package com.example.spring_boot.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

import java.math.BigInteger;

@Entity
@Table(name="Product") // sets the name of the table, default name is the name of the class
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Assuming auto-generated IDs
    private Long id;

    @NotBlank(message = "Product name cannot be empty.")
    @Size(min = 2, max = 50, message = "Product name must be between 2 and 50 characters.")
    private String name;

    @NotNull(message =  "Price cannot be null.")
    @Min(value = 0)
    private double price;

    @NotBlank(message = "Product must have a description")
    @Size(min = 0, max = 100, message = "Description must be between 0 and 100 characters.")
    private String description;

    @NotBlank(message = "Must state availability.")
    private String availability; // in stock, out of stock

    @PositiveOrZero(message = "Must be 0 or above.")
    private int quantity;

    public Product(){}

    public Product(String name, double price, String description, String availability, int quantity) {

        this.name = name;
        this.price = price;
        this.description = description;
        this.availability = availability;
        this.quantity = quantity;
    }

    public void setId(Long id){
        this.id = id;
    }

    public Long getId(){
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAvailability() {
        return availability;
    }

    public void setAvailability(String availability) {
        this.availability = availability;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
