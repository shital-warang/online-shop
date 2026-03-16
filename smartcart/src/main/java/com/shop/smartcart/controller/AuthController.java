
package com.shop.smartcart.controller;

import com.shop.smartcart.entity.LoginHistory;
import com.shop.smartcart.entity.User;
import com.shop.smartcart.repository.LoginHistoryRepository;
import com.shop.smartcart.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private LoginHistoryRepository loginHistoryRepo;

    // REGISTER
    @PostMapping("/register")
    public User register(@RequestBody User user) {

        user.setEmail(user.getEmail().trim().toLowerCase());
        user.setPassword(user.getPassword().trim());

        if (user.getRole() == null) {
            user.setRole("USER");
        }

        // Basic validation
        if (user.getPhone() == null || !user.getPhone().matches("\\d{10}")) {
            throw new IllegalArgumentException("Phone number must be 10 digits");
        }

        if (user.getAddress() == null || user.getAddress().trim().isEmpty()) {
            throw new IllegalArgumentException("Address cannot be empty");
        }

        return userRepository.save(user);
    }

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody User user) {

        String email = user.getEmail().trim().toLowerCase();
        String inputPassword = user.getPassword().trim();

        User dbUser = userRepository.findFirstByEmail(email);

        Map<String, String> response = new HashMap<>();

        if (dbUser == null) {
            response.put("status", "failed");
            response.put("message", "User not found");
            return response;
        }

        // Safer password check
        if (dbUser.getPassword() != null && dbUser.getPassword().trim().equals(inputPassword)) {

            LoginHistory history = new LoginHistory(email, LocalDateTime.now());
            loginHistoryRepo.save(history);

            response.put("status", "success");

            // Null-safe role handling
            String role = (dbUser.getRole() != null) ? dbUser.getRole().toUpperCase() : "USER";
            response.put("role", role);

            response.put("name", dbUser.getName());
            return response;
        } else {
            response.put("status", "failed");
            response.put("message", "Wrong password");
            return response;
        }
    }
}