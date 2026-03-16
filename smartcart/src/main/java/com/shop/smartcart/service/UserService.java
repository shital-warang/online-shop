package com.shop.smartcart.service;

import com.shop.smartcart.entity.User;
import com.shop.smartcart.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepo;

    public User registerUser(User user) {
        return userRepo.save(user);
    }

    public String loginUser(String email, String password) {

        System.out.println("LOGIN EMAIL = " + email);
        System.out.println("LOGIN PASS = " + password);

        User dbUser = userRepo.findFirstByEmail(email.trim());

        if (dbUser == null) {
            return "User Not Found";
        }

        System.out.println("DB EMAIL = " + dbUser.getEmail());
        System.out.println("DB PASS = " + dbUser.getPassword());

        if (dbUser.getPassword().trim().equals(password.trim())) {
            return "Login Success";
        }

        return "Invalid Password";
    }
}
