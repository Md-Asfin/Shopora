package com.shopora.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "cart_items", indexes = {
    @Index(name = "idx_cart_user_id", columnList = "user_id"),
    @Index(name = "idx_cart_product_id", columnList = "product_id")
})
public class CartItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Column(nullable = false)
    private int quantity;

    @Column(length = 50)
    private String selectedColor;

    @Column(length = 50)
    private String selectedStorage;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    public CartItem() {}

    public CartItem(Long id, User user, Product product, int quantity, String selectedColor, String selectedStorage, LocalDateTime createdAt) {
        this.id = id;
        this.user = user;
        this.product = product;
        this.quantity = quantity;
        this.selectedColor = selectedColor;
        this.selectedStorage = selectedStorage;
        this.createdAt = createdAt;
    }

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        if (this.quantity < 1) {
            this.quantity = 1;
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public Product getProduct() { return product; }
    public void setProduct(Product product) { this.product = product; }

    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }

    public String getSelectedColor() { return selectedColor; }
    public void setSelectedColor(String selectedColor) { this.selectedColor = selectedColor; }

    public String getSelectedStorage() { return selectedStorage; }
    public void setSelectedStorage(String selectedStorage) { this.selectedStorage = selectedStorage; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private Long id;
        private User user;
        private Product product;
        private int quantity;
        private String selectedColor;
        private String selectedStorage;
        private LocalDateTime createdAt;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder user(User user) { this.user = user; return this; }
        public Builder product(Product product) { this.product = product; return this; }
        public Builder quantity(int quantity) { this.quantity = quantity; return this; }
        public Builder selectedColor(String selectedColor) { this.selectedColor = selectedColor; return this; }
        public Builder selectedStorage(String selectedStorage) { this.selectedStorage = selectedStorage; return this; }
        public Builder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }

        public CartItem build() {
            return new CartItem(id, user, product, quantity, selectedColor, selectedStorage, createdAt);
        }
    }
}
