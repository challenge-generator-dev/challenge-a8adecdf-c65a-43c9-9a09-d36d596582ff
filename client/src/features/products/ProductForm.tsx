import React, { useState, useEffect } from 'react';
import { ProductDto, ProductCreateDto, ProductUpdateDto } from '../../types/productTypes';

interface ProductFormProps {
  onSubmit: (data: ProductCreateDto | ProductUpdateDto) => Promise<ProductDto>;
  initialProduct?: ProductDto;
}

const ProductForm: React.FC<ProductFormProps> = ({ onSubmit, initialProduct }) => {
  const [formData, setFormData] = useState<ProductCreateDto>({
    name: '',
    description: '',
    price: 0,
    stock: 0,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialProduct) {
      setFormData({
        name: initialProduct.name || '',
        description: initialProduct.description || '',
        price: initialProduct.price || 0,
        stock: initialProduct.stock || 0,
      });
    }
  }, [initialProduct]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await onSubmit(formData);
      window.location.href = '/products';
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save product');
      console.error('Error saving product:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="product-form-container">
      <h2>{initialProduct ? 'Edit Product' : 'Create New Product'}</h2>
      
      {error && <div className="form-error">{error}</div>}
      
      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-group">
          <label htmlFor="name">Product Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            step="0.01"
            min="0"
            required
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <label htmlFor="stock">Stock</label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            min="0"
            required
            disabled={isSubmitting}
          />
        </div>

        <div className="form-actions">
          <button type="submit" disabled={isSubmitting} className="btn-submit">
            {isSubmitting ? 'Saving...' : 'Save Product'}
          </button>
          <button
            type="button"
            onClick={() => window.location.href = '/products'}
            disabled={isSubmitting}
            className="btn-cancel"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;