package com.example.spaceacademy.controller;

import com.example.spaceacademy.model.ReevaluationRequest;
import com.example.spaceacademy.service.ReevaluationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reevaluations")
public class ReevaluationController {

    @Autowired
    private ReevaluationService reevaluationService;

    @GetMapping
    public List<ReevaluationRequest> getAllReevaluationRequests() {
        return reevaluationService.getAllReevaluationRequests();
    }

    @GetMapping("/{id}")
    public ReevaluationRequest getReevaluationRequestById(@PathVariable Long id) {
        return reevaluationService.getReevaluationRequestById(id);
    }

    @PostMapping
    public ReevaluationRequest createReevaluationRequest(@RequestBody ReevaluationRequest reevaluationRequest) {
        return reevaluationService.createReevaluationRequest(reevaluationRequest);
    }

    @PutMapping("/{id}")
    public ReevaluationRequest updateReevaluationRequest(@PathVariable Long id, @RequestBody ReevaluationRequest requestDetails) {
        return reevaluationService.updateReevaluationRequest(id, requestDetails);
    }

    @DeleteMapping("/{id}")
    public void deleteReevaluationRequest(@PathVariable Long id) {
        reevaluationService.deleteReevaluationRequest(id);
    }
}
