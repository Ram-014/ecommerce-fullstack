package com.ram.ecommerce.dto;

import com.ram.ecommerce.entity.Order;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public class OrderDto {

    @Data
    public static class PlaceOrderRequest {
        private String shippingAddress;
    }

    @Data
    @lombok.AllArgsConstructor
    @lombok.NoArgsConstructor
    public static class OrderItemResponse {
        private Long productId;
        private String productName;
        private Integer quantity;
        private BigDecimal priceAtPurchase;
        private BigDecimal subtotal;
    }

    @Data
    @lombok.AllArgsConstructor
    @lombok.NoArgsConstructor
    public static class OrderResponse {
        private Long orderId;
        private List<OrderItemResponse> items;
        private BigDecimal totalAmount;
        private Order.OrderStatus status;
        private String shippingAddress;
        private LocalDateTime createdAt;
    }
}
