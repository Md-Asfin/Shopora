package com.shopora.controller;

import com.shopora.dto.ApiResponse;
import com.shopora.dto.CartItemRequest;
import com.shopora.dto.CartResponse;
import com.shopora.security.UserPrincipal;
import com.shopora.service.CartService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
@Tag(name = "Cart", description = "Endpoints for user shopping cart management")
public class CartController {

    @Autowired
    private CartService cartService;

    @GetMapping
    @Operation(summary = "Get current authenticated user cart with calculated totals")
    public ResponseEntity<ApiResponse<CartResponse>> getCart(@AuthenticationPrincipal UserPrincipal principal) {
        CartResponse cart = cartService.getCart(principal.getId());
        return ResponseEntity.ok(ApiResponse.success(cart));
    }

    @PostMapping("/items")
    @Operation(summary = "Add item to cart")
    public ResponseEntity<ApiResponse<CartResponse>> addToCart(
            @AuthenticationPrincipal UserPrincipal principal,
            @Valid @RequestBody CartItemRequest request
    ) {
        CartResponse cart = cartService.addToCart(principal.getId(), request);
        return ResponseEntity.ok(ApiResponse.success("Item added to cart", cart));
    }

    @PutMapping("/items/{itemId}")
    @Operation(summary = "Update item quantity in cart")
    public ResponseEntity<ApiResponse<CartResponse>> updateItemQuantity(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable Long itemId,
            @RequestParam int quantity
    ) {
        CartResponse cart = cartService.updateQuantity(principal.getId(), itemId, quantity);
        return ResponseEntity.ok(ApiResponse.success("Cart updated", cart));
    }

    @DeleteMapping("/items/{itemId}")
    @Operation(summary = "Remove item from cart")
    public ResponseEntity<ApiResponse<CartResponse>> removeItem(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable Long itemId
    ) {
        CartResponse cart = cartService.removeFromCart(principal.getId(), itemId);
        return ResponseEntity.ok(ApiResponse.success("Item removed from cart", cart));
    }

    @DeleteMapping
    @Operation(summary = "Clear all items from cart")
    public ResponseEntity<ApiResponse<Void>> clearCart(@AuthenticationPrincipal UserPrincipal principal) {
        cartService.clearCart(principal.getId());
        return ResponseEntity.ok(ApiResponse.success("Cart cleared", null));
    }
}
