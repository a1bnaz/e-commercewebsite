package com.example.spring_boot.service;

import com.example.spring_boot.model.User;
import com.example.spring_boot.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepository;

    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    public User getUserById(Long id){
        return userRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Could not find a user with id: " + id));
    }

    public User createUser(User user){
        return userRepository.save(user);
    }

    public User updateUser(Long id, User updatedUser){
        Optional<User> existingUserOpt = userRepository.findById(id);

        if(existingUserOpt.isPresent()){
            User existingUser = existingUserOpt.get();

            // update the fields
            existingUser.setUsername(updatedUser.getUsername());
            existingUser.setEmail(updatedUser.getEmail());
            existingUser.setPassword(updatedUser.getPassword());

            return userRepository.save(existingUser);
        } else {
            throw new RuntimeException("User with ID " + id + " not found.");
        }
    }

    public void deleteUser(Long id){
        userRepository.deleteById(id);
    }
}
