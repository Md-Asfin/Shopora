package com.shopora.repository;

import com.shopora.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    Optional<Category> findBySlug(String slug);
    Optional<Category> findByNameIgnoreCase(String name);
    boolean existsBySlug(String slug);
    boolean existsByNameIgnoreCase(String name);
}
