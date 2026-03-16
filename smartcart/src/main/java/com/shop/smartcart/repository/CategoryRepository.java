package com.shop.smartcart.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.shop.smartcart.entity.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {

}