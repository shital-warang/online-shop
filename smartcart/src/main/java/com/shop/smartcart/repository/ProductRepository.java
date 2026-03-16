package com.shop.smartcart.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shop.smartcart.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findByCategory(String category);
}
