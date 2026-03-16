package com.ram.ecommerce.service;

import com.ram.ecommerce.dto.CartDto;
import com.ram.ecommerce.entity.*;
import com.ram.ecommerce.exception.BadRequestException;
import com.ram.ecommerce.exception.ResourceNotFoundException;
import com.ram.ecommerce.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductService productService;
    private final UserRepository userRepository;

    private User getUser(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

    private Cart getOrCreateCart(User user) {
        return cartRepository.findByUser(user).orElseGet(() -> {
            Cart cart = Cart.builder().user(user).build();
            return cartRepository.save(cart);
        });
    }

    @Transactional
    public CartDto.CartResponse addItem(String email, CartDto.AddItemRequest request) {
        User user = getUser(email);
        Cart cart = getOrCreateCart(user);
        Product product = productService.findById(request.getProductId());

        if (product.getStock() < request.getQuantity()) {
            throw new BadRequestException("Insufficient stock for product: " + product.getName());
        }

        Optional<CartItem> existing = cart.getItems().stream()
                .filter(i -> i.getProduct().getId().equals(product.getId()))
                .findFirst();

        if (existing.isPresent()) {
            existing.get().setQuantity(existing.get().getQuantity() + request.getQuantity());
            cartItemRepository.save(existing.get());
        } else {
            CartItem item = CartItem.builder()
                    .cart(cart).product(product).quantity(request.getQuantity()).build();
            cart.getItems().add(cartItemRepository.save(item));
        }

        return toCartResponse(cartRepository.save(cart));
    }

    @Transactional
    public CartDto.CartResponse updateItem(String email, Long cartItemId, Integer quantity) {
        User user = getUser(email);
        Cart cart = getOrCreateCart(user);

        CartItem item = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart item not found"));

        if (quantity <= 0) {
            cart.getItems().remove(item);
            cartItemRepository.delete(item);
        } else {
            item.setQuantity(quantity);
            cartItemRepository.save(item);
        }

        return toCartResponse(cartRepository.save(cart));
    }

    @Transactional
    public CartDto.CartResponse removeItem(String email, Long cartItemId) {
        User user = getUser(email);
        Cart cart = getOrCreateCart(user);

        CartItem item = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart item not found"));

        cart.getItems().remove(item);
        cartItemRepository.delete(item);
        return toCartResponse(cartRepository.save(cart));
    }

    public CartDto.CartResponse getCart(String email) {
        User user = getUser(email);
        Cart cart = getOrCreateCart(user);
        return toCartResponse(cart);
    }

    @Transactional
    public void clearCart(Cart cart) {
        cart.getItems().clear();
        cartRepository.save(cart);
    }

    public Cart getCartEntity(String email) {
        return getOrCreateCart(getUser(email));
    }

    private CartDto.CartResponse toCartResponse(Cart cart) {
        List<CartDto.CartItemResponse> items = cart.getItems().stream().map(item -> {
            BigDecimal subtotal = item.getProduct().getPrice()
                    .multiply(BigDecimal.valueOf(item.getQuantity()));
            return new CartDto.CartItemResponse(
                    item.getId(),
                    item.getProduct().getId(),
                    item.getProduct().getName(),
                    item.getProduct().getPrice(),
                    item.getQuantity(),
                    subtotal,
                    item.getProduct().getImageUrl()
            );
        }).collect(Collectors.toList());

        BigDecimal total = items.stream()
                .map(CartDto.CartItemResponse::getSubtotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        return new CartDto.CartResponse(cart.getId(), items, total);
    }
}
