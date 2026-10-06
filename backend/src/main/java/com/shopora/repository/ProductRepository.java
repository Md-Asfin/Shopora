package com.shopora.repository;

import com.shopora.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long>, JpaSpecificationExecutor<Product> {

    @Query("SELECT p FROM Product p WHERE " +
           "(:keyword IS NULL OR :keyword = '' OR " +
           " LOWER(p.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           " LOWER(p.description) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           " LOWER(p.brand) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           " LOWER(p.categoryName) LIKE LOWER(CONCAT('%', :keyword, '%'))) AND " +
           "(:category IS NULL OR :category = '' OR LOWER(p.categoryName) = LOWER(:category) OR (p.category IS NOT NULL AND LOWER(p.category.slug) = LOWER(:category))) AND " +
           "(:brand IS NULL OR :brand = '' OR LOWER(p.brand) = LOWER(:brand)) AND " +
           "(:minPrice IS NULL OR p.price >= :minPrice) AND " +
           "(:maxPrice IS NULL OR p.price <= :maxPrice) AND " +
           "(:minRating IS NULL OR p.rating >= :minRating) AND " +
           "(:inStock IS NULL OR (:inStock = true AND p.stockQuantity > 0) OR (:inStock = false AND p.stockQuantity <= 0))")
    Page<Product> filterProducts(
            @Param("keyword") String keyword,
            @Param("category") String category,
            @Param("brand") String brand,
            @Param("minPrice") BigDecimal minPrice,
            @Param("maxPrice") BigDecimal maxPrice,
            @Param("minRating") Double minRating,
            @Param("inStock") Boolean inStock,
            Pageable pageable
    );

    @Query("SELECT p FROM Product p WHERE " +
           "LOWER(p.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(p.description) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(p.brand) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(p.categoryName) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Product> searchProducts(@Param("keyword") String keyword);

    List<Product> findByIsDealTrueOrderByDiscountPercentDesc();

    List<Product> findByIsFeaturedTrue();

    List<Product> findByStockQuantityLessThan(int threshold);

    @Query("SELECT DISTINCT p.brand FROM Product p WHERE p.brand IS NOT NULL AND p.brand != '' ORDER BY p.brand ASC")
    List<String> findDistinctBrands();
}
