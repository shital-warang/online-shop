
package com.shop.smartcart.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.shop.smartcart.entity.Admin;
import com.shop.smartcart.repository.AdminRepository;

@RestController
@RequestMapping("/api/admin/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminAuthController {

    @Autowired
    private AdminRepository adminRepository;

    // ✅ Admin registration
    @PostMapping("/register")
    public String register(@RequestBody Admin admin) {
        if (adminRepository.findByUsername(admin.getUsername()) != null) {
            return "Username already exists";
        }
        adminRepository.save(admin);
        return "Admin Registered Successfully";
    }

    // ✅ Admin login compatible with frontend "SUCCESS" check
    @PostMapping("/login")
    public String login(@RequestBody Admin admin) {
        Admin existing = adminRepository.findByUsername(admin.getUsername());

        if (existing == null) {
            return "FAIL"; // Admin not found
        }

        if (!existing.getPassword().equals(admin.getPassword())) {
            return "FAIL"; // Wrong password
        }

        // Password matches, login successful
        return "SUCCESS"; // ✅ Frontend expects exactly this string
    }
}