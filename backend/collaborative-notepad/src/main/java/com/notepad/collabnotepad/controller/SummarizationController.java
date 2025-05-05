package com.notepad.collabnotepad.controller;

import com.notepad.collabnotepad.service.SummarizationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/summarize")
public class SummarizationController {

    @Autowired
    private SummarizationService summarizationService;

    @PostMapping
    public String summarizeText(@RequestBody String text) {
        return summarizationService.summarize(text);
    }
}
