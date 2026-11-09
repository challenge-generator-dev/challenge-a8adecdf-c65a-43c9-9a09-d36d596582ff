import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

export const PRODUCT_TABLE_NAME = 'products';

@Entity({ name: PRODUCT_TABLE_NAME })
export class ProductSql {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255, nullable: false })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  @Column({ type: 'int', nullable: false, default: 0 })
  stock: number;

  @Column({ length: 50, nullable: true })
  category: string;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;

  @Column({ name: 'sku', length: 50, unique: true, nullable: false })
  sku: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

export const PRODUCT_SQL_SCHEMA = `
CREATE TABLE IF NOT EXISTS ${PRODUCT_TABLE_NAME} (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  stock INTEGER NOT NULL DEFAULT 0,
  category VARCHAR(50),
  is_active BOOLEAN DEFAULT true,
  sku VARCHAR(50) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_products_sku ON ${PRODUCT_TABLE_NAME}(sku);
CREATE INDEX IF NOT EXISTS idx_products_category ON ${PRODUCT_TABLE_NAME}(category);
CREATE INDEX IF NOT EXISTS idx_products_is_active ON ${PRODUCT_TABLE_NAME}(is_active);
`;

export type ProductSqlEntity = ProductSql;