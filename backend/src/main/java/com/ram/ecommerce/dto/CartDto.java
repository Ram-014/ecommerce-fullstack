package com.ram.ecommerce.dto;

import lombok.Data;
import java.math.BigDecimal;
import java.util.List;

public class CartDto {

    @Data
    public static class AddItemRequest {
        private Long productId;
        private Integer quantity;
    }

    @Data
    @lombok.AllArgsConstructor
    @lombok.NoArgsConstructor
    public static class CartItemResponse {
        private Long cartItemId;
        private Long productId;
        private String productName;
        private BigDecimal price;
        private Integer quantity;
        private BigDecimal subtotal;
        private String imageUrl;
    }

    @Data
    @lombok.AllArgsConstructor
    @lombok.NoArgsConstructor
    public static class CartResponse {
        private Long cartId;
        private List<CartItemResponse> items;
        private BigDecimal totalAmount;
    }
}
