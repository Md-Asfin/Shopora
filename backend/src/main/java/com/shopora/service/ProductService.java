package com.shopora.service;

import com.shopora.dto.PagedResponse;
import com.shopora.dto.ProductRequest;
import com.shopora.dto.ProductResponse;
import com.shopora.entity.Category;
import com.shopora.entity.Product;
import com.shopora.exception.ResourceNotFoundException;
import com.shopora.repository.CategoryRepository;
import com.shopora.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Transactional(readOnly = true)
    public PagedResponse<ProductResponse> getProducts(
            String keyword,
            String category,
            String brand,
            BigDecimal minPrice,
            BigDecimal maxPrice,
            Double minRating,
            Boolean inStock,
            int page,
            int size,
            String sortBy,
            String sortDir) {

        // Validate max page size
        if (size > 100) {
            size = 100;
        }
        if (size < 1) {
            size = 12;
        }
        if (page < 0) {
            page = 0;
        }

        Sort sort = sortDir.equalsIgnoreCase("desc") ?
                Sort.by(sortBy).descending() :
                Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(page, size, sort);
        Page<Product> productPage = productRepository.filterProducts(
                keyword, category, brand, minPrice, maxPrice, minRating, inStock, pageable
        );

        List<ProductResponse> content = productPage.getContent().stream()
                .map(this::mapToResponse)
                .toList();

        return PagedResponse.<ProductResponse>builder()
                .content(content)
                .page(productPage.getNumber())
                .size(productPage.getSize())
                .totalElements(productPage.getTotalElements())
                .totalPages(productPage.getTotalPages())
                .last(productPage.isLast())
                .build();
    }

    @Transactional(readOnly = true)
    public List<ProductResponse> getAllProductsLegacy() {
        return productRepository.findAll().stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public ProductResponse getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
        return mapToResponse(product);
    }

    @Transactional(readOnly = true)
    public Product getProductEntity(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
    }

    @Transactional(readOnly = true)
    public byte[] getProductImage(Long id) {
        Product product = getProductEntity(id);
        if (product.getImageData() == null || product.getImageData().length == 0) {
            throw new ResourceNotFoundException("Image not found for product id: " + id);
        }
        return product.getImageData();
    }

    @Transactional
    public ProductResponse addProduct(ProductRequest request, MultipartFile imageFile) throws IOException {
        Product product = Product.builder()
                .name(request.getName())
                .description(request.getDescription())
                .brand(request.getBrand())
                .price(request.getPrice())
                .originalPrice(request.getOriginalPrice() != null ? request.getOriginalPrice() : request.getPrice())
                .discountPercent(calculateDiscountPercent(request.getPrice(), request.getOriginalPrice(), request.getDiscountPercent()))
                .stockQuantity(request.getStockQuantity())
                .productAvailable(request.getStockQuantity() > 0)
                .releaseDate(request.getReleaseDate())
                .imageUrl(request.getImageUrl())
                .isFeatured(request.isFeatured())
                .isDeal(request.isDeal())
                .build();

        if (request.getCategoryId() != null) {
            Category cat = categoryRepository.findById(request.getCategoryId()).orElse(null);
            product.setCategory(cat);
            if (cat != null) {
                product.setCategoryName(cat.getName());
            }
        } else if (request.getCategoryName() != null) {
            product.setCategoryName(request.getCategoryName());
        }

        if (imageFile != null && !imageFile.isEmpty()) {
            product.setImageName(imageFile.getOriginalFilename());
            product.setImageType(imageFile.getContentType());
            product.setImageData(imageFile.getBytes());
        }

        Product saved = productRepository.save(product);
        return mapToResponse(saved);
    }

    @Transactional
    public ProductResponse updateProduct(Long id, ProductRequest request, MultipartFile imageFile) throws IOException {
        Product product = getProductEntity(id);

        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setBrand(request.getBrand());
        product.setPrice(request.getPrice());
        if (request.getOriginalPrice() != null) {
            product.setOriginalPrice(request.getOriginalPrice());
        }
        product.setDiscountPercent(calculateDiscountPercent(request.getPrice(), request.getOriginalPrice(), request.getDiscountPercent()));
        product.setStockQuantity(request.getStockQuantity());
        product.setProductAvailable(request.getStockQuantity() > 0);
        if (request.getReleaseDate() != null) {
            product.setReleaseDate(request.getReleaseDate());
        }
        if (request.getImageUrl() != null) {
            product.setImageUrl(request.getImageUrl());
        }
        product.setFeatured(request.isFeatured());
        product.setDeal(request.isDeal());

        if (request.getCategoryId() != null) {
            Category cat = categoryRepository.findById(request.getCategoryId()).orElse(null);
            product.setCategory(cat);
            if (cat != null) {
                product.setCategoryName(cat.getName());
            }
        } else if (request.getCategoryName() != null) {
            product.setCategoryName(request.getCategoryName());
        }

        if (imageFile != null && !imageFile.isEmpty()) {
            product.setImageName(imageFile.getOriginalFilename());
            product.setImageType(imageFile.getContentType());
            product.setImageData(imageFile.getBytes());
        }

        Product saved = productRepository.save(product);
        return mapToResponse(saved);
    }

    @Transactional
    public void deleteProduct(Long id) {
        Product product = getProductEntity(id);
        productRepository.delete(product);
    }

    @Transactional(readOnly = true)
    public List<ProductResponse> searchProducts(String keyword) {
        return productRepository.searchProducts(keyword).stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<ProductResponse> getTodayDeals() {
        return productRepository.findByIsDealTrueOrderByDiscountPercentDesc().stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<ProductResponse> getFeaturedProducts() {
        return productRepository.findByIsFeaturedTrue().stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<String> getBrands() {
        return productRepository.findDistinctBrands();
    }

    private Integer calculateDiscountPercent(BigDecimal price, BigDecimal originalPrice, Integer givenDiscount) {
        if (givenDiscount != null && givenDiscount > 0) {
            return givenDiscount;
        }
        if (originalPrice != null && originalPrice.compareTo(price) > 0) {
            BigDecimal diff = originalPrice.subtract(price);
            BigDecimal pct = diff.divide(originalPrice, 2, RoundingMode.HALF_UP).multiply(BigDecimal.valueOf(100));
            return pct.intValue();
        }
        return 0;
    }

    public ProductResponse mapToResponse(Product p) {
        boolean hasImg = p.getImageData() != null && p.getImageData().length > 0;
        String imgUrl = p.getImageUrl();
        if (hasImg) {
            imgUrl = "/api/product/" + p.getId() + "/image";
        }

        return ProductResponse.builder()
                .id(p.getId())
                .name(p.getName())
                .description(p.getDescription())
                .brand(p.getBrand())
                .price(p.getPrice())
                .originalPrice(p.getOriginalPrice())
                .discountPercent(p.getDiscountPercent())
                .categoryId(p.getCategory() != null ? p.getCategory().getId() : null)
                .categoryName(p.getCategoryName() != null ? p.getCategoryName() : (p.getCategory() != null ? p.getCategory().getName() : "General"))
                .rating(p.getRating())
                .reviewCount(p.getReviewCount())
                .releaseDate(p.getReleaseDate())
                .productAvailable(p.isProductAvailable())
                .stockQuantity(p.getStockQuantity())
                .imageName(p.getImageName())
                .imageType(p.getImageType())
                .imageUrl(imgUrl)
                .hasImage(hasImg)
                .isFeatured(p.isFeatured())
                .isDeal(p.isDeal())
                .build();
    }
}
