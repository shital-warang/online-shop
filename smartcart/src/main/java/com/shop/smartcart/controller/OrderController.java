package com.shop.smartcart.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shop.smartcart.entity.Order;
import com.shop.smartcart.entity.OrderItem;
import com.shop.smartcart.repository.OrderItemRepository;
import com.shop.smartcart.repository.OrderRepository;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:3000")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    private Long currentLoggedInUserId;

    @PostMapping
    public Order placeOrder(@RequestBody Order order) {
        order.setUserId(currentLoggedInUserId); // backend me set karo
        // order.setUserName("User");
        return orderRepository.save(order);
    }

    // Add Order Items
    @PostMapping("/items")
    public OrderItem addOrderItem(@RequestBody OrderItem item) {
        return orderItemRepository.save(item);
    }

    // Get Orders by User
    @GetMapping("/user/{userId}")
    public Optional<Order> getUserOrders(@PathVariable Long userId) {
        return orderRepository.findById(userId);
    }

    // Get Order Items
    @GetMapping("/{orderId}/items")
    public List<OrderItem> getOrderItems(@PathVariable Long orderId) {
        return orderItemRepository.findByOrderId(orderId);
    }

    // ADMIN GET ALL ORDERS
    @GetMapping("/admin/all")
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @PutMapping("/admin/updateStatus/{id}/{status}")
    public Order updateStatus(@PathVariable Long id, @PathVariable String status) {
        Order o = orderRepository.findById(id).orElseThrow();
        o.setStatus(status);
        return orderRepository.save(o);
    }

    @PostMapping("/feedback/{id}")
    public String addFeedback(@PathVariable Long id, @RequestBody String feedback) {
        Order order = orderRepository.findById(id).orElse(null);
        if (order != null) {
            order.setFeedback(feedback);
            orderRepository.save(order);
            return "Feedback Saved";
        }
        return "Order Not Found";
    }

}
