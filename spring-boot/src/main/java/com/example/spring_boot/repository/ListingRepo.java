package com.example.spring_boot.repository;

import com.example.spring_boot.model.Listing;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ListingRepo extends JpaRepository<Listing, Long> {
    List<Listing> findByUserId(Long userId);
}
