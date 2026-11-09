import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument as ProductNoSqlDocument } from '../../../domain/entities/product.entity';
import { ProductNoSql } from './product-nosql.schema';

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

@Injectable()
export class ProductNoSqlRepository {
  constructor(
    @InjectModel(ProductNoSql.name) private readonly productModel: Model<ProductNoSqlDocument>,
  ) {}

  async create(productData: ProductCreateDto): Promise<Product> {
    const createdProduct = new this.productModel({
      ...productData,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const savedProduct = await createdProduct.save();
    return this.mapToEntity(savedProduct);
  }

  async findById(id: string): Promise<Product | null> {
    try {
      const product = await this.productModel.findById(id).exec();
      if (!product) {
        return null;
      }
      return this.mapToEntity(product);
    } catch (error) {
      return null;
    }
  }

  async findByIdOrFail(id: string): Promise<Product> {
    const product = await this.findById(id);
    if (!product) {
      throw new Error(`Product with ID ${id} not found`);
    }
    return product;
  }

  async update(id: string, productData: ProductUpdateDto): Promise<Product | null> {
    const updatedProduct = await this.productModel
      .findByIdAndUpdate(
        id,
        {
          ...productData,
          updatedAt: new Date(),
        },
        { new: true },
      )
      .exec();
    if (!updatedProduct) {
      return null;
    }
    return this.mapToEntity(updatedProduct);
  }

  async delete(id: string): Promise<void> {
    const result = await this.productModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new Error(`Product with ID ${id} not found`);
    }
  }

  async findAll(): Promise<Product[]> {
    const products = await this.productModel.find().exec();
    return products.map((product) => this.mapToEntity(product));
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.productModel.countDocuments({ _id: id }).exec();
    return count > 0;
  }

  async count(): Promise<number> {
    return this.productModel.countDocuments().exec();
  }

  private mapToEntity(document: ProductNoSql & Document): Product {
    return {
      id: (document as any)._id?.toString() || (document as any).id,
      name: document.name,
      description: document.description,
      price: document.price,
      stock: document.stock,
      category: document.category,
      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
    };
  }
}