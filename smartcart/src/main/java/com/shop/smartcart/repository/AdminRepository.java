package com.shop.smartcart.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.shop.smartcart.entity.Admin;

public interface AdminRepository extends JpaRepository<Admin, Long> {
    Admin findByUsername(String username);
}
