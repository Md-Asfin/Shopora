package com.shopora.dto;

public class CategoryResponse {
    private Long id;
    private String name;
    private String slug;
    private String description;
    private String icon;
    private String imageUrl;

    public CategoryResponse() {}

    public CategoryResponse(Long id, String name, String slug, String description, String icon, String imageUrl) {
        this.id = id;
        this.name = name;
        this.slug = slug;
        this.description = description;
        this.icon = icon;
        this.imageUrl = imageUrl;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getIcon() { return icon; }
    public void setIcon(String icon) { this.icon = icon; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private Long id;
        private String name;
        private String slug;
        private String description;
        private String icon;
        private String imageUrl;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder name(String name) { this.name = name; return this; }
        public Builder slug(String slug) { this.slug = slug; return this; }
        public Builder description(String description) { this.description = description; return this; }
        public Builder icon(String icon) { this.icon = icon; return this; }
        public Builder imageUrl(String imageUrl) { this.imageUrl = imageUrl; return this; }

        public CategoryResponse build() {
            return new CategoryResponse(id, name, slug, description, icon, imageUrl);
        }
    }
}
