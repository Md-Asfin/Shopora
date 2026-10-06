package com.shopora.service;

import com.shopora.dto.CategoryRequest;
import com.shopora.dto.CategoryResponse;
import com.shopora.entity.Category;
import com.shopora.exception.BadRequestException;
import com.shopora.exception.ResourceNotFoundException;
import com.shopora.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Transactional(readOnly = true)
    public List<CategoryResponse> getAllCategories() {
        return categoryRepository.findAll().stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public CategoryResponse getCategoryById(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + id));
        return mapToResponse(category);
    }

    @Transactional(readOnly = true)
    public CategoryResponse getCategoryBySlug(String slug) {
        Category category = categoryRepository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with slug: " + slug));
        return mapToResponse(category);
    }

    @Transactional
    public CategoryResponse createCategory(CategoryRequest request) {
        String slug = generateSlug(request.getName());
        if (categoryRepository.existsBySlug(slug)) {
            throw new BadRequestException("Category with similar name already exists");
        }

        Category category = Category.builder()
                .name(request.getName())
                .slug(slug)
                .description(request.getDescription())
                .icon(request.getIcon())
                .imageUrl(request.getImageUrl())
                .build();

        Category saved = categoryRepository.save(category);
        return mapToResponse(saved);
    }

    @Transactional
    public CategoryResponse updateCategory(Long id, CategoryRequest request) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + id));

        category.setName(request.getName());
        category.setSlug(generateSlug(request.getName()));
        category.setDescription(request.getDescription());
        category.setIcon(request.getIcon());
        category.setImageUrl(request.getImageUrl());

        Category saved = categoryRepository.save(category);
        return mapToResponse(saved);
    }

    @Transactional
    public void deleteCategory(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + id));
        categoryRepository.delete(category);
    }

    private String generateSlug(String name) {
        return name.toLowerCase().replaceAll("[^a-z0-9]+", "-").replaceAll("(^-|-$)", "");
    }

    public CategoryResponse mapToResponse(Category c) {
        return CategoryResponse.builder()
                .id(c.getId())
                .name(c.getName())
                .slug(c.getSlug())
                .description(c.getDescription())
                .icon(c.getIcon())
                .imageUrl(c.getImageUrl())
                .build();
    }
}
