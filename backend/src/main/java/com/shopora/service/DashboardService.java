package com.shopora.service;

import com.shopora.dto.DashboardStatsResponse;
import com.shopora.dto.OrderResponse;
import com.shopora.dto.ProductResponse;
import com.shopora.entity.Order;
import com.shopora.entity.Product;
import com.shopora.repository.OrderRepository;
import com.shopora.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
public class DashboardService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductService productService;

    @Autowired
    private OrderService orderService;

    @Transactional(readOnly = true)
    public DashboardStatsResponse getAdminStats() {
        long totalOrders = orderRepository.countTotalOrders();
        BigDecimal totalRevenue = orderRepository.calculateTotalRevenue();
        long totalProducts = productRepository.count();

        List<Product> lowStockEntities = productRepository.findByStockQuantityLessThan(5);
        long lowStockCount = lowStockEntities.size();

        List<ProductResponse> lowStockProducts = lowStockEntities.stream()
                .limit(5)
                .map(productService::mapToResponse)
                .toList();

        List<Order> recentOrderEntities = orderRepository.findAllByOrderByOrderDateDesc(
                PageRequest.of(0, 5, Sort.by("orderDate").descending())
        ).getContent();

        List<OrderResponse> recentOrders = recentOrderEntities.stream()
                .map(orderService::mapToResponse)
                .toList();

        return DashboardStatsResponse.builder()
                .totalOrders(totalOrders)
                .totalRevenue(totalRevenue != null ? totalRevenue : BigDecimal.ZERO)
                .totalProducts(totalProducts)
                .lowStockCount(lowStockCount)
                .lowStockProducts(lowStockProducts)
                .recentOrders(recentOrders)
                .build();
    }
}
