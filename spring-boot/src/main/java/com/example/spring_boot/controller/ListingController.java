package com.example.spring_boot.controller;

import com.example.spring_boot.model.Listing;
import com.example.spring_boot.service.ListingService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:5173", "https://e-commercewebsite-pi.vercel.app/"})
@RequestMapping("/api/listings")
public class ListingController {

    @Autowired
    private ListingService listingService;

    @GetMapping // an empty GetMapping annotation means it just goes to the base root, which is /api/listings
    public List<Listing> getAllListings(){
        return listingService.getAllListings();
    }

    @GetMapping("/{id}")
    public Listing getListingById(@PathVariable Long id){
        return listingService.getListingById(id);
    }

    @GetMapping("/users/{userId}")
    public List<Listing> getListingsByUser(@PathVariable Long userId){
        return listingService.findByUserId(userId);
    }

    // create a new listing
    @PostMapping
    public ResponseEntity<Listing> createListing( /*@Valid*/ @RequestBody Listing listing){
        System.out.println("Received listing: " + listing);
        System.out.println("User: " + listing.getUser());
        System.out.println("User ID: " + (listing.getUser() != null ? listing.getUser().getId() : "null"));

        Listing savedListing = listingService.createListing(listing);

        // returns the listing object as well as a status code (200 OK)
        return ResponseEntity.ok(savedListing);
    }

    // update a listing by their ID
    @PutMapping("/{id}")
    public ResponseEntity<Listing> updateListing(@PathVariable Long id, @Valid @RequestBody Listing updatedListing){
        Listing listing = listingService.updateListing(id, updatedListing);

        // returns the listing object as well as a status code (200 OK)
        return ResponseEntity.ok(listing);
    }

    // delete a listing by ID
    @DeleteMapping("/{id}")
    public String deleteListing(@PathVariable Long id){
        listingService.deleteListing(id);
        return "Listing with ID " + id + " deleted successfully.";
    }

}