package com.shop.smartcart.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shop.smartcart.repository.FeedbackRepository;
import com.shop.smartcart.repository.OrderRepository;
import com.shop.smartcart.repository.ProductRepository;
import com.shop.smartcart.repository.UserRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/admin")
public class AdminDashboardController {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private FeedbackRepository feedbackRepository;

    @GetMapping("/dashboard")
    public Map<String, Object> dashboard() {

        Map<String, Object> data = new HashMap<>();

        data.put("totalUsers", userRepository.count());
        data.put("totalProducts", productRepository.count());
        data.put("totalOrders", orderRepository.count());
        data.put("totalFeedback", feedbackRepository.count());

        Double revenue = orderRepository.findAll()
                .stream()
                .mapToDouble(o -> o.getTotalAmount())
                .sum();

        data.put("totalRevenue", revenue);

        return data;
    }
}
