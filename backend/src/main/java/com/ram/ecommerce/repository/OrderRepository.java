package com.ram.ecommerce.repository;

import com.ram.ecommerce.entity.Order;
import com.ram.ecommerce.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUserOrderByCreatedAtDesc(User user);
}
