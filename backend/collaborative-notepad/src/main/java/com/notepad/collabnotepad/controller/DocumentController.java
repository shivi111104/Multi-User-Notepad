package com.notepad.collabnotepad.controller;

import com.notepad.collabnotepad.model.Document;
import com.notepad.collabnotepad.repository.DocumentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/documents")
public class DocumentController {

    @Autowired
    private DocumentRepository documentRepository;

    // 🔹 Get all documents
    @GetMapping
    public List<Document> getAllDocuments() {
        return documentRepository.findAll();
    }

    // 🔹 Get document by ID
    @GetMapping("/{id}")
    public Optional<Document> getDocumentById(@PathVariable Long id) {
        return documentRepository.findById(id);
    }

    // 🔹 Create new document
    @PostMapping
    public Document createDocument(@RequestBody Document document) {
        document.setCreatedAt(LocalDateTime.now());
        document.setUpdatedAt(LocalDateTime.now());
        return documentRepository.save(document);
    }

    // 🔹 Update existing document
    @PutMapping("/{id}")
    public Document updateDocument(@PathVariable Long id, @RequestBody Document updatedDocument) {
        return documentRepository.findById(id).map(document -> {
            document.setTitle(updatedDocument.getTitle());
            document.setContent(updatedDocument.getContent());
            document.setUpdatedAt(LocalDateTime.now());
            return documentRepository.save(document);
        }).orElseGet(() -> {
            updatedDocument.setId(id);
            updatedDocument.setCreatedAt(LocalDateTime.now());
            updatedDocument.setUpdatedAt(LocalDateTime.now());
            return documentRepository.save(updatedDocument);
        });
    }

    // 🔹 Delete a document
    @DeleteMapping("/{id}")
    public void deleteDocument(@PathVariable Long id) {
        documentRepository.deleteById(id);
    }
}
