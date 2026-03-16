package com.ram.ecommerce.controller;

import com.ram.ecommerce.dto.OrderDto;
import com.ram.ecommerce.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping("/place")
    public ResponseEntity<OrderDto.OrderResponse> placeOrder(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody OrderDto.PlaceOrderRequest request) {
        return ResponseEntity.ok(orderService.placeOrder(userDetails.getUsername(), request));
    }

    @GetMapping
    public ResponseEntity<List<OrderDto.OrderResponse>> getMyOrders(
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(orderService.getUserOrders(userDetails.getUsername()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderDto.OrderResponse> getOrder(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(orderService.getOrderById(id, userDetails.getUsername()));
    }

    @PutMapping("/{id}/cancel")
    public ResponseEntity<OrderDto.OrderResponse> cancelOrder(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(orderService.cancelOrder(id, userDetails.getUsername()));
    }
}
