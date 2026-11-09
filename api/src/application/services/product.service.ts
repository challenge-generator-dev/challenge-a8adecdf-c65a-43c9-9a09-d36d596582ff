import { Injectable, NotFoundException, ConflictException, Inject } from '@nestjs/common';
import { ProductRepository } from '../../infrastructure/repositories/sql/product.repository';
import { ProductNoSqlRepository } from '../../infrastructure/repositories/nosql/product-no-sql.repository';
import { Product } from '../../domain/entities/product.entity';

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

export interface ProductDto {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class ProductService {
  constructor(
    @Inject('PRODUCT_REPOSITORY') private readonly sqlRepository: ProductRepository,
    @Inject('PRODUCT_NOSQL_REPOSITORY') private readonly noSqlRepository: ProductNoSqlRepository,
  ) {}

  private toDto(product: Product): ProductDto {
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      category: product.category,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  }

  async create(createDto: ProductCreateDto, useNoSql: boolean = false): Promise<ProductDto> {
    if (!useNoSql) {
      const existingProduct = await this.sqlRepository.findByName(createDto.name);
      if (existingProduct) {
        throw new ConflictException(`Product with name '${createDto.name}' already exists`);
      }
    }
    const repository = useNoSql ? this.noSqlRepository : this.sqlRepository;
    const product = await repository.create(createDto);
    return this.toDto(product);
  }

  async findById(id: string, useNoSql: boolean = false): Promise<ProductDto> {
    const repository = useNoSql ? this.noSqlRepository : this.sqlRepository;
    const product = await repository.findById(id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return this.toDto(product);
  }

  async update(id: string, updateDto: ProductUpdateDto, useNoSql: boolean = false): Promise<ProductDto> {
    const repository = useNoSql ? this.noSqlRepository : this.sqlRepository;
    const product = await repository.update(id, updateDto);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return this.toDto(product);
  }

  async delete(id: string, useNoSql: boolean = false): Promise<void> {
    const repository = useNoSql ? this.noSqlRepository : this.sqlRepository;
    const product = await repository.findById(id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    await repository.delete(id);
  }

  async findAll(useNoSql: boolean = false): Promise<ProductDto[]> {
    const repository = useNoSql ? this.noSqlRepository : this.sqlRepository;
    const products = await repository.findAll();
    return products.map((product) => this.toDto(product));
  }

  async findByName(name: string, useNoSql: boolean = false): Promise<ProductDto | null> {
    const repository = useNoSql ? this.noSqlRepository : this.sqlRepository;
    if (useNoSql) {
      const products = await repository.findAll();
      const product = products.find((p) => p.name === name);
      return product ? this.toDto(product) : null;
    }
    const product = await (repository as ProductRepository).findByName(name);
    return product ? this.toDto(product) : null;
  }

  async updateStock(id: string, quantity: number, useNoSql: boolean = false): Promise<ProductDto> {
    const repository = useNoSql ? this.noSqlRepository : this.sqlRepository;
    const product = await repository.findById(id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    const newStock = product.stock + quantity;
    if (newStock < 0) {
      throw new ConflictException('Insufficient stock for this operation');
    }
    const updatedProduct = await repository.update(id, { stock: newStock });
    if (!updatedProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return this.toDto(updatedProduct);
  }

  async findByCategory(category: string, useNoSql: boolean = false): Promise<ProductDto[]> {
    const repository = useNoSql ? this.noSqlRepository : this.sqlRepository;
    const products = await repository.findAll();
    const filteredProducts = products.filter((p) => p.category === category);
    return filteredProducts.map((product) => this.toDto(product));
  }
}