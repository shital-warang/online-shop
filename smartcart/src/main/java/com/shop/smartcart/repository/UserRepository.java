
// package com.shop.smartcart.repository;

// import com.shop.smartcart.entity.User;
// import org.springframework.data.jpa.repository.JpaRepository;

// public interface UserRepository extends JpaRepository<User, Long> {

//     User findFirstByEmail(String email);

//     Object countByActiveTrue();
// }

// package com.shop.smartcart.repository;

// import com.shop.smartcart.entity.User;
// import org.springframework.data.jpa.repository.JpaRepository;

// public interface UserRepository extends JpaRepository<User, Long> {

//     User findFirstByEmail(String email);

//     long countByActiveTrue(); // ✅ fixed
// }

package com.shop.smartcart.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.shop.smartcart.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

    @Modifying
    @Query("DELETE FROM User u WHERE u.id = :id")
    int deleteUserById(@Param("id") Long id);

    User findFirstByEmail(String trim);
}