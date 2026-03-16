package com.ram.ecommerce.service;

import com.ram.ecommerce.dto.ProductDto;
import com.ram.ecommerce.entity.Product;
import com.ram.ecommerce.exception.ResourceNotFoundException;
import com.ram.ecommerce.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    public List<ProductDto.Response> getAllProducts() {
        return productRepository.findAll()
                .stream().map(this::toResponse).collect(Collectors.toList());
    }

    public ProductDto.Response getProductById(Long id) {
        return toResponse(findById(id));
    }

    public List<ProductDto.Response> getByCategory(String category) {
        return productRepository.findByCategory(category)
                .stream().map(this::toResponse).collect(Collectors.toList());
    }

    public List<ProductDto.Response> searchProducts(String keyword) {
        return productRepository.findByNameContainingIgnoreCase(keyword)
                .stream().map(this::toResponse).collect(Collectors.toList());
    }

    public ProductDto.Response createProduct(ProductDto.Request request) {
        Product product = Product.builder()
                .name(request.getName())
                .description(request.getDescription())
                .price(request.getPrice())
                .stock(request.getStock())
                .category(request.getCategory())
                .imageUrl(request.getImageUrl())
                .build();
        return toResponse(productRepository.save(product));
    }

    public ProductDto.Response updateProduct(Long id, ProductDto.Request request) {
        Product product = findById(id);
        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setStock(request.getStock());
        product.setCategory(request.getCategory());
        product.setImageUrl(request.getImageUrl());
        return toResponse(productRepository.save(product));
    }

    public void deleteProduct(Long id) {
        productRepository.delete(findById(id));
    }

    public Product findById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
    }

    private ProductDto.Response toResponse(Product p) {
        return new ProductDto.Response(
                p.getId(), p.getName(), p.getDescription(),
                p.getPrice(), p.getStock(), p.getCategory(), p.getImageUrl()
        );
    }
}
