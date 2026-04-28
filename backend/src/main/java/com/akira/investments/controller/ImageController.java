package com.akira.investments.controller;

import com.akira.investments.entity.Product;
import com.akira.investments.service.ProductService;
import com.akira.investments.util.ImageUploadHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/images")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class ImageController {

    private final ImageUploadHandler imageUploadHandler;
    private final ProductService productService;

    @PostMapping("/upload/{productId}")
    public ResponseEntity<?> uploadProductImage(
            @PathVariable String productId,
            @RequestParam("file") MultipartFile file,
            @RequestParam String category) {
        try {
            // Validate image
            if (!imageUploadHandler.isValidImageFile(file)) {
                return ResponseEntity.badRequest()
                        .body(Map.of("error", "File must be a valid image (JPG, PNG, WebP, etc.)"));
            }

            // Save image
            String imagePath = imageUploadHandler.saveImage(file, category);

            // Update product with new image path
            Product product = productService.getProductByProductId(productId)
                    .orElseThrow(() -> new RuntimeException("Product not found"));

            product.setImage(imagePath);
            productService.updateProduct(product.getId(), product);

            Map<String, String> response = new HashMap<>();
            response.put("message", "Image uploaded successfully");
            response.put("imagePath", imagePath);
            response.put("imageUrl", "http://localhost:8080" + imagePath);

            return ResponseEntity.ok(response);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Failed to upload image: " + e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/upload-multiple")
    public ResponseEntity<?> uploadMultipleImages(
            @RequestParam("files") MultipartFile[] files,
            @RequestParam String category) {
        try {
            Map<String, String> uploadedFiles = new HashMap<>();
            
            for (MultipartFile file : files) {
                if (!imageUploadHandler.isValidImageFile(file)) {
                    continue;
                }
                String imagePath = imageUploadHandler.saveImage(file, category);
                uploadedFiles.put(file.getOriginalFilename(), imagePath);
            }

            return ResponseEntity.ok(Map.of(
                    "message", "Images uploaded successfully",
                    "uploadedFiles", uploadedFiles
            ));
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Failed to upload images"));
        }
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity<?> deleteProductImage(@PathVariable String productId) {
        try {
            Product product = productService.getProductByProductId(productId)
                    .orElseThrow(() -> new RuntimeException("Product not found"));

            imageUploadHandler.deleteImage(product.getImage());
            product.setImage(null);
            productService.updateProduct(product.getId(), product);

            return ResponseEntity.ok(Map.of("message", "Image deleted successfully"));
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Failed to delete image"));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", e.getMessage()));
        }
    }
}
