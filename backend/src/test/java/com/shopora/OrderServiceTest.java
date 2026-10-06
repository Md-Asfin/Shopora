package com.shopora;

import com.shopora.dto.CartItemRequest;
import com.shopora.dto.CheckoutRequest;
import com.shopora.dto.OrderResponse;
import com.shopora.entity.*;
import com.shopora.repository.*;
import com.shopora.service.CartService;
import com.shopora.service.OrderService;
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
public class OrderServiceTest {

    @Autowired
    private OrderService orderService;

    @Autowired
    private CartService cartService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private OrderRepository orderRepository;

    private User testUser;
    private Product testProduct;

    @BeforeEach
    void setUp() {
        testUser = userRepository.save(User.builder()
                .fullName("Order Test User")
                .email("orderuser@test.com")
                .password("password")
                .role(Role.ROLE_USER)
                .build());

        testProduct = productRepository.save(Product.builder()
                .name("Test Wireless Earbuds")
                .brand("Sony")
                .price(new BigDecimal("4999.00"))
                .originalPrice(new BigDecimal("6999.00"))
                .stockQuantity(10)
                .productAvailable(true)
                .releaseDate(new Date())
                .categoryName("Electronics")
                .build());
    }

    @Test
    void testCheckoutAndStockReduction() {
        // Add item to cart
        cartService.addToCart(testUser.getId(), CartItemRequest.builder()
                .productId(testProduct.getId())
                .quantity(2)
                .build());

        // Checkout
        CheckoutRequest checkoutRequest = CheckoutRequest.builder()
                .shippingAddress("123 Test Street, Bangalore")
                .deliveryMethod("Standard Delivery")
                .paymentMethod("CASH_ON_DELIVERY")
                .build();

        OrderResponse orderResponse = orderService.checkout(testUser.getId(), checkoutRequest);

        assertNotNull(orderResponse);
        assertTrue(orderResponse.getOrderNumber().startsWith("#SHO"));
        assertEquals(OrderStatus.CONFIRMED, orderResponse.getOrderStatus());
        assertEquals(new BigDecimal("9998.00"), orderResponse.getSubtotal());

        // Verify stock reduction in database
        Product updatedProduct = productRepository.findById(testProduct.getId()).orElse(null);
        assertNotNull(updatedProduct);
        assertEquals(8, updatedProduct.getStockQuantity());

        // Verify cart is cleared
        assertEquals(0, cartService.getCart(testUser.getId()).getItems().size());
    }
}
