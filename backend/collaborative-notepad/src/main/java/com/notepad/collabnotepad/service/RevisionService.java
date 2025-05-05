package com.notepad.collabnotepad.service;

import com.notepad.collabnotepad.model.Revision;
import com.notepad.collabnotepad.repository.RevisionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RevisionService {
    @Autowired
    private RevisionRepository revisionRepository;

    public List<Revision> getRevisionsByDocumentId(Long documentId) {
        return revisionRepository.findByDocumentIdOrderByTimestampDesc(documentId);
    }

    public Revision saveRevision(Revision revision) {
        return revisionRepository.save(revision);
    }
}
