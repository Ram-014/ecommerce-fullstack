package com.ram.ecommerce.controller;

import com.ram.ecommerce.dto.CartDto;
import com.ram.ecommerce.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @GetMapping
    public ResponseEntity<CartDto.CartResponse> getCart(@AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(cartService.getCart(userDetails.getUsername()));
    }

    @PostMapping("/add")
    public ResponseEntity<CartDto.CartResponse> addItem(@AuthenticationPrincipal UserDetails userDetails,
                                                         @RequestBody CartDto.AddItemRequest request) {
        return ResponseEntity.ok(cartService.addItem(userDetails.getUsername(), request));
    }

    @PutMapping("/update/{cartItemId}")
    public ResponseEntity<CartDto.CartResponse> updateItem(@AuthenticationPrincipal UserDetails userDetails,
                                                            @PathVariable Long cartItemId,
                                                            @RequestParam Integer quantity) {
        return ResponseEntity.ok(cartService.updateItem(userDetails.getUsername(), cartItemId, quantity));
    }

    @DeleteMapping("/remove/{cartItemId}")
    public ResponseEntity<CartDto.CartResponse> removeItem(@AuthenticationPrincipal UserDetails userDetails,
                                                            @PathVariable Long cartItemId) {
        return ResponseEntity.ok(cartService.removeItem(userDetails.getUsername(), cartItemId));
    }
}
