
package com.shop.smartcart.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.shop.smartcart.entity.Feedback;
import com.shop.smartcart.repository.FeedbackRepository;

@RestController
@RequestMapping("/api/feedback")
@CrossOrigin(origins = "http://localhost:3000")
public class FeedbackPageController {

    @Autowired
    private FeedbackRepository feedbackRepository;

    @PostMapping
    public Feedback saveFeedback(@RequestBody Feedback feedback) {
        return feedbackRepository.save(feedback);
    }
}