package com.notepad.collabnotepad.repository;

import com.notepad.collabnotepad.model.Document;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DocumentRepository extends JpaRepository<Document, Long> {

    // You can add custom queries if needed. For now, basic CRUD is handled by JpaRepository.

    // 🔹 Optional: Get documents by title (if needed later)
    List<Document> findByTitleContainingIgnoreCase(String title);
}
