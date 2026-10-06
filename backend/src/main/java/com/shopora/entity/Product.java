package com.shopora.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Table(name = "products", indexes = {
    @Index(name = "idx_product_name", columnList = "name"),
    @Index(name = "idx_product_brand", columnList = "brand"),
    @Index(name = "idx_product_price", columnList = "price"),
    @Index(name = "idx_product_category_id", columnList = "category_id")
})
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 200)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(length = 100)
    private String brand;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal price;

    @Column(precision = 12, scale = 2)
    private BigDecimal originalPrice;

    private Integer discountPercent;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    @Column(name = "category_name", length = 100)
    private String categoryName;

    @Column
    private Double rating;

    private Integer reviewCount;

    @Temporal(TemporalType.DATE)
    private Date releaseDate;

    @Column(nullable = false)
    private boolean productAvailable;

    @Column(nullable = false)
    private int stockQuantity;

    @Column(length = 255)
    private String imageName;

    @Column(length = 100)
    private String imageType;

    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] imageData;

    @Column(length = 500)
    private String imageUrl;

    private boolean isFeatured;

    private boolean isDeal;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    public Product() {}

    public Product(Long id) {
        this.id = id;
    }

    public Product(Long id, String name, String description, String brand, BigDecimal price, BigDecimal originalPrice,
                   Integer discountPercent, Category category, String categoryName, Double rating, Integer reviewCount,
                   Date releaseDate, boolean productAvailable, int stockQuantity, String imageName, String imageType,
                   byte[] imageData, String imageUrl, boolean isFeatured, boolean isDeal, LocalDateTime createdAt) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.brand = brand;
        this.price = price;
        this.originalPrice = originalPrice;
        this.discountPercent = discountPercent;
        this.category = category;
        this.categoryName = categoryName;
        this.rating = rating;
        this.reviewCount = reviewCount;
        this.releaseDate = releaseDate;
        this.productAvailable = productAvailable;
        this.stockQuantity = stockQuantity;
        this.imageName = imageName;
        this.imageType = imageType;
        this.imageData = imageData;
        this.imageUrl = imageUrl;
        this.isFeatured = isFeatured;
        this.isDeal = isDeal;
        this.createdAt = createdAt;
    }

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        if (this.rating == null) {
            this.rating = 4.5;
        }
        if (this.reviewCount == null) {
            this.reviewCount = 0;
        }
        if (this.releaseDate == null) {
            this.releaseDate = new Date();
        }
        this.productAvailable = this.stockQuantity > 0;
        if (this.category != null && this.categoryName == null) {
            this.categoryName = this.category.getName();
        }
    }

    @PreUpdate
    protected void onUpdate() {
        this.productAvailable = this.stockQuantity > 0;
        if (this.category != null) {
            this.categoryName = this.category.getName();
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getBrand() { return brand; }
    public void setBrand(String brand) { this.brand = brand; }

    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }

    public BigDecimal getOriginalPrice() { return originalPrice; }
    public void setOriginalPrice(BigDecimal originalPrice) { this.originalPrice = originalPrice; }

    public Integer getDiscountPercent() { return discountPercent; }
    public void setDiscountPercent(Integer discountPercent) { this.discountPercent = discountPercent; }

    public Category getCategory() { return category; }
    public void setCategory(Category category) { this.category = category; }

    public String getCategoryName() { return categoryName; }
    public void setCategoryName(String categoryName) { this.categoryName = categoryName; }

    public Double getRating() { return rating; }
    public void setRating(Double rating) { this.rating = rating; }

    public Integer getReviewCount() { return reviewCount; }
    public void setReviewCount(Integer reviewCount) { this.reviewCount = reviewCount; }

    public Date getReleaseDate() { return releaseDate; }
    public void setReleaseDate(Date releaseDate) { this.releaseDate = releaseDate; }

    public boolean isProductAvailable() { return productAvailable; }
    public void setProductAvailable(boolean productAvailable) { this.productAvailable = productAvailable; }

    public int getStockQuantity() { return stockQuantity; }
    public void setStockQuantity(int stockQuantity) { this.stockQuantity = stockQuantity; }

    public String getImageName() { return imageName; }
    public void setImageName(String imageName) { this.imageName = imageName; }

    public String getImageType() { return imageType; }
    public void setImageType(String imageType) { this.imageType = imageType; }

    public byte[] getImageData() { return imageData; }
    public void setImageData(byte[] imageData) { this.imageData = imageData; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public boolean isFeatured() { return isFeatured; }
    public void setFeatured(boolean featured) { isFeatured = featured; }

    public boolean isDeal() { return isDeal; }
    public void setDeal(boolean deal) { isDeal = deal; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private Long id;
        private String name;
        private String description;
        private String brand;
        private BigDecimal price;
        private BigDecimal originalPrice;
        private Integer discountPercent;
        private Category category;
        private String categoryName;
        private Double rating;
        private Integer reviewCount;
        private Date releaseDate;
        private boolean productAvailable;
        private int stockQuantity;
        private String imageName;
        private String imageType;
        private byte[] imageData;
        private String imageUrl;
        private boolean isFeatured;
        private boolean isDeal;
        private LocalDateTime createdAt;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder name(String name) { this.name = name; return this; }
        public Builder description(String description) { this.description = description; return this; }
        public Builder brand(String brand) { this.brand = brand; return this; }
        public Builder price(BigDecimal price) { this.price = price; return this; }
        public Builder originalPrice(BigDecimal originalPrice) { this.originalPrice = originalPrice; return this; }
        public Builder discountPercent(Integer discountPercent) { this.discountPercent = discountPercent; return this; }
        public Builder category(Category category) { this.category = category; return this; }
        public Builder categoryName(String categoryName) { this.categoryName = categoryName; return this; }
        public Builder rating(Double rating) { this.rating = rating; return this; }
        public Builder reviewCount(Integer reviewCount) { this.reviewCount = reviewCount; return this; }
        public Builder releaseDate(Date releaseDate) { this.releaseDate = releaseDate; return this; }
        public Builder productAvailable(boolean productAvailable) { this.productAvailable = productAvailable; return this; }
        public Builder stockQuantity(int stockQuantity) { this.stockQuantity = stockQuantity; return this; }
        public Builder imageName(String imageName) { this.imageName = imageName; return this; }
        public Builder imageType(String imageType) { this.imageType = imageType; return this; }
        public Builder imageData(byte[] imageData) { this.imageData = imageData; return this; }
        public Builder imageUrl(String imageUrl) { this.imageUrl = imageUrl; return this; }
        public Builder isFeatured(boolean isFeatured) { this.isFeatured = isFeatured; return this; }
        public Builder isDeal(boolean isDeal) { this.isDeal = isDeal; return this; }
        public Builder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }

        public Product build() {
            return new Product(id, name, description, brand, price, originalPrice, discountPercent, category,
                    categoryName, rating, reviewCount, releaseDate, productAvailable, stockQuantity, imageName,
                    imageType, imageData, imageUrl, isFeatured, isDeal, createdAt);
        }
    }
}
