import React from 'react';
import { ProductDto } from '../../types/productTypes';

interface ProductListProps {
  products: ProductDto[];
  onDeleteProduct: (id: string) => Promise<void>;
}

const ProductList: React.FC<ProductListProps> = ({ products, onDeleteProduct }) => {
  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await onDeleteProduct(id);
      } catch (err) {
        console.error('Failed to delete product:', err);
      }
    }
  };

  if (products.length === 0) {
    return (
      <div className="product-list-empty">
        <p>No products found. Create your first product!</p>
      </div>
    );
  }

  return (
    <div className="product-list">
      <table className="product-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>${product.price?.toFixed(2) || '0.00'}</td>
              <td>{product.stock ?? 0}</td>
              <td className="product-actions">
                <button
                  className="btn-edit"
                  onClick={() => window.location.href = `/products/${product.id}/edit`}
                >
                  Edit
                </button>
                <button
                  className="btn-delete"
                  onClick={() => handleDelete(product.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;