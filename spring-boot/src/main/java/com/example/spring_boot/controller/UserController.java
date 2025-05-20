package com.example.spring_boot.controller;

import com.example.spring_boot.dto.LoginRequest;
import com.example.spring_boot.model.User;
import com.example.spring_boot.repository.UserRepo;
import com.example.spring_boot.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping // get to the base root... which is /api/user
    public List<User> getAllUsers(){
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id){
        return userService.getUserById(id);
    }

    // create a new user
    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user){
        User savedUser = userService.createUser(user);

        // returns the user object as well as a status code (200 OK)
        return ResponseEntity.ok(savedUser);
    }

    // update a user by their ID
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User updatedUser){
        User user = userService.updateUser(id, updatedUser);

        // returns the user object as well as a status code (200 OK)
        return ResponseEntity.ok(user);
    }

    // delete a user by ID
    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable Long id){
        userService.deleteUser(id);
        return "User with ID " + id + " deleted successfully.";
    }

    @Autowired
    private UserRepo userRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Valid LoginRequest loginRequest){
        return userRepository.findByEmail(loginRequest.getEmail())
                .map(user -> {
                    if (user.getPassword().equals(loginRequest.getPassword())){
//                        return ResponseEntity.ok("Login successful");
                        // return user info ( an object )
                        Map<String, Object> userData = new HashMap<>();
                        userData.put("id", user.getId());
                        userData.put("email", user.getEmail());
                        userData.put("username", user.getUsername());
                        return ResponseEntity.ok(userData);
                    } else {
                        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Password");
                    }
                })
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found"));
    }
}
