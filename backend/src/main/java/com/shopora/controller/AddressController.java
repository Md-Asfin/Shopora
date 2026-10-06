package com.shopora.controller;

import com.shopora.dto.AddressRequest;
import com.shopora.dto.AddressResponse;
import com.shopora.dto.ApiResponse;
import com.shopora.security.UserPrincipal;
import com.shopora.service.AddressService;
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
@RequestMapping("/api/addresses")
@Tag(name = "Addresses", description = "Endpoints for managing user address book matching screen 12")
public class AddressController {

    @Autowired
    private AddressService addressService;

    @GetMapping
    @Operation(summary = "Get all saved addresses for authenticated user")
    public ResponseEntity<ApiResponse<List<AddressResponse>>> getUserAddresses(
            @AuthenticationPrincipal UserPrincipal principal
    ) {
        List<AddressResponse> addresses = addressService.getUserAddresses(principal.getId());
        return ResponseEntity.ok(ApiResponse.success(addresses));
    }

    @PostMapping
    @Operation(summary = "Add a new address to user address book")
    public ResponseEntity<ApiResponse<AddressResponse>> createAddress(
            @AuthenticationPrincipal UserPrincipal principal,
            @Valid @RequestBody AddressRequest request
    ) {
        AddressResponse address = addressService.createAddress(principal.getId(), request);
        return new ResponseEntity<>(ApiResponse.success("Address added successfully", address), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update an existing address")
    public ResponseEntity<ApiResponse<AddressResponse>> updateAddress(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable Long id,
            @Valid @RequestBody AddressRequest request
    ) {
        AddressResponse address = addressService.updateAddress(principal.getId(), id, request);
        return ResponseEntity.ok(ApiResponse.success("Address updated successfully", address));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete an address")
    public ResponseEntity<ApiResponse<Void>> deleteAddress(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable Long id
    ) {
        addressService.deleteAddress(principal.getId(), id);
        return ResponseEntity.ok(ApiResponse.success("Address deleted successfully", null));
    }

    @PutMapping("/{id}/default")
    @Operation(summary = "Set address as default")
    public ResponseEntity<ApiResponse<AddressResponse>> setDefaultAddress(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable Long id
    ) {
        AddressResponse address = addressService.setDefaultAddress(principal.getId(), id);
        return ResponseEntity.ok(ApiResponse.success("Default address updated", address));
    }
}
