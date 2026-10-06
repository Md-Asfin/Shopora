package com.shopora.service;

import com.shopora.dto.CartItemRequest;
import com.shopora.dto.CartItemResponse;
import com.shopora.dto.CartResponse;
import com.shopora.entity.CartItem;
import com.shopora.entity.Product;
import com.shopora.entity.User;
import com.shopora.exception.BadRequestException;
import com.shopora.exception.ResourceNotFoundException;
import com.shopora.repository.CartItemRepository;
import com.shopora.repository.ProductRepository;
import com.shopora.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CartService {

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductService productService;

    @Transactional(readOnly = true)
    public CartResponse getCart(Long userId) {
        List<CartItem> items = cartItemRepository.findByUserIdOrderByCreatedAtDesc(userId);
        return buildCartResponse(items);
    }

    @Transactional
    public CartResponse addToCart(Long userId, CartItemRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + request.getProductId()));

        if (product.getStockQuantity() <= 0) {
            throw new BadRequestException("Product is out of stock");
        }

        Optional<CartItem> existingItem = cartItemRepository.findByUserIdAndProductId(userId, product.getId());

        if (existingItem.isPresent()) {
            CartItem item = existingItem.get();
            int newQuantity = item.getQuantity() + (request.getQuantity() > 0 ? request.getQuantity() : 1);
            if (newQuantity > product.getStockQuantity()) {
                newQuantity = product.getStockQuantity();
            }
            item.setQuantity(newQuantity);
            if (request.getSelectedColor() != null) item.setSelectedColor(request.getSelectedColor());
            if (request.getSelectedStorage() != null) item.setSelectedStorage(request.getSelectedStorage());
            cartItemRepository.save(item);
        } else {
            int qty = request.getQuantity() > 0 ? request.getQuantity() : 1;
            if (qty > product.getStockQuantity()) {
                qty = product.getStockQuantity();
            }

            CartItem newItem = CartItem.builder()
                    .user(user)
                    .product(product)
                    .quantity(qty)
                    .selectedColor(request.getSelectedColor())
                    .selectedStorage(request.getSelectedStorage())
                    .build();
            cartItemRepository.save(newItem);
        }

        return getCart(userId);
    }

    @Transactional
    public CartResponse updateQuantity(Long userId, Long cartItemId, int quantity) {
        CartItem item = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart item not found with id: " + cartItemId));

        if (!item.getUser().getId().equals(userId)) {
            throw new BadRequestException("Unauthorized access to cart item");
        }

        if (quantity <= 0) {
            cartItemRepository.delete(item);
        } else {
            if (quantity > item.getProduct().getStockQuantity()) {
                throw new BadRequestException("Requested quantity exceeds available stock (" + item.getProduct().getStockQuantity() + ")");
            }
            item.setQuantity(quantity);
            cartItemRepository.save(item);
        }

        return getCart(userId);
    }

    @Transactional
    public CartResponse removeFromCart(Long userId, Long cartItemId) {
        CartItem item = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart item not found with id: " + cartItemId));

        if (!item.getUser().getId().equals(userId)) {
            throw new BadRequestException("Unauthorized access to cart item");
        }

        cartItemRepository.delete(item);
        return getCart(userId);
    }

    @Transactional
    public void clearCart(Long userId) {
        cartItemRepository.deleteByUserId(userId);
    }

    private CartResponse buildCartResponse(List<CartItem> items) {
        List<CartItemResponse> itemResponses = new ArrayList<>();
        BigDecimal subtotal = BigDecimal.ZERO;
        BigDecimal totalOriginalPrice = BigDecimal.ZERO;
        int totalItems = 0;

        for (CartItem item : items) {
            Product p = item.getProduct();
            BigDecimal price = p.getPrice();
            BigDecimal origPrice = p.getOriginalPrice() != null ? p.getOriginalPrice() : price;
            int qty = item.getQuantity();

            BigDecimal itemSubtotal = price.multiply(BigDecimal.valueOf(qty));
            BigDecimal itemOriginalSubtotal = origPrice.multiply(BigDecimal.valueOf(qty));

            subtotal = subtotal.add(itemSubtotal);
            totalOriginalPrice = totalOriginalPrice.add(itemOriginalSubtotal);
            totalItems += qty;

            String imgUrl = p.getImageUrl();
            if (p.getImageData() != null && p.getImageData().length > 0) {
                imgUrl = "/api/product/" + p.getId() + "/image";
            }

            itemResponses.add(CartItemResponse.builder()
                    .id(item.getId())
                    .productId(p.getId())
                    .productName(p.getName())
                    .productBrand(p.getBrand())
                    .price(price)
                    .originalPrice(origPrice)
                    .discountPercent(p.getDiscountPercent())
                    .imageUrl(imgUrl)
                    .quantity(qty)
                    .stockQuantity(p.getStockQuantity())
                    .selectedColor(item.getSelectedColor())
                    .selectedStorage(item.getSelectedStorage())
                    .subtotal(itemSubtotal)
                    .build());
        }

        BigDecimal discount = totalOriginalPrice.compareTo(subtotal) > 0 ?
                totalOriginalPrice.subtract(subtotal) : BigDecimal.ZERO;

        // Delivery fee: Free for orders >= ₹499 or empty cart, else ₹99
        BigDecimal deliveryFee = BigDecimal.ZERO;
        if (subtotal.compareTo(BigDecimal.ZERO) > 0 && subtotal.compareTo(BigDecimal.valueOf(499)) < 0) {
            deliveryFee = BigDecimal.valueOf(99);
        }

        BigDecimal totalAmount = subtotal.add(deliveryFee);

        return CartResponse.builder()
                .items(itemResponses)
                .totalItems(totalItems)
                .subtotal(subtotal)
                .discount(discount)
                .deliveryFee(deliveryFee)
                .totalAmount(totalAmount)
                .build();
    }
}
