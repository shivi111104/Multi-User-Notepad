package com.notepad.collabnotepad.controller;

import com.notepad.collabnotepad.model.Comment;
import com.notepad.collabnotepad.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
@CrossOrigin(origins = "*")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @GetMapping("/document/{docId}")
    public List<Comment> getCommentsByDocument(@PathVariable Long docId) {
        return commentService.getCommentsByDocumentId(docId);
    }

    @PostMapping
    public Comment addComment(@RequestBody Comment comment) {
        return commentService.addComment(comment);
    }
}
