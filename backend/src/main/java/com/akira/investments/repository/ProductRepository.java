package com.akira.investments.repository;

import com.akira.investments.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    Optional<Product> findByProductId(String productId);

    List<Product> findByCategory(Product.Category category);

    @Query("SELECT p FROM Product p WHERE p.category = :category AND (LOWER(p.name) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(p.description) LIKE LOWER(CONCAT('%', :query, '%')))")
    List<Product> searchByCategoryAndQuery(@Param("category") Product.Category category, @Param("query") String query);

    @Query("SELECT p FROM Product p WHERE LOWER(p.name) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(p.description) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<Product> searchByQuery(@Param("query") String query);
}
