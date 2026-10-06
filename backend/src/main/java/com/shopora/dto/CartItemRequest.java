package com.shopora.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public class CartItemRequest {

    @NotNull(message = "Product ID is required")
    private Long productId;

    @Min(value = 1, message = "Quantity must be at least 1")
    private int quantity;

    private String selectedColor;
    private String selectedStorage;

    public CartItemRequest() {}

    public CartItemRequest(Long productId, int quantity, String selectedColor, String selectedStorage) {
        this.productId = productId;
        this.quantity = quantity;
        this.selectedColor = selectedColor;
        this.selectedStorage = selectedStorage;
    }

    public Long getProductId() { return productId; }
    public void setProductId(Long productId) { this.productId = productId; }

    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }

    public String getSelectedColor() { return selectedColor; }
    public void setSelectedColor(String selectedColor) { this.selectedColor = selectedColor; }

    public String getSelectedStorage() { return selectedStorage; }
    public void setSelectedStorage(String selectedStorage) { this.selectedStorage = selectedStorage; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private Long productId;
        private int quantity;
        private String selectedColor;
        private String selectedStorage;

        public Builder productId(Long productId) { this.productId = productId; return this; }
        public Builder quantity(int quantity) { this.quantity = quantity; return this; }
        public Builder selectedColor(String selectedColor) { this.selectedColor = selectedColor; return this; }
        public Builder selectedStorage(String selectedStorage) { this.selectedStorage = selectedStorage; return this; }

        public CartItemRequest build() {
            return new CartItemRequest(productId, quantity, selectedColor, selectedStorage);
        }
    }
}
