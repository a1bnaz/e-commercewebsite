package com.example.spring_boot.repository;

import com.example.spring_boot.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepo extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email); // custom finder

    /*
    Optional<User>:
        - the return type
        - says "you might get a User, or maybe you won't"
        - helps avoid null errors
    findByEmail:
        - this is a spring data JPA custom query method
        - spring automatically creates the sql for this because of the name!
        - "findBy + Email" -> SQL: SELECT * FROM user WHERE email = ?
    (String email):
        - the parameter you pass in, used to match the user's email

     spring reads the method name and builds the query automatically. no need to write raw SQL
     */
}
