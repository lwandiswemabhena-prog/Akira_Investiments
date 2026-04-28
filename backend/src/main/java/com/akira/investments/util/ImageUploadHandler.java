package com.akira.investments.util;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Component
public class ImageUploadHandler {

    @Value("${image.upload.dir:uploads/products}")
    private String uploadDir;

    public String saveImage(MultipartFile file, String category) throws IOException {
        if (file.isEmpty()) {
            throw new IllegalArgumentException("File is empty");
        }

        // Validate file type
        String contentType = file.getContentType();
        if (!contentType.startsWith("image/")) {
            throw new IllegalArgumentException("File must be an image");
        }

        // Create directory if it doesn't exist
        Path uploadPath = Paths.get(uploadDir, category);
        Files.createDirectories(uploadPath);

        // Generate unique filename
        String originalFilename = file.getOriginalFilename();
        String fileExtension = originalFilename.substring(originalFilename.lastIndexOf("."));
        String newFilename = UUID.randomUUID().toString() + fileExtension;

        // Save file
        Path filePath = uploadPath.resolve(newFilename);
        Files.copy(file.getInputStream(), filePath);

        // Return relative path for storage in database
        return "/uploads/products/" + category + "/" + newFilename;
    }

    public void deleteImage(String imagePath) throws IOException {
        if (imagePath != null && !imagePath.isEmpty()) {
            // Convert URL path to file system path
            String filePath = imagePath.replace("/uploads/products/", uploadDir + "/");
            Path path = Paths.get(filePath);
            if (Files.exists(path)) {
                Files.delete(path);
            }
        }
    }

    public boolean isValidImageFile(MultipartFile file) {
        String contentType = file.getContentType();
        return contentType != null && contentType.startsWith("image/");
    }
}
