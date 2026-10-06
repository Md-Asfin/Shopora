package com.shopora.service;

import com.shopora.dto.ProductResponse;
import com.shopora.entity.Product;
import com.shopora.entity.User;
import com.shopora.entity.WishlistItem;
import com.shopora.exception.ResourceNotFoundException;
import com.shopora.repository.ProductRepository;
import com.shopora.repository.UserRepository;
import com.shopora.repository.WishlistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class WishlistService {

    @Autowired
    private WishlistRepository wishlistRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductService productService;

    @Transactional(readOnly = true)
    public List<ProductResponse> getUserWishlist(Long userId) {
        return wishlistRepository.findByUserIdOrderByCreatedAtDesc(userId).stream()
                .map(item -> productService.mapToResponse(item.getProduct()))
                .toList();
    }

    @Transactional
    public void addToWishlist(Long userId, Long productId) {
        if (!wishlistRepository.existsByUserIdAndProductId(userId, productId)) {
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new ResourceNotFoundException("User not found"));
            Product product = productRepository.findById(productId)
                    .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + productId));

            WishlistItem item = WishlistItem.builder()
                    .user(user)
                    .product(product)
                    .build();
            wishlistRepository.save(item);
        }
    }

    @Transactional
    public void removeFromWishlist(Long userId, Long productId) {
        wishlistRepository.deleteByUserIdAndProductId(userId, productId);
    }

    @Transactional(readOnly = true)
    public boolean isInWishlist(Long userId, Long productId) {
        return wishlistRepository.existsByUserIdAndProductId(userId, productId);
    }
}
