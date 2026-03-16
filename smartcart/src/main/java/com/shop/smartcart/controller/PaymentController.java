
package com.shop.smartcart.controller;

import com.shop.smartcart.entity.Payment;
import com.shop.smartcart.entity.User;
import com.shop.smartcart.repository.PaymentRepository;
import com.shop.smartcart.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/payments")
@CrossOrigin(origins = "http://localhost:3000")
public class PaymentController {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private UserRepository userRepository;

    // MAKE PAYMENT WITH USER
    @PostMapping("/{userId}")
    public Payment pay(
            @PathVariable Long userId,
            @RequestBody Payment payment) {

        // Find user
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Attach user to payment
        payment.setUser(user);

        // Save payment
        return paymentRepository.save(payment);
    }

    // GET PAYMENT BY ORDER ID
    @GetMapping("/order/{orderId}")
    public List<Payment> getPaymentByOrder(@PathVariable Long orderId) {
        return paymentRepository.findByOrderId(orderId);
    }

    // GET ALL PAYMENTS (ADMIN HISTORY)
    @GetMapping
    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    // GET PAYMENTS BY USER (User History)
    @GetMapping("/user/{userId}")
    public List<Payment> getPaymentsByUser(@PathVariable Long userId) {
        return paymentRepository.findByUserId(userId);
    }

    // DELETE PAYMENT
    @DeleteMapping("/{id}")
    public String deletePayment(@PathVariable Long id) {

        if (!paymentRepository.existsById(id)) {
            return "Payment not found";
        }

        paymentRepository.deleteById(id);
        return "Payment deleted successfully";
    }
}