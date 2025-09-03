package com.example.spaceacademy.service;

import com.example.spaceacademy.model.Result;
import com.example.spaceacademy.repository.ResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ResultService {

    @Autowired
    private ResultRepository resultRepository;

    public List<Result> getAllResults() {
        return resultRepository.findAll();
    }

    public Result getResultById(Long id) {
        return resultRepository.findById(id).orElse(null);
    }

    public Result createResult(Result result) {
        return resultRepository.save(result);
    }
}
