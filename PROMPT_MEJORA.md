# Prompt para Mejorar el Codigo Base

Copia y pega el contenido del bloque de abajo en un asistente de IA (Claude, ChatGPT)
para obtener el proyecto completo y arrancable. Guarda los archivos que te devuelva en la
carpeta del repo, respetando exactamente las rutas.

Si preferis trabajar en tu editor con un agente local (Claude Code, Cursor, Copilot), usa `AGENTS.md` en vez de este archivo: dice lo mismo pero para que escriba los archivos en disco.

## Las dos reglas que no se negocian

1. **Completa el boilerplate.** Todo lo que el proyecto necesita para compilar y arrancar: manifiesto de dependencias, punto de entrada, configuracion, capa de interfaz, y las capas del patron arquitectonico declarado. Eso es andamiaje y es tu trabajo.
2. **NO resuelvas el reto.** Los entregables de las fases son el trabajo de la persona. El hueco pedagogico se deja como esta: el proyecto arranca, pero lo que el reto pide implementar NO esta implementado.

Dicho de otra forma: si algo impide compilar, arreglalo. Si algo es logica de negocio incompleta, validaciones ausentes, un secreto hardcodeado o un patron mejorable, dejalo exactamente como esta — es lo que la persona tiene que encontrar.

## Mapa de componentes

El repo tiene una carpeta por componente. Cada uno se instala y verifica dentro de la suya.

| Componente | Carpeta | Rol | Capa | Track | Tecnologias |
|---|---|---|---|---|---|
| `api` | `api/` | practice | server | Node | DynamoDB, MongoDB |
| `client` | `client/` | chapter, support | client | React | - |
| `infra-local` | (raiz) | support | infra | Compose local | DynamoDB, MongoDB |

## Orden de arranque

1. `docker compose up -d` (en la raiz) — levanta la infraestructura local.
2. `cd api && npm install && npm run build` — componente `api` (practice).
3. `cd client && npm install && npm run build` — componente `client` (chapter, support).

### Contratos entre componentes

