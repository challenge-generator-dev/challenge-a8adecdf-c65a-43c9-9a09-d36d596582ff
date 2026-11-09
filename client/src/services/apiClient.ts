import axios, { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';

const API_BASE_URL = 'http://localhost:3000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export function setupAxiosInterceptors() {
  apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = localStorage.getItem('authToken');
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    }
  );

  apiClient.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        localStorage.removeItem('authToken');
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );
}

export interface ProductDto {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductCreateDto {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
}

export interface ProductUpdateDto {
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
  category?: string;
}

export const productService = {
  async createProduct(data: ProductCreateDto): Promise<ProductDto> {
    const response = await apiClient.post<ProductDto>('/products', data);
    return response.data;
  },

  async getProduct(id: string): Promise<ProductDto> {
    const response = await apiClient.get<ProductDto>(`/products/${id}`);
    return response.data;
  },

  async updateProduct(id: string, data: ProductUpdateDto): Promise<ProductDto> {
    const response = await apiClient.put<ProductDto>(`/products/${id}`, data);
    return response.data;
  },

  async deleteProduct(id: string): Promise<void> {
    await apiClient.delete(`/products/${id}`);
  },

  async listProducts(): Promise<ProductDto[]> {
    const response = await apiClient.get<ProductDto[]>('/products');
    return response.data;
  },
};

export default apiClient;