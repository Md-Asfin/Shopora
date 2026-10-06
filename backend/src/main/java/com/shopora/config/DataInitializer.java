package com.shopora.config;

import com.shopora.entity.*;
import com.shopora.repository.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(DataInitializer.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Value("${shopora.admin.email:admin@shopora.com}")
    private String adminEmail;

    @Value("${shopora.admin.password:Admin@Shopora123}")
    private String adminPassword;

    @Value("${shopora.admin.name:Shopora Administrator}")
    private String adminName;

    @Override
    public void run(String... args) {
        seedUsers();
        seedCategories();
        seedProducts();
        seedSampleAddresses();
    }

    private void seedUsers() {
        // Seed Admin user
        if (!userRepository.existsByEmail(adminEmail.toLowerCase().trim())) {
            User admin = User.builder()
                    .fullName(adminName)
                    .email(adminEmail.toLowerCase().trim())
                    .password(passwordEncoder.encode(adminPassword))
                    .phone("+91 9876543210")
                    .role(Role.ROLE_ADMIN)
                    .build();
            userRepository.save(admin);
            log.info("Initialized default administrator account: {}", adminEmail);
        }

        // Seed Customer user for development and testing
        String demoCustomerEmail = "john@example.com";
        if (!userRepository.existsByEmail(demoCustomerEmail)) {
            User customer = User.builder()
                    .fullName("John Doe")
                    .email(demoCustomerEmail)
                    .password(passwordEncoder.encode("Password123!"))
                    .phone("+91 9876543210")
                    .role(Role.ROLE_USER)
                    .build();
            userRepository.save(customer);
            log.info("Initialized default demo customer account: {}", demoCustomerEmail);
        }
    }

    private void seedCategories() {
        if (categoryRepository.count() == 0) {
            List<Category> categories = Arrays.asList(
                    Category.builder().name("Electronics").slug("electronics").icon("Smartphone").description("Smartphones, Laptops, Audio and Gadgets").imageUrl("https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60").build(),
                    Category.builder().name("Fashion").slug("fashion").icon("Shirt").description("Men and Women apparel and footwear").imageUrl("https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=500&auto=format&fit=crop&q=60").build(),
                    Category.builder().name("Home & Living").slug("home-living").icon("Home").description("Furniture, Decor and Kitchenware").imageUrl("https://images.unsplash.com/photo-1513694203232-719a280e022f?w=500&auto=format&fit=crop&q=60").build(),
                    Category.builder().name("Beauty").slug("beauty").icon("Sparkles").description("Skincare, Cosmetics and Wellness").imageUrl("https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&auto=format&fit=crop&q=60").build(),
                    Category.builder().name("Sports").slug("sports").icon("Activity").description("Fitness, Equipment and Activewear").imageUrl("https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=500&auto=format&fit=crop&q=60").build(),
                    Category.builder().name("Books").slug("books").icon("BookOpen").description("Bestsellers, Fiction and Academic Books").imageUrl("https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=500&auto=format&fit=crop&q=60").build(),
                    Category.builder().name("Toys").slug("toys").icon("Smile").description("Games, Toys and Collectibles").imageUrl("https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=500&auto=format&fit=crop&q=60").build(),
                    Category.builder().name("Automotive").slug("automotive").icon("Car").description("Car accessories and parts").imageUrl("https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&auto=format&fit=crop&q=60").build()
            );
            categoryRepository.saveAll(categories);
            log.info("Initialized {} categories", categories.size());
        }
    }

    private void seedProducts() {
        if (productRepository.count() == 0) {
            Category electronics = categoryRepository.findBySlug("electronics").orElse(null);
            Category fashion = categoryRepository.findBySlug("fashion").orElse(null);
            Category toys = categoryRepository.findBySlug("toys").orElse(null);

            List<Product> products = Arrays.asList(
                    Product.builder()
                            .name("Apple iPhone 15 (128GB)")
                            .description("6.1-inch Super Retina XDR display with Dynamic Island, A16 Bionic chip, 48MP Main camera, and USB-C charging.")
                            .brand("Apple")
                            .price(new BigDecimal("69999.00"))
                            .originalPrice(new BigDecimal("82000.00"))
                            .discountPercent(15)
                            .category(electronics)
                            .categoryName("Electronics")
                            .rating(4.8)
                            .reviewCount(1200)
                            .releaseDate(new Date())
                            .productAvailable(true)
                            .stockQuantity(50)
                            .imageUrl("https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&auto=format&fit=crop&q=80")
                            .isFeatured(true)
                            .isDeal(true)
                            .build(),

                    Product.builder()
                            .name("Dell Inspiron 15")
                            .description("Intel Core i5 13th Gen processor, 16GB DDR5 RAM, 512GB NVMe SSD, 15.6-inch FHD 120Hz Anti-Glare display.")
                            .brand("Dell")
                            .price(new BigDecimal("58999.00"))
                            .originalPrice(new BigDecimal("68000.00"))
                            .discountPercent(13)
                            .category(electronics)
                            .categoryName("Electronics")
                            .rating(4.6)
                            .reviewCount(420)
                            .releaseDate(new Date())
                            .productAvailable(true)
                            .stockQuantity(15)
                            .imageUrl("https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&auto=format&fit=crop&q=80")
                            .isFeatured(true)
                            .isDeal(true)
                            .build(),

                    Product.builder()
                            .name("Sony WH-1000XM5")
                            .description("Industry-leading Wireless Noise Cancelling Headphones with Auto NC Optimizer, 30-hour battery life, and crystal-clear calls.")
                            .brand("Sony")
                            .price(new BigDecimal("29999.00"))
                            .originalPrice(new BigDecimal("34990.00"))
                            .discountPercent(20)
                            .category(electronics)
                            .categoryName("Electronics")
                            .rating(4.9)
                            .reviewCount(880)
                            .releaseDate(new Date())
                            .productAvailable(true)
                            .stockQuantity(30)
                            .imageUrl("https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80")
                            .isFeatured(true)
                            .isDeal(true)
                            .build(),

                    Product.builder()
                            .name("Nike Air Max 270")
                            .description("Iconic lifestyle sneakers featuring Nike's biggest heel Air unit yet for a super-soft ride that feels as impossible as it looks.")
                            .brand("Nike")
                            .price(new BigDecimal("8999.00"))
                            .originalPrice(new BigDecimal("10000.00"))
                            .discountPercent(10)
                            .category(fashion)
                            .categoryName("Fashion")
                            .rating(4.7)
                            .reviewCount(310)
                            .releaseDate(new Date())
                            .productAvailable(true)
                            .stockQuantity(45)
                            .imageUrl("https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80")
                            .isFeatured(true)
                            .isDeal(true)
                            .build(),

                    Product.builder()
                            .name("Samsung Galaxy S24 128GB")
                            .description("Galaxy AI powered smartphone with 50MP ProVisual Engine, Snapdragon 8 Gen 3, and stunning Dynamic AMOLED 2X display.")
                            .brand("Samsung")
                            .price(new BigDecimal("74999.00"))
                            .originalPrice(new BigDecimal("79999.00"))
                            .discountPercent(14)
                            .category(electronics)
                            .categoryName("Electronics")
                            .rating(4.7)
                            .reviewCount(650)
                            .releaseDate(new Date())
                            .productAvailable(true)
                            .stockQuantity(25)
                            .imageUrl("https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&auto=format&fit=crop&q=80")
                            .isFeatured(true)
                            .isDeal(false)
                            .build(),

                    Product.builder()
                            .name("OnePlus 12R 128GB")
                            .description("Flagship Snapdragon 8 Gen 2 processor, 1.5K 120Hz ProXDR display with 4th Gen LTPO, and 100W SUPERVOOC charging.")
                            .brand("OnePlus")
                            .price(new BigDecimal("39999.00"))
                            .originalPrice(new BigDecimal("45999.00"))
                            .discountPercent(13)
                            .category(electronics)
                            .categoryName("Electronics")
                            .rating(4.6)
                            .reviewCount(510)
                            .releaseDate(new Date())
                            .productAvailable(true)
                            .stockQuantity(35)
                            .imageUrl("https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&auto=format&fit=crop&q=80")
                            .isFeatured(true)
                            .isDeal(false)
                            .build(),

                    Product.builder()
                            .name("Xiaomi 14 128GB")
                            .description("Leica Summilux optical lens, Snapdragon 8 Gen 3 chipset, Ultra-fast 90W HyperCharge, and compact premium design.")
                            .brand("Xiaomi")
                            .price(new BigDecimal("49999.00"))
                            .originalPrice(new BigDecimal("59999.00"))
                            .discountPercent(17)
                            .category(electronics)
                            .categoryName("Electronics")
                            .rating(4.5)
                            .reviewCount(280)
                            .releaseDate(new Date())
                            .productAvailable(true)
                            .stockQuantity(20)
                            .imageUrl("https://images.unsplash.com/photo-1511707171634-5f897ff02560?w=600&auto=format&fit=crop&q=80")
                            .isFeatured(false)
                            .isDeal(false)
                            .build(),

                    Product.builder()
                            .name("Nothing Phone (2a) 128GB")
                            .description("Custom MediaTek Dimensity 7200 Pro chipset, iconic transparent Glyph Interface, and 50MP dual rear camera system.")
                            .brand("Nothing")
                            .price(new BigDecimal("23999.00"))
                            .originalPrice(new BigDecimal("25999.00"))
                            .discountPercent(8)
                            .category(electronics)
                            .categoryName("Electronics")
                            .rating(4.6)
                            .reviewCount(410)
                            .releaseDate(new Date())
                            .productAvailable(true)
                            .stockQuantity(40)
                            .imageUrl("https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=600&auto=format&fit=crop&q=80")
                            .isFeatured(false)
                            .isDeal(false)
                            .build(),

                    Product.builder()
                            .name("Google Pixel 8 128GB")
                            .description("Powered by Google Tensor G3, extraordinary Best Take camera system, 7 years of software updates, and vibrant Actua display.")
                            .brand("Google")
                            .price(new BigDecimal("62999.00"))
                            .originalPrice(new BigDecimal("75999.00"))
                            .discountPercent(17)
                            .category(electronics)
                            .categoryName("Electronics")
                            .rating(4.7)
                            .reviewCount(390)
                            .releaseDate(new Date())
                            .productAvailable(true)
                            .stockQuantity(18)
                            .imageUrl("https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&auto=format&fit=crop&q=80")
                            .isFeatured(true)
                            .isDeal(false)
                            .build(),

                    Product.builder()
                            .name("Apple MacBook Pro 16-inch")
                            .description("M3 Pro chip with 12-core CPU and 18-core GPU, 18GB Unified Memory, 512GB SSD Storage, Liquid Retina XDR display.")
                            .brand("Apple")
                            .price(new BigDecimal("199999.00"))
                            .originalPrice(new BigDecimal("249999.00"))
                            .discountPercent(20)
                            .category(electronics)
                            .categoryName("Electronics")
                            .rating(4.9)
                            .reviewCount(220)
                            .releaseDate(new Date())
                            .productAvailable(true)
                            .stockQuantity(3) // low stock for dashboard demo
                            .imageUrl("https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop&q=80")
                            .isFeatured(true)
                            .isDeal(true)
                            .build(),

                    Product.builder()
                            .name("Levi's 511 Slim Fit Jeans")
                            .description("Classic modern slim fit jeans with room to move. Made with +Levi's Flex advanced stretch technology.")
                            .brand("Levi's")
                            .price(new BigDecimal("2499.00"))
                            .originalPrice(new BigDecimal("3999.00"))
                            .discountPercent(37)
                            .category(fashion)
                            .categoryName("Fashion")
                            .rating(4.4)
                            .reviewCount(180)
                            .releaseDate(new Date())
                            .productAvailable(true)
                            .stockQuantity(2) // low stock for dashboard demo
                            .imageUrl("https://images.unsplash.com/photo-1542272604-780c96856592?w=600&auto=format&fit=crop&q=80")
                            .isFeatured(false)
                            .isDeal(false)
                            .build(),

                    Product.builder()
                            .name("Lego Star Wars Millennium Falcon")
                            .description("Inspire fans with a true icon of the Star Wars universe with 1,351 pieces, rotating top and bottom laser turrets.")
                            .brand("Lego")
                            .price(new BigDecimal("12999.00"))
                            .originalPrice(new BigDecimal("14999.00"))
                            .discountPercent(13)
                            .category(toys)
                            .categoryName("Toys")
                            .rating(4.9)
                            .reviewCount(95)
                            .releaseDate(new Date())
                            .productAvailable(true)
                            .stockQuantity(12)
                            .imageUrl("https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=600&auto=format&fit=crop&q=80")
                            .isFeatured(false)
                            .isDeal(false)
                            .build()
            );

            productRepository.saveAll(products);
            log.info("Initialized {} catalog products with categories and deals", products.size());
        }
    }

    private void seedSampleAddresses() {
        if (addressRepository.count() == 0) {
            User customer = userRepository.findByEmail("john@example.com").orElse(null);
            if (customer != null) {
                Address home = Address.builder()
                        .user(customer)
                        .addressType("Home")
                        .recipientName("John Doe")
                        .phone("+91 9876543210")
                        .streetAddress("123, MG Road, Indiranagar")
                        .city("Bangalore")
                        .state("Karnataka")
                        .postalCode("560001")
                        .country("India")
                        .isDefault(true)
                        .build();

                Address office = Address.builder()
                        .user(customer)
                        .addressType("Office")
                        .recipientName("John Doe")
                        .phone("+91 9876543210")
                        .streetAddress("456, IT Park, Whitefield")
                        .city("Bangalore")
                        .state("Karnataka")
                        .postalCode("560066")
                        .country("India")
                        .isDefault(false)
                        .build();

                addressRepository.saveAll(Arrays.asList(home, office));
                log.info("Initialized sample customer address book matching screen 12");
            }
        }
    }
}
