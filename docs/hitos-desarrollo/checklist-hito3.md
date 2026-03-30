# Checklist de validación - GearMarket Hito 3

## Requerimientos obligatorios del hito

- [x] Se creó y estructuró el backend como proyecto npm.
- [x] Se usa `pg` para la comunicación con PostgreSQL.
- [x] Se implementó autenticación y autorización con JWT.
- [x] Se configuró `cors()` para orígenes cruzados.
- [x] Se agregaron middlewares para validar campos requeridos y token Bearer.
- [x] Se realizaron tests con `supertest` para más de 4 escenarios.

## Rutas implementadas

- [x] `GET /health`
- [x] `POST /api/v1/auth/register`
- [x] `POST /api/v1/auth/login`
- [x] `GET /api/v1/publications`
- [x] `GET /api/v1/publications/:id`
- [x] `POST /api/v1/publications`
- [x] `PUT /api/v1/publications/:id`
- [x] `DELETE /api/v1/publications/:id`
- [x] `GET /api/v1/favorites`
- [x] `POST /api/v1/favorites`
- [x] `DELETE /api/v1/favorites/:publicationId`
- [x] `POST /api/v1/messages`
- [x] `GET /api/v1/profile`

## Frontend revisado contra backend

- [x] `client/src/services/api.js` apunta al backend vía `VITE_API_URL`.
- [x] Se agregó interceptor Bearer con JWT.
- [x] Se eliminaron los fallbacks silenciosos a mock en login, registro y publicaciones.
- [x] `AppContext` sincroniza publicaciones y favoritos con la API REST.
- [x] Perfil privado consulta `/profile`.
- [x] Crear, editar y eliminar publicación invocan endpoints reales.

## Tests incluidos

Archivo: `server/tests/app.test.js`

- [x] `GET /health` -> 200
- [x] `POST /auth/register` -> 201
- [x] `POST /auth/login` credenciales inválidas -> 401
- [x] `GET /profile` sin token -> 401
- [x] `GET /publications` -> 200
- [x] `POST /publications` con token válido -> 201

## Entregables incluidos

- [x] Código backend completo en `server/`
- [x] Ajustes frontend en `client/`
- [x] Script `docs/base-datos/01_schema.sql`
- [x] Script `docs/base-datos/02_seed.sql`
- [x] Contrato `docs/api/contratos-api-rest.md`
- [x] OpenAPI `docs/api/openapi.yaml`
- [x] Colección Thunder Client `docs/api/thunder-client-gearmarket-hito3.json`
- [x] README de instalación y ejecución actualizado

- [x] Flujo funcional para contactar al vendedor desde el detalle de la publicación.
- [x] Endpoint `POST /api/v1/messages` integrado al frontend.
- [x] Bandeja básica de mensajes para usuarios autenticados.