- `api` expone http (api: http://localhost:3000):
  - `POST /products`
  - `GET /products/:id`
  - `PUT /products/:id`
  - `DELETE /products/:id`
  - `GET /products`
- `client` expone http (api: http://localhost:3000):
  - `POST /products`
  - `GET /products/:id`
  - `PUT /products/:id`
  - `DELETE /products/:id`
  - `GET /products`

## Herramientas

- **IntelliJ IDEA Debugger**: Depura el componente con la run-config de IntelliJ IDEA (menu Run, carpeta .run/): pone breakpoints donde implementas el reto y arranca en modo debug.

## Lo que le falta a este proyecto

Esto NO lo tenes que adivinar: salio de comparar el proyecto contra la arquitectura declarada del reto y de un analisis estatico del codigo. Completalo TODO.

### Referencias colgando en el codigo que si esta

Cada una rompe la compilacion:

- `api/src/application/services/product.service.ts` — `ProductRepository.findByName`: Se invoca `findByName` sobre `ProductRepository`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `client/src/mocks/browser.ts` — `ProductDto.find`: Se invoca `find` sobre `ProductDto`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `client/src/mocks/browser.ts` — `ProductDto.findIndex`: Se invoca `findIndex` sobre `ProductDto`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `client/src/features/products/ProductList.tsx` — `ProductDto.map`: Se invoca `map` sobre `ProductDto`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.

## Como saber que terminaste

```bash
(cd api && npm install && npm run build) && (cd client && npm install && npm run build) && docker compose config -q
```

Ese comando corriendo sin errores es la definicion de "listo".

---

```
## Briefing del reto (autoridad)
Este bloque manda sobre los archivos adjuntos. El stack y el rol salen de AQUÍ, no de un topic genérico ni de markdown placeholder.

### Perfil
Chapter Frontend, Especialidad Desarrollador, Tecnología React, Trainee L2

### Brecha de conocimiento
Construye operaciones básicas, como crear, obtener, actualizar y eliminar (CRUD), en bases de datos SQL o NoSQL utilizando definición y manipulación de datos (DDL y DML) (corrida e2e 20261109083811938), Construye operaciones básicas, como crear, obtener, actualizar y eliminar (CRUD), en bases de datos SQL o NoSQL utilizando definición y manipulación de datos (DDL y DML)

### Reto
- Tema: operaciones-crud-bases-de-datos-sql-nosql
- Seniority: trainee-l2
- Tipo: practical
- Título: Implementación de Operaciones CRUD en Bases de Datos
- Tiempo estimado: 6 horas

### Fases (trabajo del HUMANO — PROHIBIDO completarlas)
No implementes estos entregables. Dejalos como hueco pedagógico. El asistente solo materializa el proyecto arrancable para que el participante pueda trabajar.
- Fase 1: Configuración del Entorno — objetivo: Configurar el entorno de desarrollo para trabajar con bases de datos SQL y NoSQL. — entregable (NO resolver): Documento de configuración que detalla las herramientas y conexiones establecidas.
- Fase 2: Implementación de Operaciones CRUD en Base de Datos SQL — objetivo: Implementar operaciones CRUD en una base de datos SQL. — entregable (NO resolver): Código fuente que implementa las operaciones CRUD en la base de datos SQL.
- Fase 3: Implementación de Operaciones CRUD en Base de Datos NoSQL — objetivo: Implementar operaciones CRUD en una base de datos NoSQL. — entregable (NO resolver): Código fuente que implementa las operaciones CRUD en la base de datos NoSQL.

Eres un asistente experto en análisis, corrección y generación de archivos de cualquier tipo:
código fuente, documentación, hojas de cálculo, documentos Word, configuraciones, entre otros.
Voy a enviarte una cadena de texto que contiene uno o más archivos. Cada archivo está delimitado por un marcador con el siguiente formato:
// === ARCHIVO: ruta/del/archivo.extension ===
o también puede aparecer como:
## === ARCHIVO: ruta/del/archivo.extension ===
Lo que sigue al marcador puede ser:

El contenido real del archivo (código, texto, YAML, etc.)
Una descripción en lenguaje natural de lo que debe contener el archivo


TU TAREA
PASO 0 — ¿Esto es un proyecto o una carcasa?
Antes de extraer archivos, leé el Briefing (si está) y diagnosticá el adjunto.

Es CARCASA si ocurre CUALQUIERA de estas:
- No hay manifiesto de dependencias del stack del briefing (manifest.json de VTEX IO / package.json / pom.xml / build.gradle / requirements.txt / go.mod / *.tf / *.csproj, según corresponda)
- Hay un "binario" que en realidad es un comentario ("no puede ser mostrado como texto plano", placeholder .fig/.docx vacío)
- Los markdowns ya completan entregables de fases posteriores ("se implementó fade-in", lista de áreas ya resuelta)

Si es CARCASA:
- MATERIALIZÁ un proyecto que arranca en el stack del briefing (VTEX IO Store Framework, Angular, Terraform, pytest, Nest, etc.). Incluí manifiesto, punto de entrada y capa de interfaz reales.
- NO copies los markdowns de "solución" como si fueran el producto. Son ruido de generación.
- NO resuelvas las fases del briefing (están marcadas PROHIBIDO). Dejá el hueco pedagógico: el flujo existe, las microinteracciones/calidad/infra que el reto pide NO están hechas.
- Después seguí al PASO 5 (entrega de archivos).

Si es un proyecto REAL (manifiesto + código que compila o arranca):
- Seguí PASO 1 en adelante. 🔴 compilación sí. 🟡 pedagógico no.

PASO 1 — Detección y extracción
Identifica todos los archivos presentes en la cadena. Para cada archivo extrae:

Su ruta completa (ej: src/main/java/com/pragma/Service.java)
Su contenido o descripción

PASO 2 — Clasificación por tipo
Clasifica cada archivo en una de estas categorías:
A) Código fuente (Java, Python, TypeScript, JavaScript, Kotlin, etc.)
B) Configuración / documentación (YAML, properties, Markdown, JSON, txt, etc.)
C) Excel (.xlsx, .xls, .csv)
D) Word (.docx, .doc)
E) Otro tipo de archivo binario o especial
PASO 3 — Clasificación de errores en código fuente

Objetivo prioritario: que el proyecto compile. No corrijas flujo de negocio ni lógica funcional.

Antes de modificar cualquier archivo de código fuente, clasifica cada problema encontrado en una de estas dos categorías:
🔴 ERROR DE COMPILACIÓN — corregir siempre
Son errores que impiden que el proyecto arranque, sin valor pedagógico:

Import faltante o incorrecto
Clase, método o variable referenciada que no existe en ningún archivo del proyecto
Error de sintaxis
Anotación con atributos inválidos
Dependencia ausente en pom.xml, package.json, etc.
Archivo referenciado que no existe y debe ser creado con implementación mínima

→ CORREGIR estos errores.
🟡 PROBLEMA FUNCIONAL O DE CALIDAD — preservar siempre
Son problemas que no impiden compilar. Pueden ser intencionales para el aprendizaje:

Clave secreta hardcodeada ("secret", "password123")
API deprecada que funciona pero tiene reemplazo moderno
Lógica de negocio incorrecta o incompleta
Código redundante o de baja legibilidad
Falta de validaciones en flujo de negocio
Patrones de diseño incorrectos pero funcionales
Concurrencia no segura
Configuración funcional pero no óptima

→ PRESERVAR tal cual. No corregir, no mejorar, no comentar.
PASO 4 — Procesamiento según tipo de archivo
Tipo A — Código fuente
Aplica únicamente las correcciones clasificadas como 🔴 ERROR DE COMPILACIÓN.
No alteres ningún elemento clasificado como 🟡 PROBLEMA FUNCIONAL O DE CALIDAD.
Si falta un archivo referenciado, créalo con la implementación mínima necesaria para compilar.
Tipo B — Configuración / documentación
Extrae el contenido tal cual, sin modificaciones salvo errores evidentes de sintaxis
(ej: YAML mal indentado).
Tipo C — Excel (.xlsx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un archivo Excel funcional con:

Fila de encabezados en negrita con color de fondo distintivo
Columnas con ancho ajustado al contenido
Tipos de dato correctos por columna
Validaciones si la descripción lo indica
Hojas nombradas descriptivamente si hay más de una
Filas de ejemplo si no hay datos reales

Tipo D — Word (.docx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un documento Word funcional con:

Estilos de título (Título 1, Título 2) para jerarquía de secciones
Fuente legible (Calibri o equivalente), tamaño 11-12pt para cuerpo
Márgenes estándar
Tabla de contenido si tiene múltiples secciones
Tablas con encabezados en negrita si aplica

Tipo E — Otro
Genera el archivo con el contenido o estructura más apropiada según la descripción.
PASO 5 — Entrega de archivos
Entregá cada archivo con su ruta completa, respetando exactamente la estructura de rutas
indicada por los marcadores: un bloque por archivo, precedido por su ruta. No generes ZIPs
ni archivos adjuntos.
La entrega debe incluir:

Archivos de código con únicamente los errores de compilación corregidos
Archivos de configuración y documentación sin cambios
Archivos nuevos creados para resolver dependencias de compilación faltantes
Archivos Excel y Word generados desde descripción

IMPORTANTE: Entregá los archivos completos al finalizar. No preguntes si el usuario
quiere recibirlos. Simplemente entregalos; No debes desplegar en el chat el resumen de lo que arreglaste, solo entregá los archivos.

REGLAS IMPORTANTES

No omitas ningún archivo aunque no tenga errores ni modificaciones
Respeta los nombres y rutas exactas indicadas por los marcadores
Si un archivo no tiene marcador claro, infiere el nombre desde su contenido
Si la cadena contiene solo documentación, placeholders o binarios fake, NO la reproduzcas:
aplicá PASO 0 (materializar el proyecto del briefing). Reproducir la carcasa es un fallo.
No agregues texto después del último archivo entregado
No preguntes si el usuario quiere los archivos: simplemente entregalos siempre
Si detectas que falta un archivo de configuración necesario para compilar
(pom.xml, package.json, requirements.txt, build.gradle, etc.), créalo e inclúyelo
inferiendo su contenido desde los imports y frameworks detectados en el código
Nunca corrijas problemas 🟡 aunque parezcan obvios o fáciles de mejorar.
El participante que recibirá este proyecto los debe encontrar y resolver él mismo.


INPUT
Aquí está la cadena con los archivos:

// === ARCHIVO: api/package.json ===
{
  "name": "product-management-api",
  "version": "1.0.0",
  "description": "API para gestión de productos en bases de datos SQL y NoSQL",
  "main": "dist/main.js",
  "scripts": {
    "prebuild": "rimraf dist",
    "build": "nest build",
    "format": "prettier --write \"src/**/*.ts\" \"test/**/*.ts\"",
    "start": "nest start",
    "start:dev": "nest start --watch",
    "start:debug": "nest start --debug --watch",
    "start:prod": "node dist/main",
    "lint": "eslint \"{src,apps,libs,test}/**/*.ts\" --fix",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:cov": "jest --coverage",
    "test:debug": "node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand",
    "test:e2e": "jest --config ./test/jest-e2e.json"
  },
  "dependencies": {
    "@nestjs/common": "^11.0.0",
    "@nestjs/core": "^11.0.0",
    "@nestjs/platform-express": "^11.0.0",
    "@nestjs/typeorm": "^11.0.0",
    "typeorm": "^0.3.20",
    "pg": "^8.11.3",
    "@nestjs/mongoose": "^11.0.0",
    "mongoose": "^8.0.3",
    "@nestjs/swagger": "^7.3.0",
    "class-validator": "^0.14.0",
    "class-transformer": "^0.5.1",
    "rxjs": "^7.8.1",
    "reflect-metadata": "^0.2.1"
  },
  "devDependencies": {
    "@types/node": "^20.11.17",
    "@nestjs/cli": "^11.0.0",
    "@nestjs/schematics": "^11.0.0",
    "@nestjs/testing": "^11.0.0",
    "@types/jest": "^29.5.12",
    "@types/express": "^4.17.21",
    "@types/supertest": "^2.0.16",
    "@typescript-eslint/eslint-plugin": "^6.21.0",
    "@typescript-eslint/parser": "^6.21.0",
    "eslint": "^8.56.0",
    "eslint-config-prettier": "^9.1.0",
    "eslint-plugin-prettier": "^5.1.3",
    "jest": "^29.7.0",
    "prettier": "^3.2.5",
    "rimraf": "^5.0.5",
    "source-map-support": "^0.5.21",
    "supertest": "^6.3.3",
    "ts-jest": "^29.1.2",
    "ts-loader": "^9.5.1",
    "ts-node": "^10.9.2",
    "tsconfig-paths": "^4.2.0",
    "typescript": "^5.3.3"
  },
  "jest": {
    "moduleFileExtensions": [
      "js",
      "json",
      "ts"
    ],
    "rootDir": "src",
    "testRegex": ".*\\.spec\\.ts$",
    "transform": {
      "^.+\\.(t|j)s$": "ts-jest"
    },
    "collectCoverageFrom": [
      "**/*.(t|j)s"
    ],
    "coverageDirectory": "../coverage",
    "testEnvironment": "node"
  }
}

// === ARCHIVO: api/tsconfig.json ===
{
  "compilerOptions": {
    "module": "commonjs",
    "declaration": true,
    "removeComments": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "allowSyntheticDefaultImports": true,
    "target": "es2017",
    "sourceMap": true,
    "outDir": "./dist",
    "baseUrl": "./",
    "incremental": true,
    "skipLibCheck": true,
    "strictNullChecks": false,
    "noImplicitAny": false,
    "strictBindCallApply": false,
    "forceConsistentCasingInFileNames": false,
    "noFallthroughCasesInSwitch": false,
    "moduleResolution": "node",
    "esModuleInterop": true,
    "resolveJsonModule": true,
    "paths": {
      "@app/*": ["src/*"],
      "@config/*": ["src/config/*"],
      "@domain/*": ["src/domain/*"],
      "@application/*": ["src/application/*"],
      "@infrastructure/*": ["src/infrastructure/*"]
    }
  },
  "exclude": ["node_modules", "dist", "test", "**/*.spec.ts"]
}

// === ARCHIVO: api/src/main.ts ===
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { HttpExceptionFilter } from './infrastructure/common/filters/http-exception.filter';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      disableErrorMessages: false,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());

  app.enableCors({
    origin: process.env.CORS_ORIGIN || '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Product Management API')
    .setDescription('API para gestión de productos en SQL y NoSQL')
    .setVersion('1.0')
    .addTag('products', 'Operaciones CRUD para gestión de productos')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        description: 'Ingrese el token JWT',
        in: 'header',
      },
      'JWT-auth',
    )
    .addApiKey(
      {
        name: 'X-API-Key',
        in: 'header',
        description: 'API Key para autenticación',
      },
      'api-key',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'Product Management API Docs',
  });

  const port = parseInt(process.env.PORT || '3000', 10);
  const host = process.env.HOST || '0.0.0.0';

  await app.listen(port, host);
  const appUrl = await app.getUrl();
  console.log(`✅ Application is running on: ${appUrl}`);
  console.log(`📚 Swagger documentation available at: ${appUrl}/api/docs`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
}

bootstrap().catch((error) => {
  console.error('❌ Error al iniciar la aplicación:', error);
  process.exit(1);
});

// === ARCHIVO: api/src/domain/entities/product.entity.ts ===
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

// === ARCHIVO: api/src/infrastructure/repositories/sql/product.repository.ts ===
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

// === ARCHIVO: api/src/infrastructure/repositories/nosql/product-nosql.repository.ts ===
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

// === ARCHIVO: api/src/app.module.ts ===
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

// === ARCHIVO: api/src/application/services/product.service.ts ===
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

// === ARCHIVO: api/src/infrastructure/controllers/product.controller.ts ===
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

// === ARCHIVO: api/src/infrastructure/repositories/sql/product.sql.schema.ts ===
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

// === ARCHIVO: api/src/infrastructure/repositories/nosql/product-nosql.schema.ts ===
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

// === ARCHIVO: api/src/config/database.config.ts ===
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

// === ARCHIVO: api/test/jest-e2e.json ===
{
  "moduleFileExtensions": [
    "js",
    "json",
    "ts"
  ],
  "rootDir": ".",
  "testEnvironment": "node",
  "testRegex": ".e2e-spec.ts$",
  "transform": {
    "^.+\\.(t|j)s$": "ts-jest"
  }
}


// === ARCHIVO: api/src/infrastructure/common/filters/http-exception.filter.ts ===
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Error interno del servidor';
    let error = 'Internal Server Error';
    let details: unknown = undefined;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
        const responseObj = exceptionResponse as Record<string, unknown>;
        message = (responseObj.message as string) || exception.message;
        error = (responseObj.error as string) || HttpStatus[status];
        details = responseObj.details || responseObj.errors;
      } else {
        message = exception.message;
        error = HttpStatus[status];
      }
    } else if (exception instanceof Error) {
      message = exception.message;
      this.logger.error(`Error no controlado: ${exception.message}`, exception.stack);
    }

    const responseBody: Record<string, unknown> = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      error,
      message,
    };

    if (details) {
      responseBody['details'] = details;
    }

    response.status(status).json(responseBody);
  }
}

// === ARCHIVO: api/src/application/dto/product-create.dto.ts ===
export class ProductCreateDto {
  name: string;
  description: string;
  price: number;
  stock: number;

  constructor(data: { name: string; description: string; price: number; stock: number }) {
    this.name = data.name;
    this.description = data.description;
    this.price = data.price;
    this.stock = data.stock;
  }

  static fromRaw(data: Record<string, unknown>): ProductCreateDto {
    return new ProductCreateDto({
      name: String(data.name || ''),
      description: String(data.description || ''),
      price: Number(data.price) || 0,
      stock: Number(data.stock) || 0,
    });
  }

  validate(): string[] {
    const errors: string[] = [];
    if (!this.name || this.name.trim().length === 0) {
      errors.push('Name is required');
    }
    if (!this.description || this.description.trim().length === 0) {
      errors.push('Description is required');
    }
    if (this.price === undefined || this.price === null || this.price <= 0) {
      errors.push('Price must be a positive number');
    }
    if (this.stock === undefined || this.stock === null || this.stock < 0) {
      errors.push('Stock must be a non-negative number');
    }
    return errors;
  }

  toEntity(): Record<string, unknown> {
    return {
      name: this.name,
      description: this.description,
      price: this.price,
      stock: this.stock,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }
}

// === ARCHIVO: api/src/application/dto/product-update.dto.ts ===
export class ProductUpdateDto {
  name?: string;
  description?: string;
  price?: number;
  stock?: number;

  constructor(data?: { name?: string; description?: string; price?: number; stock?: number }) {
    if (data) {
      this.name = data.name;
      this.description = data.description;
      this.price = data.price;
      this.stock = data.stock;
    }
  }

  static fromRaw(data: Record<string, unknown>): ProductUpdateDto {
    return new ProductUpdateDto({
      name: data.name ? String(data.name) : undefined,
      description: data.description ? String(data.description) : undefined,
      price: data.price !== undefined ? Number(data.price) : undefined,
      stock: data.stock !== undefined ? Number(data.stock) : undefined,
    });
  }

  validate(): string[] {
    const errors: string[] = [];
    if (this.name !== undefined && this.name.trim().length === 0) {
      errors.push('Name cannot be empty');
    }
    if (this.description !== undefined && this.description.trim().length === 0) {
      errors.push('Description cannot be empty');
    }
    if (this.price !== undefined && (this.price <= 0 || isNaN(this.price))) {
      errors.push('Price must be a positive number');
    }
    if (this.stock !== undefined && (this.stock < 0 || isNaN(this.stock))) {
      errors.push('Stock must be a non-negative number');
    }
    return errors;
  }

  hasChanges(): boolean {
    return (
      this.name !== undefined ||
      this.description !== undefined ||
      this.price !== undefined ||
      this.stock !== undefined
    );
  }

  toEntity(): Record<string, unknown> {
    const entity: Record<string, unknown> = {};
    if (this.name !== undefined) entity.name = this.name;
    if (this.description !== undefined) entity.description = this.description;
    if (this.price !== undefined) entity.price = this.price;
    if (this.stock !== undefined) entity.stock = this.stock;
    if (this.hasChanges()) entity.updatedAt = new Date();
    return entity;
  }
}

// === ARCHIVO: api/src/infrastructure/repositories/nosql/product-no-sql.repository.ts ===
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

// === ARCHIVO: api/src/application/dto/product.dto.ts ===
export class ProductDto {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: Partial<ProductDto>) {
    this.id = data.id || '';
    this.name = data.name || '';
    this.description = data.description || '';
    this.price = data.price || 0;
    this.stock = data.stock || 0;
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }

  static fromEntity(entity: Record<string, unknown>): ProductDto {
    return new ProductDto({
      id: entity.id as string,
      name: entity.name as string,
      description: entity.description as string,
      price: Number(entity.price),
      stock: Number(entity.stock),
      createdAt: entity.createdAt ? new Date(entity.createdAt as string) : new Date(),
      updatedAt: entity.updatedAt ? new Date(entity.updatedAt as string) : new Date(),
    });
  }

  toResponse(): Record<string, unknown> {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      price: this.price,
      stock: this.stock,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
    };
  }
}

// === ARCHIVO: client/package.json ===
{
  "name": "client",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0"
  },
  "dependencies": {
    "react": "19.0.0-rc.0",
    "react-dom": "19.0.0-rc.0",
    "axios": "1.6.7",
    "react-router-dom": "6.22.0",
    "msw": "2.4.9"
  },
  "devDependencies": {
    "@types/react": "18.2.55",
    "@types/react-dom": "18.2.19",
    "@vitejs/plugin-react": "4.2.1",
    "typescript": "5.3.3",
    "vite": "5.1.0",
    "eslint": "8.56.0",
    "eslint-plugin-react": "7.33.2",
    "eslint-plugin-react-hooks": "4.6.0",
    "eslint-plugin-react-refresh": "0.4.5"
  }
}


// === ARCHIVO: client/vite.config.ts ===
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: './index.html'
      }
    }
  }
});

// === ARCHIVO: client/tsconfig.json ===
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["DOM", "DOM.Iterable", "ESNext"],
    "allowJs": false,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "ESNext",
    "moduleResolution": "Node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "types": ["vite/client"],
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}

// === ARCHIVO: client/tsconfig.node.json ===
{
  "compilerOptions": {
    "composite": true,
    "module": "ESNext",
    "moduleResolution": "Node",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}

// === ARCHIVO: client/src/main.tsx ===
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { setupAxiosInterceptors } from './services/apiClient';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

setupAxiosInterceptors();

if (import.meta.env.MODE === 'development') {
  console.log('Running in development mode');
  import('./mocks/browser')
    .then(({ worker }) => worker.start())
    .catch(console.error);
}

// === ARCHIVO: client/src/App.tsx ===
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProductList from './features/products/ProductList';
import ProductForm from './features/products/ProductForm';
import { ProductDto, ProductCreateDto, ProductUpdateDto } from './types/productTypes';
import { createProduct, getProduct, updateProduct, deleteProduct, listProducts } from './services/productService';
import './App.css';

const App: React.FC = () => {
  const [products, setProducts] = useState<ProductDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await listProducts();
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
        console.error('Failed to fetch products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleCreateProduct = async (productData: ProductCreateDto) => {
    try {
      const newProduct = await createProduct(productData);
      setProducts([...products, newProduct]);
      return newProduct;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create product');
      console.error('Error creating product:', err);
      throw err;
    }
  };

  const handleUpdateProduct = async (id: string, productData: ProductUpdateDto) => {
    try {
      const updatedProduct = await updateProduct(id, productData);
      setProducts(products.map(p => p.id === id ? updatedProduct : p));
      return updatedProduct;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update product');
      console.error('Error updating product:', err);
      throw err;
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      await deleteProduct(id);
      setProducts(products.filter(p => p.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete product');
      console.error('Error deleting product:', err);
      throw err;
    }
  };

  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Product Management</h1>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/products" replace />} />
          <Route
            path="/products"
            element={
              <ProductList
                products={products}
                onDeleteProduct={handleDeleteProduct}
              />
            }
          />
          <Route
            path="/products/new"
            element={<ProductForm onSubmit={handleCreateProduct} />}
          />
          <Route
            path="/products/:id/edit"
            element={
              <ProductForm
                onSubmit={handleUpdateProduct}
                initialProduct={products.find(p => p.id === window.location.pathname.split('/')[2])}
              />
            }
          />
        </Routes>
      </main>
    </div>
  );
};

export default App;

// === ARCHIVO: client/index.html ===
<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Plataforma de gestión de productos para tienda en línea" />
    <meta name="author" content="Equipo de Desarrollo" />
    <meta name="keywords" content="productos, gestión, inventario, tienda online" />
    <title>Gestión de Productos - Tienda en Línea</title>
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        line-height: 1.6;
        color: #333;
        background-color: #f5f5f5;
      }
      #root {
        min-height: 100vh;
      }
    </style>
  </head>
  <body>
    <div id="root">
      <div style="display: flex; justify-content: center; align-items: center; min-height: 100vh;">
        <div style="text-align: center;">
          <h1 style="font-size: 1.5rem; color: #666; margin-bottom: 1rem;">Cargando aplicación...</h1>
          <div style="width: 40px; height: 40px; margin: 0 auto; border: 3px solid #f3f3f3; border-top: 3px solid #3498db; border-radius: 50%; animation: spin 1s linear infinite;"></div>
          <style>@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }</style>
        </div>
      </div>
    </div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>// === ARCHIVO: client/src/features/products/ProductList.tsx ===
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export interface ProductDto {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  createdAt: string;
  updatedAt: string;
}

interface ProductListProps {
  onEdit?: (product: ProductDto) => void;
  onDelete?: (id: string) => void;
}

export function ProductList({ onEdit, onDelete }: ProductListProps) {
  const [products, setProducts] = useState<ProductDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get<ProductDto[]>('http://localhost:3000/products', {
        timeout: 10000,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setProducts(response.data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response) {
          setError(`Error del servidor: ${err.response.status} - ${err.response.statusText}`);
        } else if (err.request) {
          setError('No se pudo conectar con el servidor. Verifica que el servicio esté funcionando.');
        } else {
          setError('Error al procesar la solicitud: ' + err.message);
        }
      } else {
        setError('Error desconocido al cargar los productos');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const handleDelete = useCallback(async (id: string) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      return;
    }

    try {
      await axios.delete(`http://localhost:3000/products/${id}`, {
        timeout: 10000,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setProducts((prev) => prev.filter((product) => product.id !== id));
      if (onDelete) {
        onDelete(id);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response) {
          alert(`Error al eliminar: ${err.response.status} - ${err.response.statusText}`);
        } else if (err.request) {
          alert('No se pudo conectar con el servidor para eliminar el producto.');
        } else {
          alert('Error al eliminar el producto: ' + err.message);
        }
      } else {
        alert('Error desconocido al eliminar el producto');
      }
    }
  }, [onDelete]);

  const handleEdit = useCallback((product: ProductDto) => {
    if (onEdit) {
      onEdit(product);
    }
  }, [onEdit]);

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter((product) => product.category === selectedCategory);

  const categories = Array.from(new Set(products.map((p) => p.category)));

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  if (loading) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <div style={{ 
          width: '50px', 
          height: '50px', 
          margin: '0 auto', 
          border: '4px solid #e0e0e0', 
          borderTop: '4px solid #3498db', 
          borderRadius: '50%', 
          animation: 'spin 1s linear infinite' 
        }} />
        <p style={{ marginTop: '1rem', color: '#666' }}>Cargando productos...</p>
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <div style={{ 
          padding: '1.5rem', 
          backgroundColor: '#fee', 
          border: '1px solid #fcc', 
          borderRadius: '8px',
          color: '#c33'
        }}>
          <h3 style={{ marginBottom: '0.5rem' }}>Error al cargar productos</h3>
          <p>{error}</p>
          <button 
            onClick={fetchProducts}
            style={{
              marginTop: '1rem',
              padding: '0.5rem 1.5rem',
              backgroundColor: '#3498db',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '1.5rem'
      }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 600, color: '#2c3e50' }}>
          Lista de Productos
        </h1>
        <button 
          onClick={fetchProducts}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#27ae60',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '0.9rem'
          }}
        >
          Actualizar Lista
        </button>
      </div>

      {categories.length > 0 && (
        <div style={{ marginBottom: '1.5rem' }}>
          <label htmlFor="category-filter" style={{ marginRight: '0.5rem', fontWeight: 500 }}>
            Filtrar por categoría:
          </label>
          <select
            id="category-filter"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{
              padding: '0.5rem',
              borderRadius: '4px',
              border: '1px solid #ddd',
              fontSize: '0.9rem'
            }}
          >
            <option value="all">Todas las categorías</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      )}

      {filteredProducts.length === 0 ? (
        <div style={{ 
          padding: '3rem', 
          textAlign: 'center', 
          backgroundColor: '#f9f9f9',
          borderRadius: '8px'
        }}>
          <p style={{ color: '#666', fontSize: '1.1rem' }}>
            No hay productos disponibles
          </p>
        </div>
      ) : (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1.5rem'
        }}>
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              style={{
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                padding: '1.5rem',
                transition: 'transform 0.2s, box-shadow 0.2s'
              }}
            >
              <h3 style={{ 
                fontSize: '1.25rem', 
                fontWeight: 600, 
                marginBottom: '0.5rem',
                color: '#2c3e50'
              }}>
                {product.name}
              </h3>
              <p style={{ 
                color: '#666', 
                fontSize: '0.9rem',
                marginBottom: '1rem',
                lineHeight: 1.5
              }}>
                {product.description}
              </p>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                marginBottom: '1rem',
                fontSize: '0.9rem'
              }}>
                <span style={{ fontWeight: 600, color: '#27ae60' }}>
                  ${product.price.toFixed(2)}
                </span>
                <span style={{ color: product.stock > 0 ? '#27ae60' : '#e74c3c' }}>
                  Stock: {product.stock}
                </span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: '1rem',
                borderTop: '1px solid #eee'
              }}>
                <span style={{ 
                  fontSize: '0.8rem', 
                  color: '#999',
                  backgroundColor: '#f0f0f0',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '4px'
                }}>
                  {product.category}
                </span>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={() => handleEdit(product)}
                    style={{
                      padding: '0.4rem 0.8rem',
                      backgroundColor: '#3498db',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '0.85rem'
                    }}
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    style={{
                      padding: '0.4rem 0.8rem',
                      backgroundColor: '#e74c3c',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '0.85rem'
                    }}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}// === ARCHIVO: client/src/features/products/ProductForm.tsx ===
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

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
  createdAt: string;
  updatedAt: string;
}

