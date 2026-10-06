package com.shopora.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.util.Date;

public class ProductRequest {

    @NotBlank(message = "Product name is required")
    private String name;

    private String description;

    private String brand;

    @NotNull(message = "Price is required")
    @DecimalMin(value = "0.01", message = "Price must be greater than 0")
    private BigDecimal price;

    private BigDecimal originalPrice;

    private Integer discountPercent;

    private Long categoryId;

    private String categoryName;

    @Min(value = 0, message = "Stock quantity cannot be negative")
    private int stockQuantity;

    private Date releaseDate;

    private boolean productAvailable;

    private String imageUrl;

    private boolean isFeatured;

    private boolean isDeal;

    public ProductRequest() {}

    public ProductRequest(String name, String description, String brand, BigDecimal price, BigDecimal originalPrice,
                          Integer discountPercent, Long categoryId, String categoryName, int stockQuantity,
                          Date releaseDate, boolean productAvailable, String imageUrl, boolean isFeatured, boolean isDeal) {
        this.name = name;
        this.description = description;
        this.brand = brand;
        this.price = price;
        this.originalPrice = originalPrice;
        this.discountPercent = discountPercent;
        this.categoryId = categoryId;
        this.categoryName = categoryName;
        this.stockQuantity = stockQuantity;
        this.releaseDate = releaseDate;
        this.productAvailable = productAvailable;
        this.imageUrl = imageUrl;
        this.isFeatured = isFeatured;
        this.isDeal = isDeal;
    }

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

    public int getStockQuantity() { return stockQuantity; }
    public void setStockQuantity(int stockQuantity) { this.stockQuantity = stockQuantity; }

    public Date getReleaseDate() { return releaseDate; }
    public void setReleaseDate(Date releaseDate) { this.releaseDate = releaseDate; }

    public boolean isProductAvailable() { return productAvailable; }
    public void setProductAvailable(boolean productAvailable) { this.productAvailable = productAvailable; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public boolean isFeatured() { return isFeatured; }
    public void setFeatured(boolean featured) { isFeatured = featured; }

    public boolean isDeal() { return isDeal; }
    public void setDeal(boolean deal) { isDeal = deal; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private String name;
        private String description;
        private String brand;
        private BigDecimal price;
        private BigDecimal originalPrice;
        private Integer discountPercent;
        private Long categoryId;
        private String categoryName;
        private int stockQuantity;
        private Date releaseDate;
        private boolean productAvailable;
        private String imageUrl;
        private boolean isFeatured;
        private boolean isDeal;

        public Builder name(String name) { this.name = name; return this; }
        public Builder description(String description) { this.description = description; return this; }
        public Builder brand(String brand) { this.brand = brand; return this; }
        public Builder price(BigDecimal price) { this.price = price; return this; }
        public Builder originalPrice(BigDecimal originalPrice) { this.originalPrice = originalPrice; return this; }
        public Builder discountPercent(Integer discountPercent) { this.discountPercent = discountPercent; return this; }
        public Builder categoryId(Long categoryId) { this.categoryId = categoryId; return this; }
        public Builder categoryName(String categoryName) { this.categoryName = categoryName; return this; }
        public Builder stockQuantity(int stockQuantity) { this.stockQuantity = stockQuantity; return this; }
        public Builder releaseDate(Date releaseDate) { this.releaseDate = releaseDate; return this; }
        public Builder productAvailable(boolean productAvailable) { this.productAvailable = productAvailable; return this; }
        public Builder imageUrl(String imageUrl) { this.imageUrl = imageUrl; return this; }
        public Builder isFeatured(boolean isFeatured) { this.isFeatured = isFeatured; return this; }
        public Builder isDeal(boolean isDeal) { this.isDeal = isDeal; return this; }

        public ProductRequest build() {
            return new ProductRequest(name, description, brand, price, originalPrice, discountPercent, categoryId, categoryName, stockQuantity, releaseDate, productAvailable, imageUrl, isFeatured, isDeal);
        }
    }
}
