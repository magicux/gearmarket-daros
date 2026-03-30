# GearMarket Server

## Requisitos

- Node.js 18+
- PostgreSQL 14+
- npm

## Instalación

```bash
cd server
npm install
cp .env.example .env
```

## Base de datos

Crear la base `gearmarket` y ejecutar:

1. `docs/base-datos/01_schema.sql`
2. `docs/base-datos/02_seed.sql`

## Variables de entorno

Revisar `.env.example`.

## Ejecución

```bash
npm run dev
```

## Tests

```bash
npm test
```

## Rutas principales

- `/api/v1/auth`
- `/api/v1/publications`
- `/api/v1/favorites`
- `/api/v1/messages`
- `/api/v1/profile`

## Estructura

```bash
.
├── src
│   ├── server.js           # PUNTO DE ENTRADA: Entrada de la app.
│   ├── app.js              # CONFIGURACIÓN: Express, middlewares globales y declaración de rutas.
│   ├── config              # AJUSTES: Conexión a la Dase de Datos
│   ├── controllers         # LÓGICA DE CONTROL: Recibe req, llama al modelo y envía res.
│   ├── middlewares         # FILTROS: Validaciones de datos, autenticación (JWT) y manejo de errores.
│   ├── models              # CAPA DE DATOS: Consultas SQL y lógica de interacción con la DB.
│   ├── routes              # DEFINICIÓN DE RUTAS: Mapeo de endpoints hacia controladores.
│   └── utils               # HELPERS: Funciones reutilizables.
├── tests                   # CAPA DE PRUEBAS: Tests automatizados
└── package.json            # Configuración del proyecto, scripts y dependencias.
```