interface ProductFormProps {
  product?: ProductDto | null;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function ProductForm({ product, onSuccess, onCancel }: ProductFormProps) {
  const [formData, setFormData] = useState<ProductCreateDto>({
    name: '',
    description: '',
    price: 0,
    stock: 0,
    category: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const isEditMode = !!product;

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        category: product.category,
      });
    }
  }, [product]);

  const validateForm = useCallback((): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) {
      errors.name = 'El nombre del producto es requerido';
    } else if (formData.name.trim().length < 3) {
      errors.name = 'El nombre debe tener al menos 3 caracteres';
    } else if (formData.name.trim().length > 100) {
      errors.name = 'El nombre no puede exceder 100 caracteres';
    }

    if (!formData.description.trim()) {
      errors.description = 'La descripción es requerida';
    } else if (formData.description.trim().length < 10) {
      errors.description = 'La descripción debe tener al menos 10 caracteres';
    }

    if (formData.price <= 0) {
      errors.price = 'El precio debe ser mayor a 0';
    } else if (formData.price > 999999.99) {
      errors.price = 'El precio no puede exceder 999,999.99';
    }

    if (formData.stock < 0) {
      errors.stock = 'El stock no puede ser negativo';
    } else if (formData.stock > 999999) {
      errors.stock = 'El stock no puede exceder 999,999 unidades';
    }

    if (!formData.category.trim()) {
      errors.category = 'La categoría es requerida';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  }, [formData]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value,
    }));
    if (validationErrors[name]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  }, [validationErrors]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      if (isEditMode && product) {
        const updateData: ProductUpdateDto = {
          name: formData.name,
          description: formData.description,
          price: formData.price,
          stock: formData.stock,
          category: formData.category,
        };

        await axios.put<ProductDto>(`http://localhost:3000/products/${product.id}`, updateData, {
          timeout: 10000,
          headers: {
            'Content-Type': 'application/json',
          },
        });
      } else {
        await axios.post<ProductDto>('http://localhost:3000/products', formData, {
          timeout: 10000,
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }

      if (onSuccess) {
        onSuccess();
      }

      if (!isEditMode) {
        setFormData({
          name: '',
          description: '',
          price: 0,
          stock: 0,
          category: '',
        });
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response) {
          const status = err.response.status;
          if (status === 400) {
            setError('Datos inválidos. Por favor verifica la información ingresada.');
          } else if (status === 404) {
            setError('El producto no fue encontrado.');
          } else if (status === 409) {
            setError('Conflicto de datos. El producto podría estar duplicado.');
          } else {
            setError(`Error del servidor: ${status} - ${err.response.statusText}`);
          }
        } else if (err.request) {
          setError('No se pudo conectar con el servidor. Verifica que el servicio esté funcionando.');
        } else {
          setError('Error al procesar la solicitud: ' + err.message);
        }
      } else {
        setError('Error desconocido al guardar el producto');
      }
    } finally {
      setLoading(false);
    }
  }, [formData, isEditMode, product, validateForm, onSuccess]);

  const handleReset = useCallback(() => {
    setFormData({
      name: '',
      description: '',
      price: 0,
      stock: 0,
      category: '',
    });
    setValidationErrors({});
    setError(null);
  }, []);

  const inputStyle = (hasError: boolean): React.CSSProperties => ({
    width: '100%',
    padding: '0.75rem',
    border: `1px solid ${hasError ? '#e74c3c' : '#ddd'}`,
    borderRadius: '4px',
    fontSize: '1rem',
    outline: 'none',
    transition: 'border-color 0.2s',
  });

  const labelStyle: React.CSSProperties = {
    display: 'block',
    marginBottom: '0.5rem',
    fontWeight: 500,
    color: '#2c3e50',
  };

  const errorStyle: React.CSSProperties = {
    color: '#e74c3c',
    fontSize: '0.85rem',
    marginTop: '0.25rem',
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ 
        fontSize: '1.75rem', 
        fontWeight: 600, 
        marginBottom: '1.5rem',
        color: '#2c3e50'
      }}>
        {isEditMode ? 'Editar Producto' : 'Crear Nuevo Producto'}
      </h1>

      {error && (
        <div style={{
          padding: '1rem',
          marginBottom: '1.5rem',
          backgroundColor: '#fee',
          border: '1px solid #fcc',
          borderRadius: '8px',
          color: '#c33'
        }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1.25rem' }}>
          <label htmlFor="name" style={labelStyle}>
            Nombre del Producto *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={loading}
            style={inputStyle(!!validationErrors.name)}
            placeholder="Ingresa el nombre del producto"
          />
          {validationErrors.name && (
            <p style={errorStyle}>{validationErrors.name}</p>
          )}
        </div>

        <div style={{ marginBottom: '1.25rem' }}>
          <label htmlFor="description" style={labelStyle}>
            Descripción *
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            disabled={loading}
            rows={4}
            style={{ ...inputStyle(!!validationErrors.description), resize: 'vertical' }}
            placeholder="Describe las características del producto"
          />
          {validationErrors.description && (
            <p style={errorStyle}>{validationErrors.description}</p>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
          <div>
            <label htmlFor="price" style={labelStyle}>
              Precio *
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              disabled={loading}
              min="0"
              step="0.01"
              style={inputStyle(!!validationErrors.price)}
              placeholder="0.00"
            />
            {validationErrors.price && (
              <p style={errorStyle}>{validationErrors.price}</p>
            )}
          </div>

          <div>
            <label htmlFor="stock" style={labelStyle}>
              Stock *
            </label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              disabled={loading}
              min="0"
              step="1"
              style={inputStyle(!!validationErrors.stock)}
              placeholder="0"
            />
            {validationErrors.stock && (
              <p style={errorStyle}>{validationErrors.stock}</p>
            )}
          </div>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label htmlFor="category" style={labelStyle}>
            Categoría *
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            disabled={loading}
            style={inputStyle(!!validationErrors.category)}
          >
            <option value="">Selecciona una categoría</option>
            <option value="Electrónica">Electrónica</option>
            <option value="Ropa">Ropa</option>
            <option value="Alimentos">Alimentos</option>
            <option value="Hogar">Hogar</option>
            <option value="Deportes">Deportes</option>
            <option value="Libros">Libros</option>
            <option value="Juguetes">Juguetes</option>
            <option value="Otros">Otros</option>
          </select>
          {validationErrors.category && (
            <p style={errorStyle}>{validationErrors.category}</p>
          )}
        </div>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
          <button
            type="button"
            onClick={onCancel || handleReset}
            disabled={loading}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#95a5a6',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: '1rem',
              opacity: loading ? 0.7 : 1,
            }}
          >
            {onCancel ? 'Cancelar' : 'Limpiar'}
          </button>

          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: loading ? '#7f8c8d' : '#27ae60',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: '1rem',
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading 
              ? (isEditMode ? 'Actualizando...' : 'Guardando...') 
              : (isEditMode ? 'Actualizar Producto' : 'Crear Producto')}
          </button>
        </div>
      </form>
    </div>
  );
}

