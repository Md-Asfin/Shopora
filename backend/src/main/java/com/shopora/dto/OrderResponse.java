package com.shopora.dto;

import com.shopora.entity.OrderStatus;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class OrderResponse {
    private Long id;
    private String orderNumber;
    private Long userId;
    private String userEmail;
    private String userName;
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
    private List<OrderItemResponse> items = new ArrayList<>();

    public OrderResponse() {}

    public OrderResponse(Long id, String orderNumber, Long userId, String userEmail, String userName,
                         String shippingAddress, String deliveryMethod, String paymentMethod, String paymentStatus,
                         OrderStatus orderStatus, BigDecimal subtotal, BigDecimal discount, BigDecimal deliveryFee,
                         BigDecimal totalAmount, LocalDateTime orderDate, LocalDateTime estimatedDeliveryDate,
                         List<OrderItemResponse> items) {
        this.id = id;
        this.orderNumber = orderNumber;
        this.userId = userId;
        this.userEmail = userEmail;
        this.userName = userName;
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

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getOrderNumber() { return orderNumber; }
    public void setOrderNumber(String orderNumber) { this.orderNumber = orderNumber; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getUserEmail() { return userEmail; }
    public void setUserEmail(String userEmail) { this.userEmail = userEmail; }

    public String getUserName() { return userName; }
    public void setUserName(String userName) { this.userName = userName; }

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

    public List<OrderItemResponse> getItems() { return items; }
    public void setItems(List<OrderItemResponse> items) { this.items = items; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private Long id;
        private String orderNumber;
        private Long userId;
        private String userEmail;
        private String userName;
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
        private List<OrderItemResponse> items = new ArrayList<>();

        public Builder id(Long id) { this.id = id; return this; }
        public Builder orderNumber(String orderNumber) { this.orderNumber = orderNumber; return this; }
        public Builder userId(Long userId) { this.userId = userId; return this; }
        public Builder userEmail(String userEmail) { this.userEmail = userEmail; return this; }
        public Builder userName(String userName) { this.userName = userName; return this; }
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
        public Builder items(List<OrderItemResponse> items) { this.items = items; return this; }

        public OrderResponse build() {
            return new OrderResponse(id, orderNumber, userId, userEmail, userName, shippingAddress, deliveryMethod, paymentMethod, paymentStatus, orderStatus, subtotal, discount, deliveryFee, totalAmount, orderDate, estimatedDeliveryDate, items);
        }
    }
}
