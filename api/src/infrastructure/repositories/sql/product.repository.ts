import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryFailedError } from 'typeorm';
import { Product } from '../../../domain/entities/product.entity';
import { ProductCreateDto } from '../../../application/dto/product-create.dto';
import { ProductUpdateDto } from '../../../application/dto/product-update.dto';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(productData: ProductCreateDto): Promise<Product> {
    try {
      const productEntity = this.productRepository.create(productData.toEntity());
      const savedProduct = await this.productRepository.save(productEntity);
      return savedProduct;
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new InternalServerErrorException(
          `Failed to create product: ${error.message}`,
        );
      }
      throw error;
    }
  }

  async findById(id: string): Promise<Product | null> {
    try {
      const product = await this.productRepository.findOne({
        where: { id } as any,
      });
      return product;
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new InternalServerErrorException(
          `Failed to find product: ${error.message}`,
        );
      }
      throw error;
    }
  }

  async findByIdOrFail(id: string): Promise<Product> {
    const product = await this.findById(id);
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }

  async update(id: string, productData: ProductUpdateDto): Promise<Product | null> {
    try {
      if (!productData.hasChanges()) {
        return await this.findByIdOrFail(id);
      }
      const updateResult = await this.productRepository.update(
        id,
        productData.toEntity() as any,
      );
      if (updateResult.affected === 0) {
        throw new NotFoundException(`Product with id ${id} not found`);
      }
      return await this.findById(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      if (error instanceof QueryFailedError) {
        throw new InternalServerErrorException(
          `Failed to update product: ${error.message}`,
        );
      }
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const deleteResult = await this.productRepository.delete(id);
      if (deleteResult.affected === 0) {
        throw new NotFoundException(`Product with id ${id} not found`);
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      if (error instanceof QueryFailedError) {
        throw new InternalServerErrorException(
          `Failed to delete product: ${error.message}`,
        );
      }
      throw error;
    }
  }

  async findAll(): Promise<Product[]> {
    try {
      return await this.productRepository.find();
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new InternalServerErrorException(
          `Failed to retrieve products: ${error.message}`,
        );
      }
      throw error;
    }
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.productRepository.count({
      where: { id } as any,
    });
    return count > 0;
  }

  async count(): Promise<number> {
    return await this.productRepository.count();
  }
}