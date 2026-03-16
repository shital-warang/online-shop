package com.shop.smartcart.dto;

import com.shop.smartcart.entity.OrderItem;
import java.util.List;

public class OrderRequestDto {

    private Long userId;
    private double totalAmount;
    private List<OrderItem> items;

    public Long getUserId() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getUserId'");
    }

    public double getTotalAmount() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getTotalAmount'");
    }

    public OrderItem[] getItems() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getItems'");
    }

    // getters setters
}
