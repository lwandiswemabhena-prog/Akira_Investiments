// API service for communicating with Spring backend
const API_BASE_URL = 'http://localhost:8080/api';

export interface ApiProduct {
  id: number;
  productId: string;
  name: string;
  description: string;
  shortDescription: string;
  price: number;
  moq: string;
  size: string;
  category: string;
  image: string;
  stockStatus: 'IN_STOCK' | 'LOW_STOCK' | 'OUT_OF_STOCK' | 'DISCONTINUED';
  stockQuantity?: number;
}

// Product Endpoints
export const productApi = {
  // Get all products
  getAllProducts: async (): Promise<ApiProduct[]> => {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) throw new Error('Failed to fetch products');
    return response.json();
  },

  // Get product by ID
  getProductById: async (id: number): Promise<ApiProduct> => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    if (!response.ok) throw new Error('Product not found');
    return response.json();
  },

  // Get products by category
  getProductsByCategory: async (category: string): Promise<ApiProduct[]> => {
    const response = await fetch(`${API_BASE_URL}/products/category/${category}`);
    if (!response.ok) throw new Error('Failed to fetch products');
    return response.json();
  },

  // Search products
  searchProducts: async (query: string, category?: string): Promise<ApiProduct[]> => {
    const params = new URLSearchParams({ query });
    if (category) params.append('category', category);
    const response = await fetch(`${API_BASE_URL}/products/search?${params}`);
    if (!response.ok) throw new Error('Search failed');
    return response.json();
  },

  // Create product
  createProduct: async (product: Partial<ApiProduct>): Promise<ApiProduct> => {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    });
    if (!response.ok) throw new Error('Failed to create product');
    return response.json();
  },

  // Update product
  updateProduct: async (id: number, updates: Partial<ApiProduct>): Promise<ApiProduct> => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    if (!response.ok) throw new Error('Failed to update product');
    return response.json();
  },

  // Update price
  updatePrice: async (id: number, price: number): Promise<ApiProduct> => {
    const response = await fetch(`${API_BASE_URL}/products/${id}/price`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ price })
    });
    if (!response.ok) throw new Error('Failed to update price');
    return response.json();
  },

  // Update stock status
  updateStockStatus: async (id: number, stockStatus: string): Promise<ApiProduct> => {
    const response = await fetch(`${API_BASE_URL}/products/${id}/stock-status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ stockStatus })
    });
    if (!response.ok) throw new Error('Failed to update stock status');
    return response.json();
  },

  // Update stock quantity
  updateStockQuantity: async (id: number, quantity: number): Promise<ApiProduct> => {
    const response = await fetch(`${API_BASE_URL}/products/${id}/stock-quantity`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quantity })
    });
    if (!response.ok) throw new Error('Failed to update stock quantity');
    return response.json();
  },

  // Delete product
  deleteProduct: async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete product');
  },

  // Health check
  healthCheck: async (): Promise<string> => {
    const response = await fetch(`${API_BASE_URL}/products/health`);
    if (!response.ok) throw new Error('Backend is not responding');
    return response.text();
  },

  // Image upload
  uploadProductImage: async (productId: string, file: File, category: string): Promise<any> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('category', category);
    
    const response = await fetch(`http://localhost:8080/api/images/upload/${productId}`, {
      method: 'POST',
      body: formData
    });
    if (!response.ok) throw new Error('Failed to upload image');
    return response.json();
  },

  // Upload multiple images
  uploadMultipleImages: async (files: File[], category: string): Promise<any> => {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('files', file);
    });
    formData.append('category', category);
    
    const response = await fetch(`http://localhost:8080/api/images/upload-multiple`, {
      method: 'POST',
      body: formData
    });
    if (!response.ok) throw new Error('Failed to upload images');
    return response.json();
  },

  // Delete product image
  deleteProductImage: async (productId: string): Promise<void> => {
    const response = await fetch(`http://localhost:8080/api/images/${productId}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete image');
  }
};

export default productApi;
