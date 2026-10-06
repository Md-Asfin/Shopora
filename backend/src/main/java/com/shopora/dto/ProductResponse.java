package com.shopora.dto;

import java.math.BigDecimal;
import java.util.Date;

public class ProductResponse {
    private Long id;
    private String name;
    private String description;
    private String brand;
    private BigDecimal price;
    private BigDecimal originalPrice;
    private Integer discountPercent;
    private Long categoryId;
    private String categoryName;
    private Double rating;
    private Integer reviewCount;
    private Date releaseDate;
    private boolean productAvailable;
    private int stockQuantity;
    private String imageName;
    private String imageType;
    private String imageUrl;
    private boolean hasImage;
    private boolean isFeatured;
    private boolean isDeal;

    public ProductResponse() {}

    public ProductResponse(Long id, String name, String description, String brand, BigDecimal price,
                           BigDecimal originalPrice, Integer discountPercent, Long categoryId, String categoryName,
                           Double rating, Integer reviewCount, Date releaseDate, boolean productAvailable,
                           int stockQuantity, String imageName, String imageType, String imageUrl,
                           boolean hasImage, boolean isFeatured, boolean isDeal) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.brand = brand;
        this.price = price;
        this.originalPrice = originalPrice;
        this.discountPercent = discountPercent;
        this.categoryId = categoryId;
        this.categoryName = categoryName;
        this.rating = rating;
        this.reviewCount = reviewCount;
        this.releaseDate = releaseDate;
        this.productAvailable = productAvailable;
        this.stockQuantity = stockQuantity;
        this.imageName = imageName;
        this.imageType = imageType;
        this.imageUrl = imageUrl;
        this.hasImage = hasImage;
        this.isFeatured = isFeatured;
        this.isDeal = isDeal;
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

    public Long getCategoryId() { return categoryId; }
    public void setCategoryId(Long categoryId) { this.categoryId = categoryId; }

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

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public boolean isHasImage() { return hasImage; }
    public void setHasImage(boolean hasImage) { this.hasImage = hasImage; }

    public boolean isFeatured() { return isFeatured; }
    public void setFeatured(boolean featured) { isFeatured = featured; }

    public boolean isDeal() { return isDeal; }
    public void setDeal(boolean deal) { isDeal = deal; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private Long id;
        private String name;
        private String description;
        private String brand;
        private BigDecimal price;
        private BigDecimal originalPrice;
        private Integer discountPercent;
        private Long categoryId;
        private String categoryName;
        private Double rating;
        private Integer reviewCount;
        private Date releaseDate;
        private boolean productAvailable;
        private int stockQuantity;
        private String imageName;
        private String imageType;
        private String imageUrl;
        private boolean hasImage;
        private boolean isFeatured;
        private boolean isDeal;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder name(String name) { this.name = name; return this; }
        public Builder description(String description) { this.description = description; return this; }
        public Builder brand(String brand) { this.brand = brand; return this; }
        public Builder price(BigDecimal price) { this.price = price; return this; }
        public Builder originalPrice(BigDecimal originalPrice) { this.originalPrice = originalPrice; return this; }
        public Builder discountPercent(Integer discountPercent) { this.discountPercent = discountPercent; return this; }
        public Builder categoryId(Long categoryId) { this.categoryId = categoryId; return this; }
        public Builder categoryName(String categoryName) { this.categoryName = categoryName; return this; }
        public Builder rating(Double rating) { this.rating = rating; return this; }
        public Builder reviewCount(Integer reviewCount) { this.reviewCount = reviewCount; return this; }
        public Builder releaseDate(Date releaseDate) { this.releaseDate = releaseDate; return this; }
        public Builder productAvailable(boolean productAvailable) { this.productAvailable = productAvailable; return this; }
        public Builder stockQuantity(int stockQuantity) { this.stockQuantity = stockQuantity; return this; }
        public Builder imageName(String imageName) { this.imageName = imageName; return this; }
        public Builder imageType(String imageType) { this.imageType = imageType; return this; }
        public Builder imageUrl(String imageUrl) { this.imageUrl = imageUrl; return this; }
        public Builder hasImage(boolean hasImage) { this.hasImage = hasImage; return this; }
        public Builder isFeatured(boolean isFeatured) { this.isFeatured = isFeatured; return this; }
        public Builder isDeal(boolean isDeal) { this.isDeal = isDeal; return this; }

        public ProductResponse build() {
            return new ProductResponse(id, name, description, brand, price, originalPrice, discountPercent, categoryId,
                    categoryName, rating, reviewCount, releaseDate, productAvailable, stockQuantity, imageName,
                    imageType, imageUrl, hasImage, isFeatured, isDeal);
        }
    }
}
