import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export const PRODUCT_NOSQL_COLLECTION = 'products';

export type ProductNoSqlDocument = ProductNoSql & Document;

@Schema({ collection: PRODUCT_NOSQL_COLLECTION, timestamps: true, versionKey: false })
export class ProductNoSql {
  @Prop({ required: true, index: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ required: true, min: 0 })
  price: number;

  @Prop({ required: true, min: 0, default: 0 })
  stock: number;

  @Prop({ index: true })
  category: string;

  @Prop({ default: true, index: true })
  isActive: boolean;

  @Prop({ required: true, unique: true, index: true })
  sku: string;

  @Prop({ name: 'createdAt', default: Date.now })
  createdAt: Date;

  @Prop({ name: 'updatedAt', default: Date.now })
  updatedAt: Date;
}

export const ProductNoSqlSchema = SchemaFactory.createForClass(ProductNoSql);

ProductNoSqlSchema.index({ name: 'text', description: 'text' });

ProductNoSqlSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

ProductNoSqlSchema.path('price').validate(function(value: number) {
  return value >= 0;
}, 'Price must be a positive number');

ProductNoSqlSchema.path('stock').validate(function(value: number) {
  return value >= 0;
}, 'Stock must be a non-negative number');