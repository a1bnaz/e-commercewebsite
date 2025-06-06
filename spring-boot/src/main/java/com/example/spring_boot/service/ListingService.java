package com.example.spring_boot.service;

import com.example.spring_boot.model.Listing;
import com.example.spring_boot.repository.ListingRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class ListingService {

    @Autowired
    private ListingRepo listingRepository;

    public List<Listing> getAllListings(){
        return listingRepository.findAll();
    }

    public Listing getListingById(Long id) {
        return listingRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Could not find a listing with id: " + id));
    }

    public Listing createListing(Listing listing){
        return listingRepository.save(listing);
    }

    public Listing updateListing(Long id, Listing updatedListing){
        // 1. find the listing by ID
        Optional<Listing> existingListingOpt = listingRepository.findById(id);

        if(existingListingOpt.isPresent()){
            // 2. get the existing listing
            Listing existingListing = existingListingOpt.get();

            // 3. update the fields
            existingListing.setName(updatedListing.getName());
            existingListing.setPrice(updatedListing.getPrice());
            existingListing.setDescription(updatedListing.getDescription());

            return listingRepository.save(existingListing);
        } else {
            throw new RuntimeException("Listing with ID " + id + " not found.");
        }
    }

    public void deleteListing(Long id){
        listingRepository.deleteById(id);
    }

    public List<Listing> findByUserId(Long userId) {
        return listingRepository.findByUserId(userId);
    }
}
