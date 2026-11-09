import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, HttpStatus, ParseUUIDPipe, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { ProductService } from '../../application/services/product.service';
import { ProductCreateDto } from '../../application/dto/product-create.dto';
import { ProductUpdateDto } from '../../application/dto/product-update.dto';
import { ProductDto } from '../../application/dto/product.dto';

@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({ status: 201, description: 'Product created successfully', type: ProductDto })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiBody({ type: ProductCreateDto })
  async create(@Body() createProductDto: ProductCreateDto): Promise<ProductDto> {
    return this.productService.create(createProductDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a product by ID' })
  @ApiResponse({ status: 200, description: 'Product found', type: ProductDto })
  @ApiResponse({ status: 404, description: 'Product not found' })
  @ApiParam({ name: 'id', description: 'Product UUID', type: String })
  async getProduct(@Param('id', ParseUUIDPipe) id: string): Promise<ProductDto> {
    const product = await this.productService.findById(id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a product' })
  @ApiResponse({ status: 200, description: 'Product updated successfully', type: ProductDto })
  @ApiResponse({ status: 404, description: 'Product not found' })
  @ApiParam({ name: 'id', description: 'Product UUID', type: String })
  @ApiBody({ type: ProductUpdateDto })
  async updateProduct(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProductDto: ProductUpdateDto,
  ): Promise<ProductDto> {
    const product = await this.productService.update(id, updateProductDto);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a product' })
  @ApiResponse({ status: 204, description: 'Product deleted successfully' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  @ApiParam({ name: 'id', description: 'Product UUID', type: String })
  async deleteProduct(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    const deleted = await this.productService.delete(id);
    if (!deleted) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
  }

  @Get()
  @ApiOperation({ summary: 'List all products' })
  @ApiResponse({ status: 200, description: 'List of products', type: [ProductDto] })
  async listProducts(): Promise<ProductDto[]> {
    return this.productService.findAll();
  }
}