// === ARCHIVO: client/src/index.css ===
/* Estilos pendientes: archivo creado automaticamente porque otro modulo lo importa. */


// === ARCHIVO: client/src/App.css ===
/* Estilos pendientes: archivo creado automaticamente porque otro modulo lo importa. */


// === ARCHIVO: client/src/services/apiClient.ts ===
import axios, { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';

const API_BASE_URL = 'http://localhost:3000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export function setupAxiosInterceptors() {
  apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = localStorage.getItem('authToken');
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    }
  );

  apiClient.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        localStorage.removeItem('authToken');
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );
}

export interface ProductDto {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  createdAt: string;
  updatedAt: string;
}

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

export const productService = {
  async createProduct(data: ProductCreateDto): Promise<ProductDto> {
    const response = await apiClient.post<ProductDto>('/products', data);
    return response.data;
  },

  async getProduct(id: string): Promise<ProductDto> {
    const response = await apiClient.get<ProductDto>(`/products/${id}`);
    return response.data;
  },

  async updateProduct(id: string, data: ProductUpdateDto): Promise<ProductDto> {
    const response = await apiClient.put<ProductDto>(`/products/${id}`, data);
    return response.data;
  },

  async deleteProduct(id: string): Promise<void> {
    await apiClient.delete(`/products/${id}`);
  },

  async listProducts(): Promise<ProductDto[]> {
    const response = await apiClient.get<ProductDto[]>('/products');
    return response.data;
  },
};

