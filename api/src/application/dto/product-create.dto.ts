export class ProductCreateDto {
  name: string;
  description: string;
  price: number;
  stock: number;

  constructor(data: { name: string; description: string; price: number; stock: number }) {
    this.name = data.name;
    this.description = data.description;
    this.price = data.price;
    this.stock = data.stock;
  }

  static fromRaw(data: Record<string, unknown>): ProductCreateDto {
    return new ProductCreateDto({
      name: String(data.name || ''),
      description: String(data.description || ''),
      price: Number(data.price) || 0,
      stock: Number(data.stock) || 0,
    });
  }

  validate(): string[] {
    const errors: string[] = [];
    if (!this.name || this.name.trim().length === 0) {
      errors.push('Name is required');
    }
    if (!this.description || this.description.trim().length === 0) {
      errors.push('Description is required');
    }
    if (this.price === undefined || this.price === null || this.price <= 0) {
      errors.push('Price must be a positive number');
    }
    if (this.stock === undefined || this.stock === null || this.stock < 0) {
      errors.push('Stock must be a non-negative number');
    }
    return errors;
  }

  toEntity(): Record<string, unknown> {
    return {
      name: this.name,
      description: this.description,
      price: this.price,
      stock: this.stock,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }
}