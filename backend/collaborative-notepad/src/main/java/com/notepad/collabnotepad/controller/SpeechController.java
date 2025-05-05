package com.notepad.collabnotepad.controller;

import com.notepad.collabnotepad.service.SpeechService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/speech")
public class SpeechController {

    @Autowired
    private SpeechService speechService;

    @PostMapping(value = "/transcribe", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public String transcribeAudio(@RequestParam("file") MultipartFile file) {
        return speechService.transcribe(file);
    }
}
