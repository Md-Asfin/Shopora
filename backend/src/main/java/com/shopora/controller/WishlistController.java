package com.shopora.controller;

import com.shopora.dto.ApiResponse;
import com.shopora.dto.ProductResponse;
import com.shopora.security.UserPrincipal;
import com.shopora.service.WishlistService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/wishlist")
@Tag(name = "Wishlist", description = "Endpoints for customer wishlist management matching screen 8")
public class WishlistController {

    @Autowired
    private WishlistService wishlistService;

    @GetMapping
    @Operation(summary = "Get user wishlist items")
    public ResponseEntity<ApiResponse<List<ProductResponse>>> getWishlist(
            @AuthenticationPrincipal UserPrincipal principal
    ) {
        List<ProductResponse> items = wishlistService.getUserWishlist(principal.getId());
        return ResponseEntity.ok(ApiResponse.success(items));
    }

    @PostMapping("/{productId}")
    @Operation(summary = "Add product to wishlist")
    public ResponseEntity<ApiResponse<Void>> addToWishlist(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable Long productId
    ) {
        wishlistService.addToWishlist(principal.getId(), productId);
        return ResponseEntity.ok(ApiResponse.success("Added to wishlist", null));
    }

    @DeleteMapping("/{productId}")
    @Operation(summary = "Remove product from wishlist")
    public ResponseEntity<ApiResponse<Void>> removeFromWishlist(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable Long productId
    ) {
        wishlistService.removeFromWishlist(principal.getId(), productId);
        return ResponseEntity.ok(ApiResponse.success("Removed from wishlist", null));
    }

    @GetMapping("/check/{productId}")
    @Operation(summary = "Check if product is in user wishlist")
    public ResponseEntity<ApiResponse<Boolean>> checkWishlist(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable Long productId
    ) {
        boolean exists = wishlistService.isInWishlist(principal.getId(), productId);
        return ResponseEntity.ok(ApiResponse.success(exists));
    }
}
