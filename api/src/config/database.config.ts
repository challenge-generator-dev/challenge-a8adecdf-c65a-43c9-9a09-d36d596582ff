import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { MongooseModuleOptions } from '@nestjs/mongoose';
import { Product } from '../domain/entities/product.entity';

export interface DatabaseConfig {
  sql: TypeOrmModuleOptions;
  nosql: MongooseModuleOptions;
}

export const getDatabaseConfig = (): DatabaseConfig => {
  const sqlHost = process.env.SQL_HOST || 'localhost';
  const sqlPort = parseInt(process.env.SQL_PORT || '5432', 10);
  const sqlUsername = process.env.SQL_USERNAME || 'postgres';
  const sqlPassword = process.env.SQL_PASSWORD || 'postgres';
  const sqlDatabase = process.env.SQL_DATABASE || 'product_db';

  const nosqlHost = process.env.NOSQL_HOST || 'localhost';
  const nosqlPort = parseInt(process.env.NOSQL_PORT || '27017', 10);
  const nosqlDatabase = process.env.NOSQL_DATABASE || 'products';
  const nosqlUsername = process.env.NOSQL_USERNAME;
  const nosqlPassword = process.env.NOSQL_PASSWORD;

  const sqlConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: sqlHost,
    port: sqlPort,
    username: sqlUsername,
    password: sqlPassword,
    database: sqlDatabase,
    entities: [Product],
    synchronize: process.env.NODE_ENV !== 'production',
    logging: process.env.NODE_ENV === 'development',
    ssl: process.env.SQL_SSL === 'true' ? { rejectUnauthorized: false } : false,
    extra: {
      connectionLimit: parseInt(process.env.SQL_POOL_SIZE || '10', 10),
      statement_timeout: parseInt(process.env.SQL_STATEMENT_TIMEOUT || '30000', 10),
    },
  };

  const nosqlConfig: MongooseModuleOptions = {
    uri: `mongodb://${nosqlUsername && nosqlPassword ? `${nosqlUsername}:${nosqlPassword}@` : ''}${nosqlHost}:${nosqlPort}/${nosqlDatabase}`,
    dbName: nosqlDatabase,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    maxPoolSize: parseInt(process.env.NOSQL_POOL_SIZE || '10', 10),
    minPoolSize: parseInt(process.env.NOSQL_MIN_POOL_SIZE || '2', 10),
  };

  return {
    sql: sqlConfig,
    nosql: nosqlConfig,
  };
};

export const validateDatabaseConfig = (): boolean => {
  const requiredSqlVars = ['SQL_HOST', 'SQL_PORT', 'SQL_USERNAME', 'SQL_PASSWORD', 'SQL_DATABASE'];
  const requiredNosqlVars = ['NOSQL_HOST', 'NOSQL_PORT', 'NOSQL_DATABASE'];

  const missingSqlVars = requiredSqlVars.filter(v => !process.env[v]);
  const missingNosqlVars = requiredNosqlVars.filter(v => !process.env[v]);

  if (missingSqlVars.length > 0) {
    console.warn(`Advertencia: Variables de entorno SQL faltantes: ${missingSqlVars.join(', ')}`);
    return false;
  }

  if (missingNosqlVars.length > 0) {
    console.warn(`Advertencia: Variables de entorno NoSQL faltantes: ${missingNosqlVars.join(', ')}`);
    return false;
  }

  return true;
};

export const DATABASE_CONFIG_TOKEN = 'DATABASE_CONFIG';

export const databaseConfig: DatabaseConfig = getDatabaseConfig();