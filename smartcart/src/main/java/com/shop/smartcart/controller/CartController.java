package com.shop.smartcart.controller;

import com.shop.smartcart.entity.CartItem;
import com.shop.smartcart.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "http://localhost:3000")
public class CartController {

    @Autowired
    private CartRepository cartRepository;

    // Add to Cart
    @PostMapping
    public CartItem addToCart(@RequestBody CartItem item) {
        return cartRepository.save(item);
    }

    // Get Cart by User
    @GetMapping("/{userId}")
    public List<CartItem> getCart(@PathVariable Long userId) {
        return cartRepository.findByUserId(userId);
    }

    // Remove Item
    @DeleteMapping("/{id}")
    public String removeItem(@PathVariable Long id) {
        cartRepository.deleteById(id);
        return "Item removed";
    }
}
