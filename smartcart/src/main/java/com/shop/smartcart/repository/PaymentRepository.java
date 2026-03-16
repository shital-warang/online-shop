// package com.shop.smartcart.repository;

// import com.shop.smartcart.entity.Payment;
// import org.springframework.data.jpa.repository.JpaRepository;

// import java.util.List;

// public interface PaymentRepository extends JpaRepository<Payment, Long> {
//     List<Payment> findByOrderId(Long orderId);

//     Double sumRevenue();
// }

// package com.shop.smartcart.repository;

// import com.shop.smartcart.entity.Payment;
// import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.data.jpa.repository.Query;

// import java.util.List;

// public interface PaymentRepository extends JpaRepository<Payment, Long> {

//     List<Payment> findByOrderId(Long orderId);

//     // Total Revenue
//     @Query("SELECT COALESCE(SUM(p.amount),0) FROM Payment p")
//     Double sumRevenue();

//     // Only successful payments revenue
//     @Query("SELECT COALESCE(SUM(p.amount),0) FROM Payment p WHERE p.status='SUCCESS'")
//     Double sumSuccessRevenue();
// }

// package com.shop.smartcart.repository;

// import org.springframework.data.jpa.repository.JpaRepository;

// import com.shop.smartcart.entity.Payment;

// import java.util.List;

// public interface PaymentRepository extends JpaRepository<Payment, Long> {

//     List<Payment> findByOrderId(Long orderId);

//     List<Payment> findByUserId(Long userId);
// }

package com.shop.smartcart.repository;

import com.shop.smartcart.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PaymentRepository extends JpaRepository<Payment, Long> {

    List<Payment> findByOrderId(Long orderId);

    List<Payment> findByUserId(Long userId);

}