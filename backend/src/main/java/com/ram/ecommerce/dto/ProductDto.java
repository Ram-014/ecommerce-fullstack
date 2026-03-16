package com.ram.ecommerce.dto;

import jakarta.validation.constraints.*;
import lombok.Data;
import java.math.BigDecimal;

public class ProductDto {

    @Data
    public static class Request {
        @NotBlank(message = "Product name is required")
        private String name;

        private String description;

        @NotNull(message = "Price is required")
        @DecimalMin(value = "0.0", inclusive = false, message = "Price must be greater than 0")
        private BigDecimal price;

        @NotNull(message = "Stock is required")
        @Min(value = 0, message = "Stock cannot be negative")
        private Integer stock;

        private String category;
        private String imageUrl;
    }

    @Data
    @lombok.AllArgsConstructor
    @lombok.NoArgsConstructor
    public static class Response {
        private Long id;
        private String name;
        private String description;
        private BigDecimal price;
        private Integer stock;
        private String category;
        private String imageUrl;
    }
}
