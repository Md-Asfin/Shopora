package com.shopora.dto;

import java.math.BigDecimal;

public class OrderItemResponse {
    private Long id;
    private Long productId;
    private String productName;
    private String productImageUrl;
    private String selectedVariant;
    private BigDecimal price;
    private int quantity;
    private BigDecimal subtotal;

    public OrderItemResponse() {}

    public OrderItemResponse(Long id, Long productId, String productName, String productImageUrl,
                             String selectedVariant, BigDecimal price, int quantity, BigDecimal subtotal) {
        this.id = id;
        this.productId = productId;
        this.productName = productName;
        this.productImageUrl = productImageUrl;
        this.selectedVariant = selectedVariant;
        this.price = price;
        this.quantity = quantity;
        this.subtotal = subtotal;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getProductId() { return productId; }
    public void setProductId(Long productId) { this.productId = productId; }

    public String getProductName() { return productName; }
    public void setProductName(String productName) { this.productName = productName; }

    public String getProductImageUrl() { return productImageUrl; }
    public void setProductImageUrl(String productImageUrl) { this.productImageUrl = productImageUrl; }

    public String getSelectedVariant() { return selectedVariant; }
    public void setSelectedVariant(String selectedVariant) { this.selectedVariant = selectedVariant; }

    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }

    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }

    public BigDecimal getSubtotal() { return subtotal; }
    public void setSubtotal(BigDecimal subtotal) { this.subtotal = subtotal; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private Long id;
        private Long productId;
        private String productName;
        private String productImageUrl;
        private String selectedVariant;
        private BigDecimal price;
        private int quantity;
        private BigDecimal subtotal;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder productId(Long productId) { this.productId = productId; return this; }
        public Builder productName(String productName) { this.productName = productName; return this; }
        public Builder productImageUrl(String productImageUrl) { this.productImageUrl = productImageUrl; return this; }
        public Builder selectedVariant(String selectedVariant) { this.selectedVariant = selectedVariant; return this; }
        public Builder price(BigDecimal price) { this.price = price; return this; }
        public Builder quantity(int quantity) { this.quantity = quantity; return this; }
        public Builder subtotal(BigDecimal subtotal) { this.subtotal = subtotal; return this; }

        public OrderItemResponse build() {
            return new OrderItemResponse(id, productId, productName, productImageUrl, selectedVariant, price, quantity, subtotal);
        }
    }
}