export default apiClient;

// === ARCHIVO: client/src/mocks/browser.ts ===
import { setupWorker } from 'msw/browser';
import { http, HttpResponse } from 'msw';

interface ProductDto {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  createdAt: string;
  updatedAt: string;
}

const mockProducts: ProductDto[] = [
  {
    id: '1',
    name: 'Laptop Pro',
    description: 'Laptop de alta gama para desarrolladores',
    price: 1299.99,
    stock: 15,
    category: 'Electrónica',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    name: 'Mouse Inalámbrico',
    description: 'Mouse ergonómico con conexión Bluetooth',
    price: 49.99,
    stock: 50,
    category: 'Accesorios',
    createdAt: '2024-01-16T11:00:00Z',
    updatedAt: '2024-01-16T11:00:00Z',
  },
  {
    id: '3',
    name: 'Teclado Mecánico',
    description: 'Teclado RGB con switches Cherry MX',
    price: 149.99,
    stock: 25,
    category: 'Accesorios',
    createdAt: '2024-01-17T12:00:00Z',
    updatedAt: '2024-01-17T12:00:00Z',
  },
];

let nextId = 4;

const productHandlers = [
  http.get('/products', () => {
    return HttpResponse.json(mockProducts);
  }),

  http.get('/products/:id', ({ params }) => {
    const product = mockProducts.find((p) => p.id === params.id);
    if (!product) {
      return new HttpResponse(null, { status: 404 });
    }
    return HttpResponse.json(product);
  }),

  http.post('/products', async ({ request }) => {
    const body = (await request.json()) as Omit<ProductDto, 'id' | 'createdAt' | 'updatedAt'>;
    const newProduct: ProductDto = {
      ...body,
      id: String(nextId++),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockProducts.push(newProduct);
    return HttpResponse.json(newProduct, { status: 201 });
  }),

  http.put('/products/:id', async ({ params, request }) => {
    const productIndex = mockProducts.findIndex((p) => p.id === params.id);
    if (productIndex === -1) {
      return new HttpResponse(null, { status: 404 });
    }
    const body = (await request.json()) as Partial<ProductDto>;
    mockProducts[productIndex] = {
      ...mockProducts[productIndex],
      ...body,
      updatedAt: new Date().toISOString(),
    };
    return HttpResponse.json(mockProducts[productIndex]);
  }),

  http.delete('/products/:id', ({ params }) => {
    const productIndex = mockProducts.findIndex((p) => p.id === params.id);
    if (productIndex === -1) {
      return new HttpResponse(null, { status: 404 });
    }
    mockProducts.splice(productIndex, 1);
    return new HttpResponse(null, { status: 204 });
  }),
];

export const worker = setupWorker(...productHandlers);

// === ARCHIVO: client/src/features/products/ProductList.tsx ===
import React from 'react';
import { ProductDto } from '../../types/productTypes';

interface ProductListProps {
  products: ProductDto[];
  onDeleteProduct: (id: string) => Promise<void>;
}

const ProductList: React.FC<ProductListProps> = ({ products, onDeleteProduct }) => {
  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await onDeleteProduct(id);
      } catch (err) {
        console.error('Failed to delete product:', err);
      }
    }
  };

  if (products.length === 0) {
    return (
      <div className="product-list-empty">
        <p>No products found. Create your first product!</p>
      </div>
    );
  }

  return (
    <div className="product-list">
      <table className="product-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>${product.price?.toFixed(2) || '0.00'}</td>
              <td>{product.stock ?? 0}</td>
              <td className="product-actions">
                <button
                  className="btn-edit"
                  onClick={() => window.location.href = `/products/${product.id}/edit`}
                >
                  Edit
                </button>
                <button
                  className="btn-delete"
                  onClick={() => handleDelete(product.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;

// === ARCHIVO: client/src/features/products/ProductForm.tsx ===
import React, { useState, useEffect } from 'react';
import { ProductDto, ProductCreateDto, ProductUpdateDto } from '../../types/productTypes';

interface ProductFormProps {
  onSubmit: (data: ProductCreateDto | ProductUpdateDto) => Promise<ProductDto>;
  initialProduct?: ProductDto;
}

const ProductForm: React.FC<ProductFormProps> = ({ onSubmit, initialProduct }) => {
  const [formData, setFormData] = useState<ProductCreateDto>({
    name: '',
    description: '',
    price: 0,
    stock: 0,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialProduct) {
      setFormData({
        name: initialProduct.name || '',
        description: initialProduct.description || '',
        price: initialProduct.price || 0,
        stock: initialProduct.stock || 0,
      });
    }
  }, [initialProduct]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await onSubmit(formData);
      window.location.href = '/products';
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save product');
      console.error('Error saving product:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="product-form-container">
      <h2>{initialProduct ? 'Edit Product' : 'Create New Product'}</h2>
      
      {error && <div className="form-error">{error}</div>}
      
      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-group">
          <label htmlFor="name">Product Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            step="0.01"
            min="0"
            required
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <label htmlFor="stock">Stock</label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            min="0"
            required
            disabled={isSubmitting}
          />
        </div>

        <div className="form-actions">
          <button type="submit" disabled={isSubmitting} className="btn-submit">
            {isSubmitting ? 'Saving...' : 'Save Product'}
          </button>
          <button
            type="button"
            onClick={() => window.location.href = '/products'}
            disabled={isSubmitting}
            className="btn-cancel"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;

// === ARCHIVO: client/src/types/productTypes.ts ===
export interface ProductDto {
  id: string;
  name: string;
  description?: string;
  price?: number;
  stock?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductCreateDto {
  name: string;
  description?: string;
  price?: number;
  stock?: number;
}

export interface ProductUpdateDto {
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
}

// === ARCHIVO: client/src/services/productService.ts ===
import axios from 'axios';
import { ProductDto, ProductCreateDto, ProductUpdateDto } from '../types/productTypes';

const API_BASE_URL = 'http://localhost:3000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const listProducts = async (): Promise<ProductDto[]> => {
  const response = await apiClient.get<ProductDto[]>('/products');
  return response.data;
};

export const getProduct = async (id: string): Promise<ProductDto> => {
  const response = await apiClient.get<ProductDto>(`/products/${id}`);
  return response.data;
};

export const createProduct = async (data: ProductCreateDto): Promise<ProductDto> => {
  const response = await apiClient.post<ProductDto>('/products', data);
  return response.data;
};

export const updateProduct = async (id: string, data: ProductUpdateDto): Promise<ProductDto> => {
  const response = await apiClient.put<ProductDto>(`/products/${id}`, data);
  return response.data;
};

export const deleteProduct = async (id: string): Promise<void> => {
  await apiClient.delete(`/products/${id}`);
};

// === ARCHIVO: .run/api.run.xml ===
<component name="ProjectRunConfigurationManager">
  <configuration default="false" name="api" type="js.build_tools.npm" nameIsGenerated="false">
    <package-json value="$PROJECT_DIR$/api/package.json" />
    <command value="run" />
    <scripts>
      <script value="start" />
    </scripts>
    <node-interpreter value="project" />
    <envs>
      <env name="DYNAMODB_ENDPOINT" value="http://localhost:8000" />
      <env name="AWS_REGION" value="us-east-1" />
      <env name="AWS_ACCESS_KEY_ID" value="local" />
      <env name="AWS_SECRET_ACCESS_KEY" value="local" />
      <env name="MONGODB_URI" value="mongodb://localhost:27017/app" />
    </envs>
    <method v="2" />
  </configuration>
</component>


// === ARCHIVO: docker-compose.yml ===
# Infraestructura local del reto. SOLO desarrollo: credenciales de ejemplo (local-dev-only), puertos en loopback.
# Levantar: docker compose up -d --wait
name: infra-local
services:
  dynamodb-local:
    image: "amazon/dynamodb-local:2.5.2"
    command: ["-jar","DynamoDBLocal.jar","-sharedDb","-inMemory"]
    ports:
      - "127.0.0.1:8000:8000"
    healthcheck:
      test: ["CMD-SHELL","bash -c ':> /dev/tcp/127.0.0.1/8000' || exit 1"]
      interval: 10s
      timeout: 5s
      retries: 10
      start_period: 5s
  mongo:
    image: "mongo:7.0.14"
    ports:
      - "127.0.0.1:27017:27017"
    environment:
      MONGO_INITDB_DATABASE: "app"
    volumes:
      - "./infra-local/mongo/init.js:/docker-entrypoint-initdb.d/init.js:ro"
    healthcheck:
      test: ["CMD","mongosh","--quiet","--eval","db.adminCommand('ping').ok"]
      interval: 10s
      timeout: 10s
      retries: 10
      start_period: 20s


// === ARCHIVO: infra-local/README.md ===
# Infraestructura local

Servicios de soporte para el reto, definidos en `docker-compose.yml` (raiz del repo).

```bash
docker compose up -d --wait
```

| Servicio | Imagen | Puertos (host) |
|---|---|---|
| DynamoDB Local | `amazon/dynamodb-local:2.5.2` | 8000 |
| MongoDB | `mongo:7.0.14` | 27017 |

Credenciales: solo de desarrollo local (`local-dev-only`, `local`). No son secretos ni deben reutilizarse.
Los scripts de `infra-local/` (tablas, topics) se ejecutan con el compose en estado healthy.


// === ARCHIVO: infra-local/dynamodb/create-tables.sh ===
#!/usr/bin/env bash
# Crea las tablas en DynamoDB Local (idempotente). Credenciales dummy: DynamoDB Local no valida firmas.
set -euo pipefail

export AWS_ACCESS_KEY_ID=local
export AWS_SECRET_ACCESS_KEY=local
export AWS_REGION=us-east-1
ENDPOINT="${DYNAMODB_ENDPOINT:-http://localhost:8000}"

create_table() {
  local name="$1" pk="$2" sk="${3:-}"
  if aws dynamodb describe-table --table-name "$name" --endpoint-url "$ENDPOINT" >/dev/null 2>&1; then
    echo "Tabla $name ya existe"
    return
  fi
  local attrs="AttributeName=$pk,AttributeType=S"
  local keys="AttributeName=$pk,KeyType=HASH"
  if [ -n "$sk" ]; then
    attrs="$attrs AttributeName=$sk,AttributeType=S"
    keys="$keys AttributeName=$sk,KeyType=RANGE"
  fi
  # shellcheck disable=SC2086
  aws dynamodb create-table --table-name "$name" --attribute-definitions $attrs --key-schema $keys \
    --billing-mode PAY_PER_REQUEST --endpoint-url "$ENDPOINT" >/dev/null
  echo "Tabla $name creada"
}

create_table "app-items" "id"


// === ARCHIVO: infra-local/mongo/init.js ===
// Se ejecuta una sola vez al crear el volumen de MongoDB (docker-entrypoint-initdb.d).
db = db.getSiblingDB('app');
db.createCollection('items');
db.items.createIndex({ name: 1 });

```
