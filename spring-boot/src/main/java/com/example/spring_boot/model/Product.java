package com.example.spring_boot.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.*;

import java.math.BigInteger;

@Entity

/* NOTES
--> the @Entity annotation lets hibernate know that this class is mapped toa  table in your database
--> JPA will automatically generate SQL to crate, read, update, and delete instances of this class (which correspond to rows in the databse table)
--> when spring boot starts, it will scan all classes with @Entity annotations and automatically register them as beans inside of the application context, and JPA will manage them
--> hibernate is an object-relational-mapping (ORM) framework for java and allows you to interact with a relational database using java objects instead of writing raw SQL queries
 */
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

    /* NOTES
    --> public constructor is required by JPA
    --> this is because JPa needs ot be able to create an instance of your entity class without knowing any of the field values. it can then populate the fields using the data from the database
    --> the empty constructor is used to instantiate an object before setting the values of its fields
    --> without an empty constructor, hibernate wouldn't know how to create  the object when retrieving data from the database
 */
    public Product(){}

    public Product(String name, double price, String description, String availability, int quantity) {

        this.name = name;
        this.price = price;
        this.description = description;
        this.availability = availability;
        this.quantity = quantity;
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
