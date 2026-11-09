import axios from 'axios';
import { ProductDto, ProductCreateDto, ProductUpdateDto } from '../types/productTypes';

const API_BASE_URL = 'http://localhost:3000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const listProducts = async (): Promise<ProductDto[]> => {
  const response = await apiClient.get<ProductDto[]>('/products');
  return response.data;
};

export const getProduct = async (id: string): Promise<ProductDto> => {
  const response = await apiClient.get<ProductDto>(`/products/${id}`);
  return response.data;
};

export const createProduct = async (data: ProductCreateDto): Promise<ProductDto> => {
  const response = await apiClient.post<ProductDto>('/products', data);
  return response.data;
};

export const updateProduct = async (id: string, data: ProductUpdateDto): Promise<ProductDto> => {
  const response = await apiClient.put<ProductDto>(`/products/${id}`, data);
  return response.data;
};

export const deleteProduct = async (id: string): Promise<void> => {
  await apiClient.delete(`/products/${id}`);
};