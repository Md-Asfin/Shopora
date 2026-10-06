package com.shopora.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "order_items")
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "product_id")
    private Product product;

    @Column(nullable = false, length = 200)
    private String productName;

    @Column(length = 500)
    private String productImageUrl;

    @Column(length = 50)
    private String selectedVariant;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal price;

    @Column(nullable = false)
    private int quantity;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal subtotal;

    public OrderItem() {}

    public OrderItem(Long id, Order order, Product product, String productName, String productImageUrl,
                     String selectedVariant, BigDecimal price, int quantity, BigDecimal subtotal) {
        this.id = id;
        this.order = order;
        this.product = product;
        this.productName = productName;
        this.productImageUrl = productImageUrl;
        this.selectedVariant = selectedVariant;
        this.price = price;
        this.quantity = quantity;
        this.subtotal = subtotal;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Order getOrder() { return order; }
    public void setOrder(Order order) { this.order = order; }

    public Product getProduct() { return product; }
    public void setProduct(Product product) { this.product = product; }

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
        private Order order;
        private Product product;
        private String productName;
        private String productImageUrl;
        private String selectedVariant;
        private BigDecimal price;
        private int quantity;
        private BigDecimal subtotal;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder order(Order order) { this.order = order; return this; }
        public Builder product(Product product) { this.product = product; return this; }
        public Builder productName(String productName) { this.productName = productName; return this; }
        public Builder productImageUrl(String productImageUrl) { this.productImageUrl = productImageUrl; return this; }
        public Builder selectedVariant(String selectedVariant) { this.selectedVariant = selectedVariant; return this; }
        public Builder price(BigDecimal price) { this.price = price; return this; }
        public Builder quantity(int quantity) { this.quantity = quantity; return this; }
        public Builder subtotal(BigDecimal subtotal) { this.subtotal = subtotal; return this; }

        public OrderItem build() {
            return new OrderItem(id, order, product, productName, productImageUrl, selectedVariant, price, quantity, subtotal);
        }
    }
}
