package com.akira.investments.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "products")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String productId;

    @Column(nullable = false)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private String shortDescription;

    @Column(nullable = false)
    private BigDecimal price;

    @Column(nullable = false)
    private String moq;

    @Column(nullable = false)
    private String size;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Category category;

    @Column(nullable = false)
    private String image;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StockStatus stockStatus = StockStatus.IN_STOCK;

    @Column
    private Integer stockQuantity = 0;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(nullable = false)
    private LocalDateTime updatedAt = LocalDateTime.now();

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    public enum Category {
        SPICE("spice"),
        BAG("bag"),
        DAIRY("dairy"),
        OTHER("other");

        private final String value;

        Category(String value) {
            this.value = value;
        }

        public String getValue() {
            return value;
        }

        public static Category fromValue(String value) {
            for (Category cat : Category.values()) {
                if (cat.value.equalsIgnoreCase(value)) {
                    return cat;
                }
            }
            throw new IllegalArgumentException("Unknown category: " + value);
        }
    }

    public enum StockStatus {
        IN_STOCK("In Stock"),
        LOW_STOCK("Low Stock"),
        OUT_OF_STOCK("Out of Stock"),
        DISCONTINUED("Discontinued");

        private final String displayName;

        StockStatus(String displayName) {
            this.displayName = displayName;
        }

        public String getDisplayName() {
            return displayName;
        }
    }
}
