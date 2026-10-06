package com.shopora.dto;

import java.math.BigDecimal;

public class CartItemResponse {
    private Long id;
    private Long productId;
    private String productName;
    private String productBrand;
    private BigDecimal price;
    private BigDecimal originalPrice;
    private Integer discountPercent;
    private String imageUrl;
    private int quantity;
    private int stockQuantity;
    private String selectedColor;
    private String selectedStorage;
    private BigDecimal subtotal;

    public CartItemResponse() {}

    public CartItemResponse(Long id, Long productId, String productName, String productBrand, BigDecimal price,
                            BigDecimal originalPrice, Integer discountPercent, String imageUrl, int quantity,
                            int stockQuantity, String selectedColor, String selectedStorage, BigDecimal subtotal) {
        this.id = id;
        this.productId = productId;
        this.productName = productName;
        this.productBrand = productBrand;
        this.price = price;
        this.originalPrice = originalPrice;
        this.discountPercent = discountPercent;
        this.imageUrl = imageUrl;
        this.quantity = quantity;
        this.stockQuantity = stockQuantity;
        this.selectedColor = selectedColor;
        this.selectedStorage = selectedStorage;
        this.subtotal = subtotal;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getProductId() { return productId; }
    public void setProductId(Long productId) { this.productId = productId; }

    public String getProductName() { return productName; }
    public void setProductName(String productName) { this.productName = productName; }

    public String getProductBrand() { return productBrand; }
    public void setProductBrand(String productBrand) { this.productBrand = productBrand; }

    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }

    public BigDecimal getOriginalPrice() { return originalPrice; }
    public void setOriginalPrice(BigDecimal originalPrice) { this.originalPrice = originalPrice; }

    public Integer getDiscountPercent() { return discountPercent; }
    public void setDiscountPercent(Integer discountPercent) { this.discountPercent = discountPercent; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }

    public int getStockQuantity() { return stockQuantity; }
    public void setStockQuantity(int stockQuantity) { this.stockQuantity = stockQuantity; }

    public String getSelectedColor() { return selectedColor; }
    public void setSelectedColor(String selectedColor) { this.selectedColor = selectedColor; }

    public String getSelectedStorage() { return selectedStorage; }
    public void setSelectedStorage(String selectedStorage) { this.selectedStorage = selectedStorage; }

    public BigDecimal getSubtotal() { return subtotal; }
    public void setSubtotal(BigDecimal subtotal) { this.subtotal = subtotal; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private Long id;
        private Long productId;
        private String productName;
        private String productBrand;
        private BigDecimal price;
        private BigDecimal originalPrice;
        private Integer discountPercent;
        private String imageUrl;
        private int quantity;
        private int stockQuantity;
        private String selectedColor;
        private String selectedStorage;
        private BigDecimal subtotal;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder productId(Long productId) { this.productId = productId; return this; }
        public Builder productName(String productName) { this.productName = productName; return this; }
        public Builder productBrand(String productBrand) { this.productBrand = productBrand; return this; }
        public Builder price(BigDecimal price) { this.price = price; return this; }
        public Builder originalPrice(BigDecimal originalPrice) { this.originalPrice = originalPrice; return this; }
        public Builder discountPercent(Integer discountPercent) { this.discountPercent = discountPercent; return this; }
        public Builder imageUrl(String imageUrl) { this.imageUrl = imageUrl; return this; }
        public Builder quantity(int quantity) { this.quantity = quantity; return this; }
        public Builder stockQuantity(int stockQuantity) { this.stockQuantity = stockQuantity; return this; }
        public Builder selectedColor(String selectedColor) { this.selectedColor = selectedColor; return this; }
        public Builder selectedStorage(String selectedStorage) { this.selectedStorage = selectedStorage; return this; }
        public Builder subtotal(BigDecimal subtotal) { this.subtotal = subtotal; return this; }

        public CartItemResponse build() {
            return new CartItemResponse(id, productId, productName, productBrand, price, originalPrice, discountPercent, imageUrl, quantity, stockQuantity, selectedColor, selectedStorage, subtotal);
        }
    }
}
