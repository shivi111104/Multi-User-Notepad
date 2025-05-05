package com.notepad.collabnotepad.service;

import com.notepad.collabnotepad.model.Comment;
import com.notepad.collabnotepad.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentService {
    @Autowired
    private CommentRepository commentRepository;

    public List<Comment> getCommentsByDocumentId(Long documentId) {
        return commentRepository.findByDocumentId(documentId);
    }

    public Comment addComment(Comment comment) {
        return commentRepository.save(comment);
    }
}
