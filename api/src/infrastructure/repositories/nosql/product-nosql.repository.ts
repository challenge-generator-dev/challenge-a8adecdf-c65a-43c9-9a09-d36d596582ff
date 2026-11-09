import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from '../../../domain/entities/product.entity';
import { ProductCreateDto } from '../../../application/dto/product-create.dto';
import { ProductUpdateDto } from '../../../application/dto/product-update.dto';

@Injectable()
export class ProductNoSqlRepository {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async create(productData: ProductCreateDto): Promise<Product> {
    const createdProduct = new this.productModel(productData);
    return await createdProduct.save();
  }

  async findById(id: string): Promise<Product | null> {
    return await this.productModel.findById(id).exec();
  }

  async update(id: string, productData: ProductUpdateDto): Promise<Product | null> {
    return await this.productModel
      .findByIdAndUpdate(id, productData, { new: true })
      .exec();
  }

  async delete(id: string): Promise<void> {
    await this.productModel.findByIdAndDelete(id).exec();
  }

  async findAll(): Promise<Product[]> {
    return await this.productModel.find().exec();
  }
}