package com.ram.ecommerce.service;

import com.ram.ecommerce.dto.OrderDto;
import com.ram.ecommerce.entity.*;
import com.ram.ecommerce.exception.BadRequestException;
import com.ram.ecommerce.exception.ResourceNotFoundException;
import com.ram.ecommerce.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final CartService cartService;

    @Transactional
    public OrderDto.OrderResponse placeOrder(String email, OrderDto.PlaceOrderRequest request) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Cart cart = cartService.getCartEntity(email);

        if (cart.getItems().isEmpty()) {
            throw new BadRequestException("Cannot place order with an empty cart");
        }

        Order order = Order.builder()
                .user(user)
                .shippingAddress(request.getShippingAddress())
                .build();

        List<OrderItem> orderItems = cart.getItems().stream().map(cartItem -> {
            Product product = cartItem.getProduct();
            if (product.getStock() < cartItem.getQuantity()) {
                throw new BadRequestException("Insufficient stock for: " + product.getName());
            }
            product.setStock(product.getStock() - cartItem.getQuantity());
            productRepository.save(product);

            return OrderItem.builder()
                    .order(order)
                    .product(product)
                    .quantity(cartItem.getQuantity())
                    .priceAtPurchase(product.getPrice())
                    .build();
        }).collect(Collectors.toList());

        order.setItems(orderItems);

        BigDecimal total = orderItems.stream()
                .map(i -> i.getPriceAtPurchase().multiply(BigDecimal.valueOf(i.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        order.setTotalAmount(total);

        Order saved = orderRepository.save(order);
        cartService.clearCart(cart);

        return toOrderResponse(saved);
    }

    public List<OrderDto.OrderResponse> getUserOrders(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return orderRepository.findByUserOrderByCreatedAtDesc(user)
                .stream().map(this::toOrderResponse).collect(Collectors.toList());
    }

    public OrderDto.OrderResponse getOrderById(Long id, String email) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found: " + id));
        if (!order.getUser().getEmail().equals(email)) {
            throw new BadRequestException("Access denied");
        }
        return toOrderResponse(order);
    }

    @Transactional
    public OrderDto.OrderResponse cancelOrder(Long id, String email) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found"));
        if (!order.getUser().getEmail().equals(email)) {
            throw new BadRequestException("Access denied");
        }
        if (order.getStatus() != Order.OrderStatus.PENDING) {
            throw new BadRequestException("Only PENDING orders can be cancelled");
        }
        order.getItems().forEach(item -> {
            Product p = item.getProduct();
            p.setStock(p.getStock() + item.getQuantity());
            productRepository.save(p);
        });
        order.setStatus(Order.OrderStatus.CANCELLED);
        return toOrderResponse(orderRepository.save(order));
    }

    private OrderDto.OrderResponse toOrderResponse(Order order) {
        List<OrderDto.OrderItemResponse> items = order.getItems().stream().map(i ->
                new OrderDto.OrderItemResponse(
                        i.getProduct().getId(),
                        i.getProduct().getName(),
                        i.getQuantity(),
                        i.getPriceAtPurchase(),
                        i.getPriceAtPurchase().multiply(BigDecimal.valueOf(i.getQuantity()))
                )
        ).collect(Collectors.toList());

        return new OrderDto.OrderResponse(
                order.getId(), items, order.getTotalAmount(),
                order.getStatus(), order.getShippingAddress(), order.getCreatedAt()
        );
    }
}
