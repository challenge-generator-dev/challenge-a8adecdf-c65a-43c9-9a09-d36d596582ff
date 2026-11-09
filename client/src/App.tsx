import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProductList from './features/products/ProductList';
import ProductForm from './features/products/ProductForm';
import { ProductDto, ProductCreateDto, ProductUpdateDto } from './types/productTypes';
import { createProduct, getProduct, updateProduct, deleteProduct, listProducts } from './services/productService';
import './App.css';

const App: React.FC = () => {
  const [products, setProducts] = useState<ProductDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await listProducts();
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
        console.error('Failed to fetch products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleCreateProduct = async (productData: ProductCreateDto) => {
    try {
      const newProduct = await createProduct(productData);
      setProducts([...products, newProduct]);
      return newProduct;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create product');
      console.error('Error creating product:', err);
      throw err;
    }
  };

  const handleUpdateProduct = async (id: string, productData: ProductUpdateDto) => {
    try {
      const updatedProduct = await updateProduct(id, productData);
      setProducts(products.map(p => p.id === id ? updatedProduct : p));
      return updatedProduct;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update product');
      console.error('Error updating product:', err);
      throw err;
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      await deleteProduct(id);
      setProducts(products.filter(p => p.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete product');
      console.error('Error deleting product:', err);
      throw err;
    }
  };

  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Product Management</h1>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/products" replace />} />
          <Route
            path="/products"
            element={
              <ProductList
                products={products}
                onDeleteProduct={handleDeleteProduct}
              />
            }
          />
          <Route
            path="/products/new"
            element={<ProductForm onSubmit={handleCreateProduct} />}
          />
          <Route
            path="/products/:id/edit"
            element={
              <ProductForm
                onSubmit={handleUpdateProduct}
                initialProduct={products.find(p => p.id === window.location.pathname.split('/')[2])}
              />
            }
          />
        </Routes>
      </main>
    </div>
  );
};

export default App;