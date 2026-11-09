export class ProductUpdateDto {
  name?: string;
  description?: string;
  price?: number;
  stock?: number;

  constructor(data?: { name?: string; description?: string; price?: number; stock?: number }) {
    if (data) {
      this.name = data.name;
      this.description = data.description;
      this.price = data.price;
      this.stock = data.stock;
    }
  }

  static fromRaw(data: Record<string, unknown>): ProductUpdateDto {
    return new ProductUpdateDto({
      name: data.name ? String(data.name) : undefined,
      description: data.description ? String(data.description) : undefined,
      price: data.price !== undefined ? Number(data.price) : undefined,
      stock: data.stock !== undefined ? Number(data.stock) : undefined,
    });
  }

  validate(): string[] {
    const errors: string[] = [];
    if (this.name !== undefined && this.name.trim().length === 0) {
      errors.push('Name cannot be empty');
    }
    if (this.description !== undefined && this.description.trim().length === 0) {
      errors.push('Description cannot be empty');
    }
    if (this.price !== undefined && (this.price <= 0 || isNaN(this.price))) {
      errors.push('Price must be a positive number');
    }
    if (this.stock !== undefined && (this.stock < 0 || isNaN(this.stock))) {
      errors.push('Stock must be a non-negative number');
    }
    return errors;
  }

  hasChanges(): boolean {
    return (
      this.name !== undefined ||
      this.description !== undefined ||
      this.price !== undefined ||
      this.stock !== undefined
    );
  }

  toEntity(): Record<string, unknown> {
    const entity: Record<string, unknown> = {};
    if (this.name !== undefined) entity.name = this.name;
    if (this.description !== undefined) entity.description = this.description;
    if (this.price !== undefined) entity.price = this.price;
    if (this.stock !== undefined) entity.stock = this.stock;
    if (this.hasChanges()) entity.updatedAt = new Date();
    return entity;
  }
}