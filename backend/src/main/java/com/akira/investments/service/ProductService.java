package com.akira.investments.service;

import com.akira.investments.entity.Product;
import com.akira.investments.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class ProductService {

    private final ProductRepository productRepository;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }

    public Optional<Product> getProductByProductId(String productId) {
        return productRepository.findByProductId(productId);
    }

    public List<Product> getProductsByCategory(String category) {
        return productRepository.findByCategory(Product.Category.fromValue(category));
    }

    public List<Product> searchProducts(String query) {
        return productRepository.searchByQuery(query);
    }

    public List<Product> searchProductsByCategory(String category, String query) {
        return productRepository.searchByCategoryAndQuery(Product.Category.fromValue(category), query);
    }

    public Product createProduct(Product product) {
        if (productRepository.findByProductId(product.getProductId()).isPresent()) {
            throw new IllegalArgumentException("Product with ID " + product.getProductId() + " already exists");
        }
        return productRepository.save(product);
    }

    public Product updateProduct(Long id, Product productDetails) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with ID: " + id));

        product.setName(productDetails.getName());
        product.setDescription(productDetails.getDescription());
        product.setShortDescription(productDetails.getShortDescription());
        product.setPrice(productDetails.getPrice());
        product.setMoq(productDetails.getMoq());
        product.setSize(productDetails.getSize());
        product.setCategory(productDetails.getCategory());
        product.setImage(productDetails.getImage());

        return productRepository.save(product);
    }

    public Product updatePrice(Long id, BigDecimal newPrice) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with ID: " + id));

        product.setPrice(newPrice);
        return productRepository.save(product);
    }

    public Product updateStockStatus(Long id, Product.StockStatus stockStatus) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with ID: " + id));

        product.setStockStatus(stockStatus);
        return productRepository.save(product);
    }

    public Product updateStockQuantity(Long id, Integer quantity) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with ID: " + id));

        product.setStockQuantity(quantity);
        
        // Auto-update stock status based on quantity
        if (quantity == 0) {
            product.setStockStatus(Product.StockStatus.OUT_OF_STOCK);
        } else if (quantity < 5) {
            product.setStockStatus(Product.StockStatus.LOW_STOCK);
        } else {
            product.setStockStatus(Product.StockStatus.IN_STOCK);
        }
        
        return productRepository.save(product);
    }

    public void deleteProduct(Long id) {
        if (!productRepository.existsById(id)) {
            throw new RuntimeException("Product not found with ID: " + id);
        }
        productRepository.deleteById(id);
    }
}
