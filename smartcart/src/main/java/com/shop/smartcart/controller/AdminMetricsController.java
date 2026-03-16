
package com.shop.smartcart.controller;

import com.shop.smartcart.repository.UserRepository;
import com.shop.smartcart.repository.ProductRepository;
import com.shop.smartcart.repository.OrderRepository;
import com.shop.smartcart.repository.PaymentRepository;
import com.shop.smartcart.repository.FeedbackRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/metrics")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminMetricsController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private FeedbackRepository feedbackRepository;

    @GetMapping
    public Map<String, Long> getMetrics() {

        Map<String, Long> metrics = new HashMap<>();

        metrics.put("totalUsers", userRepository.count());
        metrics.put("totalProducts", productRepository.count());
        metrics.put("totalOrders", orderRepository.count());
        metrics.put("totalPayments", paymentRepository.count());
        metrics.put("totalFeedback", feedbackRepository.count());

        return metrics;
    }
}