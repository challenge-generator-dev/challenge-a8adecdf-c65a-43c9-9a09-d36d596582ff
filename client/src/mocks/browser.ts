import { setupWorker } from 'msw/browser';
import { http, HttpResponse } from 'msw';

interface ProductDto {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  createdAt: string;
  updatedAt: string;
}

const mockProducts: ProductDto[] = [
  {
    id: '1',
    name: 'Laptop Pro',
    description: 'Laptop de alta gama para desarrolladores',
    price: 1299.99,
    stock: 15,
    category: 'Electrónica',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    name: 'Mouse Inalámbrico',
    description: 'Mouse ergonómico con conexión Bluetooth',
    price: 49.99,
    stock: 50,
    category: 'Accesorios',
    createdAt: '2024-01-16T11:00:00Z',
    updatedAt: '2024-01-16T11:00:00Z',
  },
  {
    id: '3',
    name: 'Teclado Mecánico',
    description: 'Teclado RGB con switches Cherry MX',
    price: 149.99,
    stock: 25,
    category: 'Accesorios',
    createdAt: '2024-01-17T12:00:00Z',
    updatedAt: '2024-01-17T12:00:00Z',
  },
];

let nextId = 4;

const productHandlers = [
  http.get('/products', () => {
    return HttpResponse.json(mockProducts);
  }),

  http.get('/products/:id', ({ params }) => {
    const product = mockProducts.find((p) => p.id === params.id);
    if (!product) {
      return new HttpResponse(null, { status: 404 });
    }
    return HttpResponse.json(product);
  }),

  http.post('/products', async ({ request }) => {
    const body = (await request.json()) as Omit<ProductDto, 'id' | 'createdAt' | 'updatedAt'>;
    const newProduct: ProductDto = {
      ...body,
      id: String(nextId++),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockProducts.push(newProduct);
    return HttpResponse.json(newProduct, { status: 201 });
  }),

  http.put('/products/:id', async ({ params, request }) => {
    const productIndex = mockProducts.findIndex((p) => p.id === params.id);
    if (productIndex === -1) {
      return new HttpResponse(null, { status: 404 });
    }
    const body = (await request.json()) as Partial<ProductDto>;
    mockProducts[productIndex] = {
      ...mockProducts[productIndex],
      ...body,
      updatedAt: new Date().toISOString(),
    };
    return HttpResponse.json(mockProducts[productIndex]);
  }),

  http.delete('/products/:id', ({ params }) => {
    const productIndex = mockProducts.findIndex((p) => p.id === params.id);
    if (productIndex === -1) {
      return new HttpResponse(null, { status: 404 });
    }
    mockProducts.splice(productIndex, 1);
    return new HttpResponse(null, { status: 204 });
  }),
];

export const worker = setupWorker(...productHandlers);