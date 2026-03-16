package com.ram.ecommerce.repository;

import com.ram.ecommerce.entity.Cart;
import com.ram.ecommerce.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart, Long> {
    Optional<Cart> findByUser(User user);
}
