package com.shopora.dto;

import java.math.BigDecimal;
import java.util.List;

public class DashboardStatsResponse {
    private long totalOrders;
    private BigDecimal totalRevenue;
    private long totalProducts;
    private long lowStockCount;
    private List<ProductResponse> lowStockProducts;
    private List<OrderResponse> recentOrders;

    public DashboardStatsResponse() {}

    public DashboardStatsResponse(long totalOrders, BigDecimal totalRevenue, long totalProducts,
                                  long lowStockCount, List<ProductResponse> lowStockProducts, List<OrderResponse> recentOrders) {
        this.totalOrders = totalOrders;
        this.totalRevenue = totalRevenue;
        this.totalProducts = totalProducts;
        this.lowStockCount = lowStockCount;
        this.lowStockProducts = lowStockProducts;
        this.recentOrders = recentOrders;
    }

    public long getTotalOrders() { return totalOrders; }
    public void setTotalOrders(long totalOrders) { this.totalOrders = totalOrders; }

    public BigDecimal getTotalRevenue() { return totalRevenue; }
    public void setTotalRevenue(BigDecimal totalRevenue) { this.totalRevenue = totalRevenue; }

    public long getTotalProducts() { return totalProducts; }
    public void setTotalProducts(long totalProducts) { this.totalProducts = totalProducts; }

    public long getLowStockCount() { return lowStockCount; }
    public void setLowStockCount(long lowStockCount) { this.lowStockCount = lowStockCount; }

    public List<ProductResponse> getLowStockProducts() { return lowStockProducts; }
    public void setLowStockProducts(List<ProductResponse> lowStockProducts) { this.lowStockProducts = lowStockProducts; }

    public List<OrderResponse> getRecentOrders() { return recentOrders; }
    public void setRecentOrders(List<OrderResponse> recentOrders) { this.recentOrders = recentOrders; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private long totalOrders;
        private BigDecimal totalRevenue;
        private long totalProducts;
        private long lowStockCount;
        private List<ProductResponse> lowStockProducts;
        private List<OrderResponse> recentOrders;

        public Builder totalOrders(long totalOrders) { this.totalOrders = totalOrders; return this; }
        public Builder totalRevenue(BigDecimal totalRevenue) { this.totalRevenue = totalRevenue; return this; }
        public Builder totalProducts(long totalProducts) { this.totalProducts = totalProducts; return this; }
        public Builder lowStockCount(long lowStockCount) { this.lowStockCount = lowStockCount; return this; }
        public Builder lowStockProducts(List<ProductResponse> lowStockProducts) { this.lowStockProducts = lowStockProducts; return this; }
        public Builder recentOrders(List<OrderResponse> recentOrders) { this.recentOrders = recentOrders; return this; }

        public DashboardStatsResponse build() {
            return new DashboardStatsResponse(totalOrders, totalRevenue, totalProducts, lowStockCount, lowStockProducts, recentOrders);
        }
    }
}
