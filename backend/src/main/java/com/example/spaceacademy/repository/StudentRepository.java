package com.example.spaceacademy.repository;

import com.example.spaceacademy.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student, Long> {
}
