package com.notepad.collabnotepad;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.jdbc.core.JdbcTemplate;

@SpringBootApplication
public class CollaborativeNotepadApplication implements CommandLineRunner {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public static void main(String[] args) {
        SpringApplication.run(CollaborativeNotepadApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        try {
            String sql = "SELECT 1";
            Integer result = jdbcTemplate.queryForObject(sql, Integer.class);
            System.out.println("Database connection test: " + (result == 1 ? "SUCCESSFUL" : "FAILED"));
        } catch (Exception e) {
            System.err.println("Database connection test FAILED: " + e.getMessage());
            e.printStackTrace();
        }
    }
}