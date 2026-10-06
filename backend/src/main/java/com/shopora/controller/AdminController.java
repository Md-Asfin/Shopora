package com.shopora.controller;

import com.shopora.dto.ApiResponse;
import com.shopora.dto.DashboardStatsResponse;
import com.shopora.dto.OrderResponse;
import com.shopora.dto.OrderStatusUpdateRequest;
import com.shopora.dto.PagedResponse;
import com.shopora.service.DashboardService;
import com.shopora.service.OrderService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasAuthority('ROLE_ADMIN')")
@Tag(name = "Admin", description = "Endpoints for administrator dashboard, analytics, and order management matching screen 13")
public class AdminController {

    @Autowired
    private DashboardService dashboardService;

    @Autowired
    private OrderService orderService;

    @GetMapping("/dashboard")
    @Operation(summary = "Get admin dashboard KPI metrics, low stock alerts, and sales summaries")
    public ResponseEntity<ApiResponse<DashboardStatsResponse>> getDashboardStats() {
        DashboardStatsResponse stats = dashboardService.getAdminStats();
        return ResponseEntity.ok(ApiResponse.success(stats));
    }

    @GetMapping("/orders")
    @Operation(summary = "Get all customer orders (paginated) for admin management")
    public ResponseEntity<PagedResponse<OrderResponse>> getAllOrders(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        PagedResponse<OrderResponse> orders = orderService.getAllOrdersAdmin(page, size);
        return ResponseEntity.ok(orders);
    }

    @PutMapping("/orders/{id}/status")
    @Operation(summary = "Update order status (Confirmed -> Packed -> Shipped -> Out for Delivery -> Delivered)")
    public ResponseEntity<ApiResponse<OrderResponse>> updateOrderStatus(
            @PathVariable Long id,
            @Valid @RequestBody OrderStatusUpdateRequest request
    ) {
        OrderResponse updated = orderService.updateOrderStatusAdmin(id, request.getStatus());
        return ResponseEntity.ok(ApiResponse.success("Order status updated successfully", updated));
    }
}
