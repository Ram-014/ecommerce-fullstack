package com.ram.ecommerce.config;

import com.ram.ecommerce.entity.Product;
import com.ram.ecommerce.entity.User;
import com.ram.ecommerce.repository.ProductRepository;
import com.ram.ecommerce.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        // Seed admin user
        if (!userRepository.existsByEmail("admin@shop.com")) {
            userRepository.save(User.builder()
                    .name("Admin")
                    .email("admin@shop.com")
                    .password(passwordEncoder.encode("admin123"))
                    .role(User.Role.ROLE_ADMIN)
                    .build());
        }

        // Seed sample products
        if (productRepository.count() == 0) {
            productRepository.saveAll(List.of(
                Product.builder().name("Apple iPhone 15").description("Latest Apple iPhone with A16 chip")
                    .price(new BigDecimal("79999")).stock(50).category("Electronics")
                    .imageUrl("https://via.placeholder.com/300x300?text=iPhone+15").build(),
                Product.builder().name("Samsung Galaxy S24").description("Flagship Android smartphone")
                    .price(new BigDecimal("74999")).stock(40).category("Electronics")
                    .imageUrl("https://via.placeholder.com/300x300?text=Galaxy+S24").build(),
                Product.builder().name("Sony WH-1000XM5").description("Noise cancelling wireless headphones")
                    .price(new BigDecimal("29999")).stock(30).category("Electronics")
                    .imageUrl("https://via.placeholder.com/300x300?text=Sony+Headphones").build(),
                Product.builder().name("Nike Air Max 270").description("Comfortable running shoes")
                    .price(new BigDecimal("8999")).stock(100).category("Footwear")
                    .imageUrl("https://via.placeholder.com/300x300?text=Nike+AirMax").build(),
                Product.builder().name("Levi's 511 Slim Jeans").description("Classic slim fit denim jeans")
                    .price(new BigDecimal("3499")).stock(80).category("Clothing")
                    .imageUrl("https://via.placeholder.com/300x300?text=Levis+Jeans").build(),
                Product.builder().name("MacBook Air M2").description("Apple MacBook Air with M2 chip, 8GB RAM")
                    .price(new BigDecimal("114900")).stock(20).category("Electronics")
                    .imageUrl("https://via.placeholder.com/300x300?text=MacBook+Air").build(),
                Product.builder().name("Wireless Mouse Logitech MX Master 3").description("Advanced wireless mouse")
                    .price(new BigDecimal("7995")).stock(60).category("Electronics")
                    .imageUrl("https://via.placeholder.com/300x300?text=Logitech+Mouse").build(),
                Product.builder().name("The Alchemist - Paulo Coelho").description("Bestselling inspirational novel")
                    .price(new BigDecimal("299")).stock(200).category("Books")
                    .imageUrl("https://via.placeholder.com/300x300?text=The+Alchemist").build()
            ));
        }
    }
}
