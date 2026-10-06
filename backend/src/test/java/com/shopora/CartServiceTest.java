package com.shopora;

import com.shopora.dto.CartItemRequest;
import com.shopora.dto.CartResponse;
import com.shopora.entity.Product;
import com.shopora.entity.Role;
import com.shopora.entity.User;
import com.shopora.repository.CartItemRepository;
import com.shopora.repository.ProductRepository;
import com.shopora.repository.UserRepository;
import com.shopora.service.CartService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Date;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@TestPropertySource(locations = "classpath:application-test.properties")
@Transactional
public class CartServiceTest {

    @Autowired
    private CartService cartService;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    private User testUser;
    private Product testProduct;

    @BeforeEach
    void setUp() {
        testUser = userRepository.save(User.builder()
                .fullName("Cart Tester")
                .email("carttester_unique@test.com")
                .password("password")
                .role(Role.ROLE_USER)
                .build());

        testProduct = productRepository.save(Product.builder()
                .name("Test Headset")
                .brand("Sony")
                .price(new BigDecimal("1999.00"))
                .originalPrice(new BigDecimal("2999.00"))
                .stockQuantity(20)
                .productAvailable(true)
                .releaseDate(new Date())
                .categoryName("Electronics")
                .build());
    }

    @Test
    void testAddToCartAndCalculation() {
        CartResponse cart = cartService.addToCart(testUser.getId(), CartItemRequest.builder()
                .productId(testProduct.getId())
                .quantity(2)
                .selectedColor("Black")
                .build());

        assertNotNull(cart);
        assertEquals(2, cart.getTotalItems());
        assertEquals(new BigDecimal("3998.00"), cart.getSubtotal());
        assertEquals(new BigDecimal("2000.00"), cart.getDiscount()); // (2999 - 1999) * 2
        assertEquals(BigDecimal.ZERO, cart.getDeliveryFee()); // >= ₹499 is free delivery
    }
}
