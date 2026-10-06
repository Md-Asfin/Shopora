package com.shopora;

import com.shopora.dto.PagedResponse;
import com.shopora.dto.ProductRequest;
import com.shopora.dto.ProductResponse;
import com.shopora.repository.ProductRepository;
import com.shopora.service.ProductService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@TestPropertySource(locations = "classpath:application-test.properties")
@Transactional
public class ProductServiceTest {

    @Autowired
    private ProductService productService;

    @Autowired
    private ProductRepository productRepository;

    @Test
    void testAddAndGetProduct() throws IOException {
        ProductRequest request = ProductRequest.builder()
                .name("Test Gaming Laptop")
                .description("High performance gaming laptop with RTX 4080")
                .brand("Asus")
                .price(new BigDecimal("120000.00"))
                .originalPrice(new BigDecimal("140000.00"))
                .stockQuantity(10)
                .isFeatured(true)
                .categoryName("Electronics")
                .build();

        ProductResponse response = productService.addProduct(request, null);

        assertNotNull(response);
        assertNotNull(response.getId());
        assertEquals("Test Gaming Laptop", response.getName());
        assertEquals(new BigDecimal("120000.00"), response.getPrice());
        assertTrue(response.isProductAvailable());

        ProductResponse fetched = productService.getProductById(response.getId());
        assertEquals(response.getId(), fetched.getId());
    }

    @Test
    void testProductPaginationAndFiltering() {
        PagedResponse<ProductResponse> paged = productService.getProducts(
                null, null, null, null, null, null, null, 0, 10, "id", "asc"
        );

        assertNotNull(paged);
        assertTrue(paged.getSize() <= 10);
    }
}
