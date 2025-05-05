package com.notepad.collabnotepad.controller;

import com.notepad.collabnotepad.model.Revision;
import com.notepad.collabnotepad.service.RevisionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/revisions")
@CrossOrigin(origins = "*")
public class RevisionController {

    @Autowired
    private RevisionService revisionService;

    @GetMapping("/document/{docId}")
    public List<Revision> getRevisionsByDocument(@PathVariable Long docId) {
        return revisionService.getRevisionsByDocumentId(docId);
    }

    @PostMapping
    public Revision saveRevision(@RequestBody Revision revision) {
        return revisionService.saveRevision(revision);
    }
}
