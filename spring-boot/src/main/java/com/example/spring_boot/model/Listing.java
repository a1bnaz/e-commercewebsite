package com.example.spring_boot.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

//test
@Entity
@Table(name="listings") // sets the name of the table, default name is the name of the class
public class Listing {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Assuming auto-generated IDs
    private Long id;

    @NotBlank(message = "Listing name cannot be empty.")
    @Size(min = 2, max = 50, message = "Listing name must be between 2 and 50 characters.")
    private String name;

    @NotNull(message =  "Price cannot be null.")
    @Min(value = 0)
    private double price;

    @NotBlank(message = "Listing must have a description")
    @Size(min = 0, max = 100, message = "Description must be between 0 and 100 characters.")
    private String description;

    @ManyToOne // this means that many listings can belong to one user (many-to-one relationship)
    // tells JPA to create a foreign key column named "user_id" in the Listing table
    // links each listing to the user that created it. "nullable = false" means every listing *must* have a user
    @JoinColumn(name = "user_id", nullable = false)
    private User user;


    public Listing(){}

    public Listing(String name, double price, String description, String availability, int quantity) {

        this.name = name;
        this.price = price;
        this.description = description;
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

    public User getUser(){
        return user;
    }

    public void setUser(User user){
        this.user = user;
    }
}
