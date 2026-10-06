package com.shopora.controller;

import com.shopora.dto.ApiResponse;
import com.shopora.dto.PagedResponse;
import com.shopora.dto.ProductRequest;
import com.shopora.dto.ProductResponse;
import com.shopora.entity.Product;
import com.shopora.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api")
@Tag(name = "Products", description = "Endpoints for product catalog, search, filtering and image retrieval")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping("/products")
    @Operation(summary = "Get paginated products with multi-attribute filtering and sorting")
    public ResponseEntity<PagedResponse<ProductResponse>> getProducts(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String q,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String brand,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice,
            @RequestParam(required = false) Double minRating,
            @RequestParam(required = false) Boolean inStock,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDir
    ) {
        String searchTerm = keyword != null ? keyword : q;
        PagedResponse<ProductResponse> response = productService.getProducts(
                searchTerm, category, brand, minPrice, maxPrice, minRating, inStock, page, size, sortBy, sortDir
        );
        return ResponseEntity.ok(response);
    }

    @GetMapping("/products/all")
    @Operation(summary = "Legacy full product list (unpaginated)")
    public ResponseEntity<List<ProductResponse>> getAllProducts() {
        return ResponseEntity.ok(productService.getAllProductsLegacy());
    }

    @GetMapping({"/products/{id}", "/product/{id}"})
    @Operation(summary = "Get single product by ID")
    public ResponseEntity<ProductResponse> getProductById(@PathVariable Long id) {
        ProductResponse response = productService.getProductById(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping({"/products/{id}/image", "/product/{id}/image"})
    @Operation(summary = "Get binary image of a product")
    public ResponseEntity<byte[]> getProductImage(@PathVariable Long id) {
        Product product = productService.getProductEntity(id);
        byte[] imageData = productService.getProductImage(id);
        String contentType = product.getImageType() != null ? product.getImageType() : "image/jpeg";

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CACHE_CONTROL, "max-age=86400")
                .body(imageData);
    }

    @GetMapping("/products/search")
    @Operation(summary = "Search products by keyword")
    public ResponseEntity<List<ProductResponse>> searchProducts(@RequestParam String keyword) {
        return ResponseEntity.ok(productService.searchProducts(keyword));
    }

    @GetMapping("/products/deals")
    @Operation(summary = "Get today's deals products with highest discounts")
    public ResponseEntity<List<ProductResponse>> getDeals() {
        return ResponseEntity.ok(productService.getTodayDeals());
    }

    @GetMapping("/products/featured")
    @Operation(summary = "Get featured products")
    public ResponseEntity<List<ProductResponse>> getFeatured() {
        return ResponseEntity.ok(productService.getFeaturedProducts());
    }

    @GetMapping("/products/brands")
    @Operation(summary = "Get distinct brands")
    public ResponseEntity<List<String>> getBrands() {
        return ResponseEntity.ok(productService.getBrands());
    }

    @PostMapping(value = {"/products", "/product"}, consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @Operation(summary = "Create a product (Admin only)")
    public ResponseEntity<ApiResponse<ProductResponse>> addProduct(
            @RequestPart("product") @Valid ProductRequest request,
            @RequestPart(value = "imageFile", required = false) MultipartFile imageFile
    ) throws IOException {
        ProductResponse response = productService.addProduct(request, imageFile);
        return new ResponseEntity<>(ApiResponse.success("Product created successfully", response), HttpStatus.CREATED);
    }

    @PostMapping(value = "/products/json", consumes = {MediaType.APPLICATION_JSON_VALUE})
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @Operation(summary = "Create a product via JSON (Admin only)")
    public ResponseEntity<ApiResponse<ProductResponse>> addProductJson(
            @Valid @RequestBody ProductRequest request
    ) throws IOException {
        ProductResponse response = productService.addProduct(request, null);
        return new ResponseEntity<>(ApiResponse.success("Product created successfully", response), HttpStatus.CREATED);
    }

    @PutMapping(value = {"/products/{id}", "/product/{id}"}, consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @Operation(summary = "Update product (Admin only)")
    public ResponseEntity<ApiResponse<ProductResponse>> updateProduct(
            @PathVariable Long id,
            @RequestPart("product") @Valid ProductRequest request,
            @RequestPart(value = "imageFile", required = false) MultipartFile imageFile
    ) throws IOException {
        ProductResponse response = productService.updateProduct(id, request, imageFile);
        return ResponseEntity.ok(ApiResponse.success("Product updated successfully", response));
    }

    @PutMapping(value = "/products/{id}/json", consumes = {MediaType.APPLICATION_JSON_VALUE})
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @Operation(summary = "Update product via JSON (Admin only)")
    public ResponseEntity<ApiResponse<ProductResponse>> updateProductJson(
            @PathVariable Long id,
            @Valid @RequestBody ProductRequest request
    ) throws IOException {
        ProductResponse response = productService.updateProduct(id, request, null);
        return ResponseEntity.ok(ApiResponse.success("Product updated successfully", response));
    }

    @DeleteMapping({"/products/{id}", "/product/{id}"})
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @Operation(summary = "Delete product (Admin only)")
    public ResponseEntity<ApiResponse<Void>> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.ok(ApiResponse.success("Product deleted successfully", null));
    }
}
