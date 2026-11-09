import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductController } from './infrastructure/controllers/product.controller';
import { ProductRepository } from './infrastructure/repositories/sql/product.repository';
import { ProductNoSqlRepository } from './infrastructure/repositories/nosql/product-no-sql.repository';
import { ProductService } from './application/services/product.service';
import { Product } from './domain/entities/product.entity';
import { ProductNoSql } from './infrastructure/repositories/nosql/product-nosql.schema';
import { databaseConfig } from './config/database.config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: databaseConfig.sql.host,
      port: databaseConfig.sql.port,
      username: databaseConfig.sql.username,
      password: databaseConfig.sql.password,
      database: databaseConfig.sql.database,
      entities: [Product],
      synchronize: databaseConfig.sql.synchronize,
    }),
    TypeOrmModule.forFeature([Product]),
    MongooseModule.forRoot(
      `mongodb://${databaseConfig.nosql.username}:${databaseConfig.nosql.password}@${databaseConfig.nosql.host}:${databaseConfig.nosql.port}/${databaseConfig.nosql.database}`,
    ),
    MongooseModule.forFeature([
      {
        name: ProductNoSql.name,
        schema: ProductNoSql.schema,
        collection: 'products',
      },
    ]),
  ],
  controllers: [ProductController],
  providers: [
    ProductService,
    {
      provide: 'PRODUCT_REPOSITORY',
      useClass: ProductRepository,
    },
    {
      provide: 'PRODUCT_NOSQL_REPOSITORY',
      useClass: ProductNoSqlRepository,
    },
    ProductRepository,
    ProductNoSqlRepository,
  ],
  exports: [ProductService, ProductRepository, ProductNoSqlRepository],
})
export class AppModule {}