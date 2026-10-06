package com.shopora.dto;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public class CartResponse {
    private List<CartItemResponse> items = new ArrayList<>();
    private int totalItems;
    private BigDecimal subtotal;
    private BigDecimal discount;
    private BigDecimal deliveryFee;
    private BigDecimal totalAmount;

    public CartResponse() {}

    public CartResponse(List<CartItemResponse> items, int totalItems, BigDecimal subtotal,
                        BigDecimal discount, BigDecimal deliveryFee, BigDecimal totalAmount) {
        if (items != null) {
            this.items = items;
        }
        this.totalItems = totalItems;
        this.subtotal = subtotal;
        this.discount = discount;
        this.deliveryFee = deliveryFee;
        this.totalAmount = totalAmount;
    }

    public List<CartItemResponse> getItems() { return items; }
    public void setItems(List<CartItemResponse> items) { this.items = items; }

    public int getTotalItems() { return totalItems; }
    public void setTotalItems(int totalItems) { this.totalItems = totalItems; }

    public BigDecimal getSubtotal() { return subtotal; }
    public void setSubtotal(BigDecimal subtotal) { this.subtotal = subtotal; }

    public BigDecimal getDiscount() { return discount; }
    public void setDiscount(BigDecimal discount) { this.discount = discount; }

    public BigDecimal getDeliveryFee() { return deliveryFee; }
    public void setDeliveryFee(BigDecimal deliveryFee) { this.deliveryFee = deliveryFee; }

    public BigDecimal getTotalAmount() { return totalAmount; }
    public void setTotalAmount(BigDecimal totalAmount) { this.totalAmount = totalAmount; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private List<CartItemResponse> items = new ArrayList<>();
        private int totalItems;
        private BigDecimal subtotal;
        private BigDecimal discount;
        private BigDecimal deliveryFee;
        private BigDecimal totalAmount;

        public Builder items(List<CartItemResponse> items) { this.items = items; return this; }
        public Builder totalItems(int totalItems) { this.totalItems = totalItems; return this; }
        public Builder subtotal(BigDecimal subtotal) { this.subtotal = subtotal; return this; }
        public Builder discount(BigDecimal discount) { this.discount = discount; return this; }
        public Builder deliveryFee(BigDecimal deliveryFee) { this.deliveryFee = deliveryFee; return this; }
        public Builder totalAmount(BigDecimal totalAmount) { this.totalAmount = totalAmount; return this; }

        public CartResponse build() {
            return new CartResponse(items, totalItems, subtotal, discount, deliveryFee, totalAmount);
        }
    }
}
