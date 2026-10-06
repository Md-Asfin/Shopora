package com.shopora.dto;

import jakarta.validation.constraints.NotBlank;

public class AddressRequest {

    @NotBlank(message = "Address type is required (e.g., Home, Office)")
    private String addressType;

    @NotBlank(message = "Recipient name is required")
    private String recipientName;

    @NotBlank(message = "Phone number is required")
    private String phone;

    @NotBlank(message = "Street address is required")
    private String streetAddress;

    @NotBlank(message = "City is required")
    private String city;

    @NotBlank(message = "State is required")
    private String state;

    @NotBlank(message = "Postal code is required")
    private String postalCode;

    private String country;

    private boolean isDefault;

    public AddressRequest() {}

    public AddressRequest(String addressType, String recipientName, String phone, String streetAddress,
                          String city, String state, String postalCode, String country, boolean isDefault) {
        this.addressType = addressType;
        this.recipientName = recipientName;
        this.phone = phone;
        this.streetAddress = streetAddress;
        this.city = city;
        this.state = state;
        this.postalCode = postalCode;
        this.country = country;
        this.isDefault = isDefault;
    }

    public String getAddressType() { return addressType; }
    public void setAddressType(String addressType) { this.addressType = addressType; }

    public String getRecipientName() { return recipientName; }
    public void setRecipientName(String recipientName) { this.recipientName = recipientName; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getStreetAddress() { return streetAddress; }
    public void setStreetAddress(String streetAddress) { this.streetAddress = streetAddress; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public String getState() { return state; }
    public void setState(String state) { this.state = state; }

    public String getPostalCode() { return postalCode; }
    public void setPostalCode(String postalCode) { this.postalCode = postalCode; }

    public String getCountry() { return country; }
    public void setCountry(String country) { this.country = country; }

    public boolean isDefault() { return isDefault; }
    public void setDefault(boolean aDefault) { isDefault = aDefault; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private String addressType;
        private String recipientName;
        private String phone;
        private String streetAddress;
        private String city;
        private String state;
        private String postalCode;
        private String country;
        private boolean isDefault;

        public Builder addressType(String addressType) { this.addressType = addressType; return this; }
        public Builder recipientName(String recipientName) { this.recipientName = recipientName; return this; }
        public Builder phone(String phone) { this.phone = phone; return this; }
        public Builder streetAddress(String streetAddress) { this.streetAddress = streetAddress; return this; }
        public Builder city(String city) { this.city = city; return this; }
        public Builder state(String state) { this.state = state; return this; }
        public Builder postalCode(String postalCode) { this.postalCode = postalCode; return this; }
        public Builder country(String country) { this.country = country; return this; }
        public Builder isDefault(boolean isDefault) { this.isDefault = isDefault; return this; }

        public AddressRequest build() {
            return new AddressRequest(addressType, recipientName, phone, streetAddress, city, state, postalCode, country, isDefault);
        }
    }
}
