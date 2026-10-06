package com.shopora.dto;

import com.shopora.entity.OrderStatus;
import jakarta.validation.constraints.NotNull;

public class OrderStatusUpdateRequest {
    @NotNull(message = "Order status is required")
    private OrderStatus status;

    public OrderStatusUpdateRequest() {}

    public OrderStatusUpdateRequest(OrderStatus status) {
        this.status = status;
    }

    public OrderStatus getStatus() { return status; }
    public void setStatus(OrderStatus status) { this.status = status; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private OrderStatus status;

        public Builder status(OrderStatus status) { this.status = status; return this; }

        public OrderStatusUpdateRequest build() {
            return new OrderStatusUpdateRequest(status);
        }
    }
}
