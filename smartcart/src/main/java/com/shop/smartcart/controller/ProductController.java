package com.shop.smartcart.controller;

import com.shop.smartcart.entity.Product;
import com.shop.smartcart.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    // Add Product (Admin)
    @PostMapping
    public Product addProduct(@RequestBody Product product) {
        return productRepository.save(product);
    }

    // Get All Products (User)
    @GetMapping
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // Get Single Product
    @GetMapping("/{id}")
    public Product getProduct(@PathVariable Long id) {
        return productRepository.findById(id).orElse(null);
    }

    // Get Products by Category
    @GetMapping("/category/{category}")
    public List<Product> getByCategory(@PathVariable String category) {
        return productRepository.findByCategory(category);
    }

    // Delete Product
    @DeleteMapping("/{id}")
    public String deleteProduct(@PathVariable Long id) {
        productRepository.deleteById(id);
        return "Product Deleted";
    }

    // Update Product
    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody Product updatedProduct) {
        return productRepository.findById(id)
                .map(product -> {
                    product.setName(updatedProduct.getName());
                    product.setDescription(updatedProduct.getDescription());
                    product.setPrice(updatedProduct.getPrice());
                    product.setStock(updatedProduct.getStock());
                    product.setQuantity(updatedProduct.getQuantity());
                    product.setImageUrl(updatedProduct.getImageUrl());
                    product.setCategory(updatedProduct.getCategory());
                    productRepository.save(product);
                    return ResponseEntity.ok(product);
                })
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body(null));
    }

}
