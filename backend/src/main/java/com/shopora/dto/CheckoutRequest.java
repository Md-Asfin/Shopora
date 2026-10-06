package com.shopora.dto;

import jakarta.validation.constraints.NotBlank;

public class CheckoutRequest {

    private Long addressId;
    private String shippingAddress;
    private String deliveryMethod;

    @NotBlank(message = "Payment method is required")
    private String paymentMethod;

    private String couponCode;

    public CheckoutRequest() {}

    public CheckoutRequest(Long addressId, String shippingAddress, String deliveryMethod, String paymentMethod, String couponCode) {
        this.addressId = addressId;
        this.shippingAddress = shippingAddress;
        this.deliveryMethod = deliveryMethod;
        this.paymentMethod = paymentMethod;
        this.couponCode = couponCode;
    }

    public Long getAddressId() { return addressId; }
    public void setAddressId(Long addressId) { this.addressId = addressId; }

    public String getShippingAddress() { return shippingAddress; }
    public void setShippingAddress(String shippingAddress) { this.shippingAddress = shippingAddress; }

    public String getDeliveryMethod() { return deliveryMethod; }
    public void setDeliveryMethod(String deliveryMethod) { this.deliveryMethod = deliveryMethod; }

    public String getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }

    public String getCouponCode() { return couponCode; }
    public void setCouponCode(String couponCode) { this.couponCode = couponCode; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private Long addressId;
        private String shippingAddress;
        private String deliveryMethod;
        private String paymentMethod;
        private String couponCode;

        public Builder addressId(Long addressId) { this.addressId = addressId; return this; }
        public Builder shippingAddress(String shippingAddress) { this.shippingAddress = shippingAddress; return this; }
        public Builder deliveryMethod(String deliveryMethod) { this.deliveryMethod = deliveryMethod; return this; }
        public Builder paymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; return this; }
        public Builder couponCode(String couponCode) { this.couponCode = couponCode; return this; }

        public CheckoutRequest build() {
            return new CheckoutRequest(addressId, shippingAddress, deliveryMethod, paymentMethod, couponCode);
        }
    }
}
