package com.shopora.dto;

import jakarta.validation.constraints.NotBlank;

public class CategoryRequest {
    @NotBlank(message = "Category name is required")
    private String name;
    private String description;
    private String icon;
    private String imageUrl;

    public CategoryRequest() {}

    public CategoryRequest(String name, String description, String icon, String imageUrl) {
        this.name = name;
        this.description = description;
        this.icon = icon;
        this.imageUrl = imageUrl;
    }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getIcon() { return icon; }
    public void setIcon(String icon) { this.icon = icon; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private String name;
        private String description;
        private String icon;
        private String imageUrl;

        public Builder name(String name) { this.name = name; return this; }
        public Builder description(String description) { this.description = description; return this; }
        public Builder icon(String icon) { this.icon = icon; return this; }
        public Builder imageUrl(String imageUrl) { this.imageUrl = imageUrl; return this; }

        public CategoryRequest build() {
            return new CategoryRequest(name, description, icon, imageUrl);
        }
    }
}
