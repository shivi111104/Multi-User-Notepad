package com.notepad.collabnotepad.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.*;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(new com.notepad.collabnotepad.controller.WebSocketController(), "/editor")
                .setAllowedOrigins("*");
    }
}
