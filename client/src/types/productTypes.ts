export interface ProductDto {
  id: string;
  name: string;
  description?: string;
  price?: number;
  stock?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductCreateDto {
  name: string;
  description?: string;
  price?: number;
  stock?: number;
}

export interface ProductUpdateDto {
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
}