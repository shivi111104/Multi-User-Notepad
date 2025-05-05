package com.notepad.collabnotepad.repository;

import com.notepad.collabnotepad.model.Revision;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RevisionRepository extends JpaRepository<Revision, Long> {
    List<Revision> findByDocumentIdOrderByTimestampDesc(Long documentId);
}
