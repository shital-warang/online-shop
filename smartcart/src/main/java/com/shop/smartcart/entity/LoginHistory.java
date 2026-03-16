package com.shop.smartcart.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class LoginHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;

    private String password;

    public Long getId() {
        return id;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public LocalDateTime getLoginTime() {
        return loginTime;
    }

    public void setLoginTime(LocalDateTime loginTime) {
        this.loginTime = loginTime;
    }

    private LocalDateTime loginTime;

    public LoginHistory() {
    }

    public LoginHistory(String email, LocalDateTime loginTime) {
        this.email = email;
        this.loginTime = loginTime;
    }

    // getters and setters
}
