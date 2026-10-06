package com.shopora.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "orders", indexes = {
    @Index(name = "idx_order_number", columnList = "order_number", unique = true),
    @Index(name = "idx_order_user_id", columnList = "user_id"),
    @Index(name = "idx_order_status", columnList = "order_status")
})
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "order_number", nullable = false, unique = true, length = 50)
    private String orderNumber;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false, length = 500)
    private String shippingAddress;

    @Column(length = 50)
    private String deliveryMethod;

    @Column(nullable = false, length = 50)
    private String paymentMethod;

    @Column(length = 50)
    private String paymentStatus;

    @Enumerated(EnumType.STRING)
    @Column(name = "order_status", nullable = false, length = 30)
    private OrderStatus orderStatus;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal subtotal;

    @Column(precision = 12, scale = 2)
    private BigDecimal discount;

    @Column(precision = 12, scale = 2)
    private BigDecimal deliveryFee;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal totalAmount;

    @Column(nullable = false)
    private LocalDateTime orderDate;

    private LocalDateTime estimatedDeliveryDate;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderItem> items = new ArrayList<>();

    public Order() {}

    public Order(Long id, String orderNumber, User user, String shippingAddress, String deliveryMethod,
                 String paymentMethod, String paymentStatus, OrderStatus orderStatus, BigDecimal subtotal,
                 BigDecimal discount, BigDecimal deliveryFee, BigDecimal totalAmount, LocalDateTime orderDate,
                 LocalDateTime estimatedDeliveryDate, List<OrderItem> items) {
        this.id = id;
        this.orderNumber = orderNumber;
        this.user = user;
        this.shippingAddress = shippingAddress;
        this.deliveryMethod = deliveryMethod;
        this.paymentMethod = paymentMethod;
        this.paymentStatus = paymentStatus;
        this.orderStatus = orderStatus;
        this.subtotal = subtotal;
        this.discount = discount;
        this.deliveryFee = deliveryFee;
        this.totalAmount = totalAmount;
        this.orderDate = orderDate;
        this.estimatedDeliveryDate = estimatedDeliveryDate;
        if (items != null) {
            this.items = items;
        }
    }

    @PrePersist
    protected void onCreate() {
        if (this.orderDate == null) {
            this.orderDate = LocalDateTime.now();
        }
        if (this.orderStatus == null) {
            this.orderStatus = OrderStatus.CONFIRMED;
        }
        if (this.discount == null) {
            this.discount = BigDecimal.ZERO;
        }
        if (this.deliveryFee == null) {
            this.deliveryFee = BigDecimal.ZERO;
        }
        if (this.estimatedDeliveryDate == null) {
            this.estimatedDeliveryDate = this.orderDate.plusDays(4);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getOrderNumber() { return orderNumber; }
    public void setOrderNumber(String orderNumber) { this.orderNumber = orderNumber; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public String getShippingAddress() { return shippingAddress; }
    public void setShippingAddress(String shippingAddress) { this.shippingAddress = shippingAddress; }

    public String getDeliveryMethod() { return deliveryMethod; }
    public void setDeliveryMethod(String deliveryMethod) { this.deliveryMethod = deliveryMethod; }

    public String getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }

    public String getPaymentStatus() { return paymentStatus; }
    public void setPaymentStatus(String paymentStatus) { this.paymentStatus = paymentStatus; }

    public OrderStatus getOrderStatus() { return orderStatus; }
    public void setOrderStatus(OrderStatus orderStatus) { this.orderStatus = orderStatus; }

    public BigDecimal getSubtotal() { return subtotal; }
    public void setSubtotal(BigDecimal subtotal) { this.subtotal = subtotal; }

    public BigDecimal getDiscount() { return discount; }
    public void setDiscount(BigDecimal discount) { this.discount = discount; }

    public BigDecimal getDeliveryFee() { return deliveryFee; }
    public void setDeliveryFee(BigDecimal deliveryFee) { this.deliveryFee = deliveryFee; }

    public BigDecimal getTotalAmount() { return totalAmount; }
    public void setTotalAmount(BigDecimal totalAmount) { this.totalAmount = totalAmount; }

    public LocalDateTime getOrderDate() { return orderDate; }
    public void setOrderDate(LocalDateTime orderDate) { this.orderDate = orderDate; }

    public LocalDateTime getEstimatedDeliveryDate() { return estimatedDeliveryDate; }
    public void setEstimatedDeliveryDate(LocalDateTime estimatedDeliveryDate) { this.estimatedDeliveryDate = estimatedDeliveryDate; }

    public List<OrderItem> getItems() { return items; }
    public void setItems(List<OrderItem> items) { this.items = items; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private Long id;
        private String orderNumber;
        private User user;
        private String shippingAddress;
        private String deliveryMethod;
        private String paymentMethod;
        private String paymentStatus;
        private OrderStatus orderStatus;
        private BigDecimal subtotal;
        private BigDecimal discount;
        private BigDecimal deliveryFee;
        private BigDecimal totalAmount;
        private LocalDateTime orderDate;
        private LocalDateTime estimatedDeliveryDate;
        private List<OrderItem> items = new ArrayList<>();

        public Builder id(Long id) { this.id = id; return this; }
        public Builder orderNumber(String orderNumber) { this.orderNumber = orderNumber; return this; }
        public Builder user(User user) { this.user = user; return this; }
        public Builder shippingAddress(String shippingAddress) { this.shippingAddress = shippingAddress; return this; }
        public Builder deliveryMethod(String deliveryMethod) { this.deliveryMethod = deliveryMethod; return this; }
        public Builder paymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; return this; }
        public Builder paymentStatus(String paymentStatus) { this.paymentStatus = paymentStatus; return this; }
        public Builder orderStatus(OrderStatus orderStatus) { this.orderStatus = orderStatus; return this; }
        public Builder subtotal(BigDecimal subtotal) { this.subtotal = subtotal; return this; }
        public Builder discount(BigDecimal discount) { this.discount = discount; return this; }
        public Builder deliveryFee(BigDecimal deliveryFee) { this.deliveryFee = deliveryFee; return this; }
        public Builder totalAmount(BigDecimal totalAmount) { this.totalAmount = totalAmount; return this; }
        public Builder orderDate(LocalDateTime orderDate) { this.orderDate = orderDate; return this; }
        public Builder estimatedDeliveryDate(LocalDateTime estimatedDeliveryDate) { this.estimatedDeliveryDate = estimatedDeliveryDate; return this; }
        public Builder items(List<OrderItem> items) { this.items = items; return this; }

        public Order build() {
            return new Order(id, orderNumber, user, shippingAddress, deliveryMethod, paymentMethod, paymentStatus, orderStatus,
                    subtotal, discount, deliveryFee, totalAmount, orderDate, estimatedDeliveryDate, items);
        }
    }
}
