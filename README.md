# Implementación de Operaciones CRUD en Bases de Datos

Debes construir operaciones básicas CRUD (Crear, Obtener, Actualizar, Eliminar) en una base de datos SQL y NoSQL utilizando DDL y DML. El dominio elegido es una plataforma de gestión de productos para una tienda en línea. Los actores involucrados son el Administrador de Productos, el Sistema de Inventario y el Cliente Final. Debes asegurarte de que las operaciones CRUD se realicen de manera eficiente y segura, considerando las restricciones y validaciones del dominio.

## Informacion General

| Campo | Valor |
|-------|-------|
| **Tema** | operaciones-crud-bases-de-datos-sql-nosql |
| **Nivel** | trainee-l2 |
| **Tipo** | practical |
| **Tiempo estimado** | 6 horas |

## Fases del Reto

### Fase 0: Configuración del Proyecto

**Objetivo:** Obtener el proyecto base funcional enviando el Código Base a un asistente de IA, que lo analizará, corregirá errores y entregará cada archivo con su ruta.

**Tiempo estimado:** 15-30 minutos

**Instrucciones:**

- Asegúrate de tener instalado para ejecutar el proyecto: Node.js 18+, npm, VS Code o similar.
- Copia todo el contenido del campo **Código Base** de este reto — incluyendo el texto de instrucciones que aparece al inicio.
- Abre un asistente de IA (Claude en claude.ai, ChatGPT o Gemini — se recomienda Claude), pega el contenido copiado en el chat y envíalo.
- El asistente analizará los archivos, corregirá errores y entregará cada archivo con su ruta. Guárdalos en la carpeta donde quieras trabajar, respetando las rutas.
- Ejecuta `npm install && npm run build` (o `npm start`). Si no hay errores, estás listo.

**Entregable:** El proyecto compila/arranca sin errores.

<details>
<summary>Pistas de conocimiento</summary>

- Copia el Código Base completo incluyendo el texto de instrucciones al inicio — esas instrucciones le indican al asistente exactamente qué hacer con los archivos.
- Si el asistente no entrega todos los archivos al terminar el análisis, escríbele: "entrégame todos los archivos con su ruta".
- Si el proyecto tiene errores al arrancar, comparte el mensaje de error con el mismo asistente para que lo corrija.

</details>

### Fase 1: Configuración del Entorno

**Objetivo:** Configurar el entorno de desarrollo para trabajar con bases de datos SQL y NoSQL.

**Tiempo estimado:** 1 hora

**Instrucciones:**

- Identificar y configurar las herramientas necesarias para interactuar con bases de datos SQL y NoSQL.
- Establecer conexiones seguras con las bases de datos.
- Verificar que las conexiones funcionan correctamente.

**Entregable:** Documento de configuración que detalla las herramientas y conexiones establecidas.

<details>
<summary>Pistas de conocimiento</summary>

- Utiliza IntelliJ IDEA Debugger para depurar y verificar las conexiones.

</details>

### Fase 2: Implementación de Operaciones CRUD en Base de Datos SQL

**Objetivo:** Implementar operaciones CRUD en una base de datos SQL.

**Tiempo estimado:** 3 horas

**Instrucciones:**

- Diseñar y crear las tablas necesarias en la base de datos SQL.
- Implementar las operaciones CRUD utilizando DDL y DML.
- Asegurar que las operaciones CRUD se realicen de manera eficiente y cumplan con las restricciones del dominio.

**Entregable:** Código fuente que implementa las operaciones CRUD en la base de datos SQL.

<details>
<summary>Pistas de conocimiento</summary>

- Utiliza IntelliJ IDEA Debugger para depurar y verificar el código.

</details>

### Fase 3: Implementación de Operaciones CRUD en Base de Datos NoSQL

**Objetivo:** Implementar operaciones CRUD en una base de datos NoSQL.

**Tiempo estimado:** 3 horas

**Instrucciones:**

- Diseñar y crear las colecciones necesarias en la base de datos NoSQL.
- Implementar las operaciones CRUD utilizando DDL y DML.
- Asegurar que las operaciones CRUD se realicen de manera eficiente y cumplan con las restricciones del dominio.

**Entregable:** Código fuente que implementa las operaciones CRUD en la base de datos NoSQL.

<details>
<summary>Pistas de conocimiento</summary>

- Utiliza IntelliJ IDEA Debugger para depurar y verificar el código.

</details>

## Dimensiones Evaluadas

- **queEs**: ¿Qué son las operaciones CRUD y cómo se implementan en bases de datos SQL y NoSQL?
- **paraQueSirve**: ¿Para qué sirven las operaciones CRUD en el contexto de una plataforma de gestión de productos?
- **comoSeUsa**: ¿Cómo se utilizan DDL y DML para implementar operaciones CRUD en bases de datos SQL y NoSQL?
- **erroresComunes**: ¿Cuáles son los errores comunes al implementar operaciones CRUD en bases de datos y cómo se pueden evitar?

## Criterios de Evaluacion

- Configuración correcta del entorno de desarrollo.
- Implementación eficiente y segura de operaciones CRUD en base de datos SQL.
- Implementación eficiente y segura de operaciones CRUD en base de datos NoSQL.
- Identificación y manejo de errores comunes en la implementación de operaciones CRUD.

## Como trabajar con un asistente de IA

Hay dos caminos, elegi uno:

- **AGENTS.md** (recomendado) — instrucciones nativas del repo. Abri esta carpeta con tu agente local (Claude Code, Cursor, Codex, Copilot, Gemini) y las carga solo. Sabe que archivos faltan y con que comando se verifica, y completa el scaffold escribiendo en disco.
- **PROMPT_MEJORA.md** — para copiar y pegar en un chat (claude.ai, ChatGPT) si no tenes un agente en el IDE. Declara lo mismo que AGENTS.md; los archivos que te devuelva el chat los guardas en esta carpeta respetando las rutas.

Ninguno de los dos resuelve las fases del reto: eso es tu trabajo.

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

## Verificacion

El proyecto esta listo para trabajar cuando este comando corre sin errores:

```bash
(cd api && npm install && npm run build) && (cd client && npm install && npm run build) && docker compose config -q
```

---

*Reto generado automaticamente por Challenge Generator - Pragma*
