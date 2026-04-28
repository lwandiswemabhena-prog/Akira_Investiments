# Product Images Setup Guide

## Image Directory Structure
```
src/assets/
├── seasonings/          (Spice/seasoning product images)
├── bags/               (Bread bags, hay rolls, packaging)
└── dairy/              (Milk, maas, dairy products)
```

## Adding Product Images

### 0. Hero Background
Place this image directly in `src/assets/`:
- `hero-bg.jpg` - The background image for the landing page (Spices on counter)


### 1. Seasonings (Spices)
Place these images in `src/assets/seasonings/`:
- `braai-grill.jpg` - Braai & Grill Spicy BBQ Seasoning
- `six-gun.jpg` - Six Gun Grill Seasoning  
- `seven-colours.jpg` - Seven Colours Grill Seasoning
- `nandos.jpg` - Nandos Seasoning

### 2. Bags & Packaging
Place these images in `src/assets/bags/`:
- `bread-bags.jpg` - Frosted Bread Bags (Extra Strength)
- `taxi-bags.jpg` - Big Taxi Bags (NRCS Approved)

### 3. Dairy Products
Place these images in `src/assets/dairy/`:
- `maas-large.jpg` - Full Cream Maas 4kg (Extra Large)
- `maas-medium.jpg` - Full Cream Maas 2kg (Large)
- `maas-small.jpg` - Full Cream Maas 1kg (Medium)

## Image Requirements
- **Format**: JPG, PNG, or WebP
- **Recommended Size**: 400x400px (square format)
- **File Size**: Keep under 200KB for best performance
- **Naming**: Use lowercase with hyphens (e.g., `product-name.jpg`)

## Steps to Add Images
1. Save your product images with the correct names
2. Place them in their respective directories (seasonings/, bags/, dairy/)
3. The catalogue will automatically load them
4. If images don't appear, check:
   - File names match exactly (case-sensitive on Linux/Mac)
   - File format is supported (JPG, PNG, WebP)
   - Files are in the correct directory

## Image Sources
You provided these product images:
- Frosted Bread Bags (3 packages) → `bread-bags.jpg`
- Big Taxi Bags (stacked) → `taxi-bags.jpg`
- Milk/Maas products (different sizes) → `maas-large.jpg`, `maas-medium.jpg`, `maas-small.jpg`
- Seasonings (4 products) → `braai-grill.jpg`, `six-gun.jpg`, `seven-colours.jpg`, `nandos.jpg`

## Testing
After adding images:
1. Run `npm run dev` in the terminal
2. Navigate to the Catalogue page
3. Images should display on product cards
4. If not displaying, check browser console for errors

## Backend Integration
The product images are referenced in the frontend catalog. When connecting to the Spring backend, images can be:
- Stored as URLs in the database
- Served from a file upload service
- Referenced from this local assets directory

Current setup uses local file paths. To change to backend URLs later:
1. Update `catalogue.ts` product image fields to backend URLs
2. Configure Spring to serve static files or upload to cloud storage
3. Update the image paths in the Product entity
