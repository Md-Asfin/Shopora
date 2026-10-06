package com.shopora;

import com.shopora.dto.AuthRequest;
import com.shopora.dto.AuthResponse;
import com.shopora.dto.RegisterRequest;
import com.shopora.entity.User;
import com.shopora.repository.AddressRepository;
import com.shopora.repository.CartItemRepository;
import com.shopora.repository.OrderRepository;
import com.shopora.repository.UserRepository;
import com.shopora.repository.WishlistRepository;
import com.shopora.service.AuthService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@TestPropertySource(locations = "classpath:application-test.properties")
@Transactional
public class AuthServiceTest {

    @Autowired
    private AuthService authService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private WishlistRepository wishlistRepository;

    @Autowired
    private OrderRepository orderRepository;

    @BeforeEach
    void setUp() {
        cartItemRepository.deleteAll();
        wishlistRepository.deleteAll();
        orderRepository.deleteAll();
        addressRepository.deleteAll();
    }

    @Test
    void testRegisterSuccess() {
        RegisterRequest request = RegisterRequest.builder()
                .fullName("Alice Johnson")
                .email("alice_unique_reg@test.com")
                .password("Password123!")
                .phone("+91 9999988888")
                .build();

        AuthResponse response = authService.register(request);

        assertNotNull(response);
        assertNotNull(response.getToken());
        assertEquals("alice_unique_reg@test.com", response.getEmail());
        assertEquals("ROLE_USER", response.getRole());

        User user = userRepository.findByEmail("alice_unique_reg@test.com").orElse(null);
        assertNotNull(user);
        assertNotEquals("Password123!", user.getPassword()); // BCrypt hashed
    }

    @Test
    void testLoginSuccess() {
        RegisterRequest registerRequest = RegisterRequest.builder()
                .fullName("Bob Smith")
                .email("bob_unique_login@test.com")
                .password("Secret123!")
                .build();

        authService.register(registerRequest);

        AuthRequest loginRequest = AuthRequest.builder()
                .email("bob_unique_login@test.com")
                .password("Secret123!")
                .build();

        AuthResponse response = authService.login(loginRequest);

        assertNotNull(response);
        assertNotNull(response.getToken());
        assertEquals("bob_unique_login@test.com", response.getEmail());
    }
}
