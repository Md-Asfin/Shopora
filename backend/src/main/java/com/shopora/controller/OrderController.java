package com.shopora.controller;

import com.shopora.dto.ApiResponse;
import com.shopora.dto.CheckoutRequest;
import com.shopora.dto.OrderResponse;
import com.shopora.entity.OrderStatus;
import com.shopora.security.UserPrincipal;
import com.shopora.service.OrderService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@Tag(name = "Orders", description = "Endpoints for customer checkout, order history and order details")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping("/checkout")
    @Operation(summary = "Perform authoritative checkout, inventory reduction and order placement")
    public ResponseEntity<ApiResponse<OrderResponse>> checkout(
            @AuthenticationPrincipal UserPrincipal principal,
            @Valid @RequestBody CheckoutRequest request
    ) {
        OrderResponse response = orderService.checkout(principal.getId(), request);
        return new ResponseEntity<>(ApiResponse.success("Order placed successfully", response), HttpStatus.CREATED);
    }

    @GetMapping({"", "/my-orders"})
    @Operation(summary = "Get order history for authenticated user (optionally filtered by status)")
    public ResponseEntity<ApiResponse<List<OrderResponse>>> getUserOrders(
            @AuthenticationPrincipal UserPrincipal principal,
            @RequestParam(required = false) OrderStatus status
    ) {
        List<OrderResponse> orders;
        if (status != null) {
            orders = orderService.getUserOrdersByStatus(principal.getId(), status);
        } else {
            orders = orderService.getUserOrders(principal.getId());
        }
        return ResponseEntity.ok(ApiResponse.success(orders));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get order details by order ID")
    public ResponseEntity<ApiResponse<OrderResponse>> getOrderById(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable Long id
    ) {
        OrderResponse order = orderService.getOrderById(principal.getId(), id);
        return ResponseEntity.ok(ApiResponse.success(order));
    }

    @GetMapping("/track/{orderNumber}")
    @Operation(summary = "Get order details by human-friendly order number (e.g. #SHO123456)")
    public ResponseEntity<ApiResponse<OrderResponse>> getOrderByNumber(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable String orderNumber
    ) {
        OrderResponse order = orderService.getOrderByOrderNumber(principal.getId(), orderNumber);
        return ResponseEntity.ok(ApiResponse.success(order));
    }

    @PostMapping("/{id}/cancel")
    @Operation(summary = "Cancel an order and restore product stock")
    public ResponseEntity<ApiResponse<OrderResponse>> cancelOrder(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable Long id
    ) {
        OrderResponse order = orderService.cancelOrder(principal.getId(), id);
        return ResponseEntity.ok(ApiResponse.success("Order cancelled successfully", order));
    }
}
