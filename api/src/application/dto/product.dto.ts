export class ProductDto {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: Partial<ProductDto>) {
    this.id = data.id || '';
    this.name = data.name || '';
    this.description = data.description || '';
    this.price = data.price || 0;
    this.stock = data.stock || 0;
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }

  static fromEntity(entity: Record<string, unknown>): ProductDto {
    return new ProductDto({
      id: entity.id as string,
      name: entity.name as string,
      description: entity.description as string,
      price: Number(entity.price),
      stock: Number(entity.stock),
      createdAt: entity.createdAt ? new Date(entity.createdAt as string) : new Date(),
      updatedAt: entity.updatedAt ? new Date(entity.updatedAt as string) : new Date(),
    });
  }

  toResponse(): Record<string, unknown> {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      price: this.price,
      stock: this.stock,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
    };
  }
}