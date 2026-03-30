# Resumen de cambios respecto de `main`

## Backend
- Se reemplazó el backend base de `health` solamente por una API REST modular.
- Se agregaron carpetas y archivos reales en `config`, `controllers`, `models`, `routes` y `middlewares`.
- Se incorporó `pg`, JWT, CORS, validación de campos y middleware Bearer.
- Se agregaron pruebas con `jest` y `supertest`.

## Frontend
- `client/src/services/api.js` ya no usa fallback automático a mocks en autenticación y publicaciones.
- `AppContext` quedó conectado a los endpoints reales para publicaciones, favoritos y perfil.
- Se ajustaron páginas privadas para refrescar desde backend y respetar propiedad de la publicación.
- Se agregó `.env.example` en `client/`.

## Documentación y entregables
- Scripts SQL separados en `01_schema.sql` y `02_seed.sql`.
- OpenAPI y contratos REST actualizados a Hito 3.
- Colección Thunder Client incluida.
- Checklist de cumplimiento del hito incluido.
