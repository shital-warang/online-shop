
package com.shop.smartcart.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.shop.smartcart.entity.Feedback;
import com.shop.smartcart.repository.FeedbackRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/admin/feedback")
public class AdminFeedbackController {

    @Autowired
    private FeedbackRepository feedbackRepository;

    @GetMapping
    public List<Feedback> getAllFeedback() {
        return feedbackRepository.findAll();
    }

    @DeleteMapping("/{id}")
    public String deleteFeedback(@PathVariable Long id) {
        feedbackRepository.deleteById(id);
        return "Feedback Deleted";
    }

    @PutMapping("/{id}")
    public Feedback updateFeedback(@PathVariable Long id, @RequestBody Feedback updatedFeedback) {

        Feedback feedback = feedbackRepository.findById(id).orElseThrow();

        feedback.setMessage(updatedFeedback.getMessage());
        feedback.setRating(updatedFeedback.getRating());

        return feedbackRepository.save(feedback);
    }
}