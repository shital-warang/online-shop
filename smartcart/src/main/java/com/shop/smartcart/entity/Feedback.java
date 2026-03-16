// package com.shop.smartcart.entity;

// import jakarta.persistence.Entity;
// import jakarta.persistence.GeneratedValue;
// import jakarta.persistence.GenerationType;
// import jakarta.persistence.Id;

// @Entity
// public class Feedback {

//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long id;

//     private int rating;
//     private String comment;
// }

// package com.shop.smartcart.entity;

// import jakarta.persistence.*;

// @Entity
// public class Feedback {

//     public Long getId() {
//         return id;
//     }

//     public void setId(Long id) {
//         this.id = id;
//     }

//     public String getName() {
//         return name;
//     }

//     public void setName(String name) {
//         this.name = name;
//     }

//     public String getMessage() {
//         return message;
//     }

//     public void setMessage(String message) {
//         this.message = message;
//     }

//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long id;

//     private String name;
//     private String message;

//     // getters and setters
// }

// package com.shop.smartcart.entity;

// import jakarta.persistence.*;

// @Entity
// @Table(name = "feedback")
// public class Feedback {

//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long id;

//     private String name;

//     private String message;

//     private int rating; // 👈 ADD THIS

//     public Feedback() {
//     }

//     public Long getId() {
//         return id;
//     }

//     public String getName() {
//         return name;
//     }

//     public String getMessage() {
//         return message;
//     }

//     public int getRating() { // 👈 ADD
//         return rating;
//     }

//     public void setId(Long id) {
//         this.id = id;
//     }

//     public void setName(String name) {
//         this.name = name;
//     }

//     public void setMessage(String message) {
//         this.message = message;
//     }

//     public void setRating(int rating) { // 👈 ADD
//         this.rating = rating;
//     }
// }

// package com.shop.smartcart.entity;

// import jakarta.persistence.*;

// @Entity
// @Table(name = "feedback")
// public class Feedback {

//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long id;

//     private String message;

//     private int rating;

//     // 🔥 USER RELATION ADD
//     @ManyToOne
//     @JoinColumn(name = "user_id")
//     private User user;

//     public Feedback() {
//     }

//     public Long getId() {
//         return id;
//     }

//     public String getMessage() {
//         return message;
//     }

//     public int getRating() {
//         return rating;
//     }

//     public User getUser() {
//         return user;
//     }

//     public void setId(Long id) {
//         this.id = id;
//     }

//     public void setMessage(String message) {
//         this.message = message;
//     }

//     public void setRating(int rating) {
//         this.rating = rating;
//     }

//     public void setUser(User user) {
//         this.user = user;
//     }

//     public Object getName() {
//         // TODO Auto-generated method stub
//         throw new UnsupportedOperationException("Unimplemented method 'getName'");
//     }

//     public void setName(Object name) {
//         // TODO Auto-generated method stub
//         throw new UnsupportedOperationException("Unimplemented method 'setName'");
//     }
// }

package com.shop.smartcart.entity;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "feedback")
public class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String message;

    private int rating;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User user;

    public Feedback() {
    }

    public Long getId() {
        return id;
    }

    public String getMessage() {
        return message;
    }

    public int getRating() {
        return rating;
    }

    public User getUser() {
        return user;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public void setUser(User user) {
        this.user = user;
    }
}