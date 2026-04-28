package com.akira.investments.controller;

import com.akira.investments.entity.Product;
import com.akira.investments.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class ProductController {

    private final ProductService productService;

    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        return ResponseEntity.ok(productService.getAllProducts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        Optional<Product> product = productService.getProductById(id);
        return product.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/product-id/{productId}")
    public ResponseEntity<Product> getProductByProductId(@PathVariable String productId) {
        Optional<Product> product = productService.getProductByProductId(productId);
        return product.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<Product>> getProductsByCategory(@PathVariable String category) {
        try {
            List<Product> products = productService.getProductsByCategory(category);
            return ResponseEntity.ok(products);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/search")
    public ResponseEntity<List<Product>> searchProducts(
            @RequestParam String query,
            @RequestParam(required = false) String category) {
        List<Product> products;
        if (category != null && !category.isEmpty()) {
            products = productService.searchProductsByCategory(category, query);
        } else {
            products = productService.searchProducts(query);
        }
        return ResponseEntity.ok(products);
    }

    @PostMapping
    public ResponseEntity<Product> createProduct(@RequestBody Product product) {
        try {
            Product createdProduct = productService.createProduct(product);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdProduct);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(
            @PathVariable Long id,
            @RequestBody Product productDetails) {
        try {
            Product updatedProduct = productService.updateProduct(id, productDetails);
            return ResponseEntity.ok(updatedProduct);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PatchMapping("/{id}/price")
    public ResponseEntity<Product> updatePrice(
            @PathVariable Long id,
            @RequestBody PriceUpdateRequest request) {
        try {
            Product updatedProduct = productService.updatePrice(id, request.getPrice());
            return ResponseEntity.ok(updatedProduct);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PatchMapping("/{id}/stock-status")
    public ResponseEntity<Product> updateStockStatus(
            @PathVariable Long id,
            @RequestBody StockStatusRequest request) {
        try {
            Product updatedProduct = productService.updateStockStatus(id, request.getStockStatus());
            return ResponseEntity.ok(updatedProduct);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PatchMapping("/{id}/stock-quantity")
    public ResponseEntity<Product> updateStockQuantity(
            @PathVariable Long id,
            @RequestBody StockQuantityRequest request) {
        try {
            Product updatedProduct = productService.updateStockQuantity(id, request.getQuantity());
            return ResponseEntity.ok(updatedProduct);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        try {
            productService.deleteProduct(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/health")
    public ResponseEntity<String> health() {
        return ResponseEntity.ok("Backend is running!");
    }
}

class PriceUpdateRequest {
    private BigDecimal price;

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }
}

class StockStatusRequest {
    private Product.StockStatus stockStatus;

    public Product.StockStatus getStockStatus() {
        return stockStatus;
    }

    public void setStockStatus(Product.StockStatus stockStatus) {
        this.stockStatus = stockStatus;
    }
}

class StockQuantityRequest {
    private Integer quantity;

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}
