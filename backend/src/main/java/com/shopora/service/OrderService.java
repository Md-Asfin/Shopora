package com.shopora.service;

import com.shopora.dto.*;
import com.shopora.entity.*;
import com.shopora.exception.BadRequestException;
import com.shopora.exception.ResourceNotFoundException;
import com.shopora.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AddressRepository addressRepository;

    private static final SecureRandom RANDOM = new SecureRandom();

    @Transactional
    public OrderResponse checkout(Long userId, CheckoutRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        List<CartItem> cartItems = cartItemRepository.findByUserIdOrderByCreatedAtDesc(userId);
        if (cartItems.isEmpty()) {
            throw new BadRequestException("Cannot checkout with an empty cart");
        }

        // Determine Shipping Address string
        String shippingAddressStr = request.getShippingAddress();
        if (request.getAddressId() != null) {
            Address address = addressRepository.findByIdAndUserId(request.getAddressId(), userId)
                    .orElse(null);
            if (address != null) {
                shippingAddressStr = String.format("%s (%s), %s, %s, %s - %s. Phone: %s",
                        address.getRecipientName(),
                        address.getAddressType(),
                        address.getStreetAddress(),
                        address.getCity(),
                        address.getState(),
                        address.getPostalCode(),
                        address.getPhone());
            }
        }

        if (shippingAddressStr == null || shippingAddressStr.trim().isEmpty()) {
            throw new BadRequestException("Shipping address is required");
        }

        // Validate stock and calculate totals
        BigDecimal subtotal = BigDecimal.ZERO;
        BigDecimal totalOriginalPrice = BigDecimal.ZERO;

        for (CartItem item : cartItems) {
            Product product = item.getProduct();
            if (product.getStockQuantity() < item.getQuantity()) {
                throw new BadRequestException("Insufficient stock for product '" + product.getName() +
                        "'. Available: " + product.getStockQuantity() + ", Requested: " + item.getQuantity());
            }
            BigDecimal itemPrice = product.getPrice();
            BigDecimal origPrice = product.getOriginalPrice() != null ? product.getOriginalPrice() : itemPrice;

            subtotal = subtotal.add(itemPrice.multiply(BigDecimal.valueOf(item.getQuantity())));
            totalOriginalPrice = totalOriginalPrice.add(origPrice.multiply(BigDecimal.valueOf(item.getQuantity())));
        }

        BigDecimal discount = totalOriginalPrice.compareTo(subtotal) > 0 ?
                totalOriginalPrice.subtract(subtotal) : BigDecimal.ZERO;

        // Delivery fee calculation
        BigDecimal deliveryFee = BigDecimal.ZERO;
        if ("Express Delivery".equalsIgnoreCase(request.getDeliveryMethod())) {
            deliveryFee = BigDecimal.valueOf(99);
        } else if (subtotal.compareTo(BigDecimal.valueOf(499)) < 0) {
            deliveryFee = BigDecimal.valueOf(99);
        }

        BigDecimal totalAmount = subtotal.add(deliveryFee);

        // Generate human-friendly Order ID e.g. #SHO102938
        String orderNumber = "#SHO" + (100000 + RANDOM.nextInt(900000));

        // Create Order
        Order order = Order.builder()
                .orderNumber(orderNumber)
                .user(user)
                .shippingAddress(shippingAddressStr)
                .deliveryMethod(request.getDeliveryMethod() != null ? request.getDeliveryMethod() : "Standard Delivery")
                .paymentMethod(request.getPaymentMethod())
                .paymentStatus(request.getPaymentMethod().contains("MOCK") ? "PAID" : "PENDING")
                .orderStatus(OrderStatus.CONFIRMED)
                .subtotal(subtotal)
                .discount(discount)
                .deliveryFee(deliveryFee)
                .totalAmount(totalAmount)
                .orderDate(LocalDateTime.now())
                .estimatedDeliveryDate(LocalDateTime.now().plusDays(4))
                .items(new ArrayList<>())
                .build();

        // Deduct inventory and create OrderItems
        for (CartItem item : cartItems) {
            Product product = item.getProduct();
            int remainingStock = product.getStockQuantity() - item.getQuantity();
            product.setStockQuantity(remainingStock);
            product.setProductAvailable(remainingStock > 0);
            productRepository.save(product);

            String imgUrl = product.getImageUrl();
            if (product.getImageData() != null && product.getImageData().length > 0) {
                imgUrl = "/api/product/" + product.getId() + "/image";
            }

            String variant = "";
            if (item.getSelectedColor() != null) variant += item.getSelectedColor() + " ";
            if (item.getSelectedStorage() != null) variant += item.getSelectedStorage();

            OrderItem orderItem = OrderItem.builder()
                    .order(order)
                    .product(product)
                    .productName(product.getName())
                    .productImageUrl(imgUrl)
                    .selectedVariant(variant.trim().isEmpty() ? null : variant.trim())
                    .price(product.getPrice())
                    .quantity(item.getQuantity())
                    .subtotal(product.getPrice().multiply(BigDecimal.valueOf(item.getQuantity())))
                    .build();

            order.getItems().add(orderItem);
        }

        Order savedOrder = orderRepository.save(order);

        // Clear cart after checkout
        cartItemRepository.deleteByUserId(userId);

        return mapToResponse(savedOrder);
    }

    @Transactional(readOnly = true)
    public List<OrderResponse> getUserOrders(Long userId) {
        return orderRepository.findByUserIdOrderByOrderDateDesc(userId).stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<OrderResponse> getUserOrdersByStatus(Long userId, OrderStatus status) {
        return orderRepository.findByUserIdAndOrderStatusOrderByOrderDateDesc(userId, status).stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public OrderResponse getOrderById(Long userId, Long orderId) {
        Order order = orderRepository.findByIdAndUserId(orderId, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with id: " + orderId));
        return mapToResponse(order);
    }

    @Transactional(readOnly = true)
    public OrderResponse getOrderByOrderNumber(Long userId, String orderNumber) {
        Order order = orderRepository.findByOrderNumberAndUserId(orderNumber, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with order number: " + orderNumber));
        return mapToResponse(order);
    }

    @Transactional(readOnly = true)
    public PagedResponse<OrderResponse> getAllOrdersAdmin(int page, int size) {
        if (size > 100) size = 100;
        if (size < 1) size = 10;
        if (page < 0) page = 0;

        Pageable pageable = PageRequest.of(page, size, Sort.by("orderDate").descending());
        Page<Order> orderPage = orderRepository.findAllByOrderByOrderDateDesc(pageable);

        List<OrderResponse> content = orderPage.getContent().stream()
                .map(this::mapToResponse)
                .toList();

        return PagedResponse.<OrderResponse>builder()
                .content(content)
                .page(orderPage.getNumber())
                .size(orderPage.getSize())
                .totalElements(orderPage.getTotalElements())
                .totalPages(orderPage.getTotalPages())
                .last(orderPage.isLast())
                .build();
    }

    @Transactional
    public OrderResponse updateOrderStatusAdmin(Long orderId, OrderStatus newStatus) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with id: " + orderId));

        order.setOrderStatus(newStatus);
        Order updated = orderRepository.save(order);
        return mapToResponse(updated);
    }

    @Transactional
    public OrderResponse cancelOrder(Long userId, Long orderId) {
        Order order = orderRepository.findByIdAndUserId(orderId, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with id: " + orderId));

        if (order.getOrderStatus() == OrderStatus.DELIVERED || order.getOrderStatus() == OrderStatus.CANCELLED) {
            throw new BadRequestException("Order cannot be cancelled in status: " + order.getOrderStatus());
        }

        order.setOrderStatus(OrderStatus.CANCELLED);

        // Restore stock
        for (OrderItem item : order.getItems()) {
            if (item.getProduct() != null) {
                Product product = item.getProduct();
                product.setStockQuantity(product.getStockQuantity() + item.getQuantity());
                product.setProductAvailable(true);
                productRepository.save(product);
            }
        }

        Order saved = orderRepository.save(order);
        return mapToResponse(saved);
    }

    public OrderResponse mapToResponse(Order order) {
        List<OrderItemResponse> itemResponses = order.getItems().stream()
                .map(item -> OrderItemResponse.builder()
                        .id(item.getId())
                        .productId(item.getProduct() != null ? item.getProduct().getId() : null)
                        .productName(item.getProductName())
                        .productImageUrl(item.getProductImageUrl())
                        .selectedVariant(item.getSelectedVariant())
                        .price(item.getPrice())
                        .quantity(item.getQuantity())
                        .subtotal(item.getSubtotal())
                        .build())
                .toList();

        return OrderResponse.builder()
                .id(order.getId())
                .orderNumber(order.getOrderNumber())
                .userId(order.getUser().getId())
                .userEmail(order.getUser().getEmail())
                .userName(order.getUser().getFullName())
                .shippingAddress(order.getShippingAddress())
                .deliveryMethod(order.getDeliveryMethod())
                .paymentMethod(order.getPaymentMethod())
                .paymentStatus(order.getPaymentStatus())
                .orderStatus(order.getOrderStatus())
                .subtotal(order.getSubtotal())
                .discount(order.getDiscount())
                .deliveryFee(order.getDeliveryFee())
                .totalAmount(order.getTotalAmount())
                .orderDate(order.getOrderDate())
                .estimatedDeliveryDate(order.getEstimatedDeliveryDate())
                .items(itemResponses)
                .build();
    }
}
