package com.example.spaceacademy.service;

import com.example.spaceacademy.model.ReevaluationRequest;
import com.example.spaceacademy.repository.ReevaluationRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReevaluationService {

    @Autowired
    private ReevaluationRequestRepository reevaluationRequestRepository;

    public List<ReevaluationRequest> getAllReevaluationRequests() {
        return reevaluationRequestRepository.findAll();
    }

    public ReevaluationRequest getReevaluationRequestById(Long id) {
        return reevaluationRequestRepository.findById(id).orElse(null);
    }

    public ReevaluationRequest createReevaluationRequest(ReevaluationRequest reevaluationRequest) {
        return reevaluationRequestRepository.save(reevaluationRequest);
    }

    public ReevaluationRequest updateReevaluationRequest(Long id, ReevaluationRequest requestDetails) {
        ReevaluationRequest request = reevaluationRequestRepository.findById(id).orElse(null);
        if (request != null) {
            request.setStudentName(requestDetails.getStudentName());
            request.setCourseName(requestDetails.getCourseName());
            request.setReason(requestDetails.getReason());
            request.setStatus(requestDetails.getStatus());
            return reevaluationRequestRepository.save(request);
        }
        return null;
    }

    public void deleteReevaluationRequest(Long id) {
        reevaluationRequestRepository.deleteById(id);
    }
}
