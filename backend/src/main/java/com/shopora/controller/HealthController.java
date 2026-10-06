package com.shopora.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
@Tag(name = "Health", description = "System health check endpoint")
public class HealthController {

    @Autowired(required = false)
    private JdbcTemplate jdbcTemplate;

    @GetMapping("/health")
    @Operation(summary = "Check backend and database health status")
    public ResponseEntity<Map<String, Object>> checkHealth() {
        Map<String, Object> health = new HashMap<>();
        health.put("status", "UP");
        health.put("application", "Shopora E-Commerce Backend");
        health.put("tagline", "Shop Smart. Live Better.");
        health.put("timestamp", LocalDateTime.now());

        boolean dbStatus = false;
        if (jdbcTemplate != null) {
            try {
                jdbcTemplate.queryForObject("SELECT 1", Integer.class);
                dbStatus = true;
            } catch (Exception ignored) {
                dbStatus = false;
            }
        }
        health.put("database", dbStatus ? "CONNECTED" : "DISCONNECTED");

        return ResponseEntity.ok(health);
    }
}
