# =========================================================================
# Multi-stage Dockerfile for Shopora Spring Boot Backend (Java 21 LTS)
# =========================================================================

# Stage 1: Build stage with Maven and Eclipse Temurin JDK 21
FROM maven:3.9.6-eclipse-temurin-21-alpine AS build
WORKDIR /app

# Copy pom.xml and pre-fetch dependencies for fast cached builds
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy source code and package application jar
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Lightweight runtime stage with Eclipse Temurin JRE 21
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Non-root user for enhanced security
RUN addgroup -S shopora && adduser -S shopora -G shopora
USER shopora:shopora

# Copy packaged jar from build stage
COPY --from=build --chown=shopora:shopora /app/target/shopora-backend-1.0.0-SNAPSHOT.jar app.jar

# Expose dynamic port
EXPOSE 8080
ENV PORT=8080

# Execute Spring Boot application
ENTRYPOINT ["java", "-Djava.security.egd=file:/dev/./urandom", "-jar", "app.jar"]
