
package com.shop.smartcart.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.transaction.annotation.Transactional;

import com.shop.smartcart.entity.User;
import com.shop.smartcart.repository.UserRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/admin/users")
public class AdminUserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Block user safely
    @PutMapping("/block/{id}")
    public ResponseEntity<?> blockUser(@PathVariable Long id) {
        return userRepository.findById(id)
                .map(user -> {
                    user.setActive(false); // sirf active change
                    userRepository.save(user); // password untouched
                    return ResponseEntity.ok(Map.of("message", "User Blocked"));
                })
                .orElse(ResponseEntity.status(404).body(Map.of("message", "User not found")));
    }

    // Unblock user safely
    @PutMapping("/unblock/{id}")
    public ResponseEntity<?> unblockUser(@PathVariable Long id) {
        return userRepository.findById(id)
                .map(user -> {
                    user.setActive(true);
                    userRepository.save(user); // password untouched
                    return ResponseEntity.ok(Map.of("message", "User Unblocked"));
                })
                .orElse(ResponseEntity.status(404).body(Map.of("message", "User not found")));
    }

    // Delete user directly – safe even if password is null
    @Transactional
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        int deleted = userRepository.deleteUserById(id); // direct delete
        if (deleted == 0) {
            return ResponseEntity.status(404).body(Map.of("message", "User not found"));
        }
        return ResponseEntity.ok(Map.of("message", "User Deleted"));
    }
}