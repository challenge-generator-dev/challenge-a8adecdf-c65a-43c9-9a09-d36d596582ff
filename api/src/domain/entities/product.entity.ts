import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNumber, IsString, IsOptional, Min, Max } from 'class-validator';

@Entity('products')
@Schema({ collection: 'products' })
export class Product {
  @PrimaryGeneratedColumn('uuid')
  @Prop({ type: String })
  id: string;

  @Column({ length: 100, nullable: false })
  @Prop({ required: true, maxlength: 100 })
  @IsString()
  name: string;

  @Column({ type: 'text', nullable: false })
  @Prop({ required: true })
  @IsString()
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  @Prop({ required: true, type: Number })
  @IsNumber()
  @Min(0)
  price: number;

  @Column({ type: 'int', nullable: false })
  @Prop({ required: true, type: Number })
  @IsNumber()
  @Min(0)
  @Max(10000)
  stock: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @Prop({ default: Date.now })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  @Prop({ default: Date.now })
  updatedAt: Date;
}

export type ProductDocument = Product & Document;
export const ProductSchema = SchemaFactory.createForClass(Product);