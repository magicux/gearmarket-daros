# Entregables del Hito 2

## Objetivo

Construir el frontend navegable de GearMarket respetando el diseño conceptual y el contrato de datos definidos en el Hito 1.

## Entregables incluidos

### 1. Código fuente del frontend

Se entrega una base completa para `client/` con:

- React Router para navegación.
- Context API para autenticación, publicaciones y favoritos.
- Hooks personalizados para encapsular lógica.
- Componentes reutilizables y renderización dinámica.
- Formularios de login, registro y creación de publicación.
- Servicios preparados para consumir la API REST del proyecto.

### 2. Documentación técnica

- `client/README.md`: instalación, rutas, estructura y flujo de demo.
- `docs/hitos-desarrollo/checklist-hito2.md`: checklist de cumplimiento.
- `docs/hitos-desarrollo/hito2-entregables.md`: resumen del alcance del hito.

## Decisiones de implementación

- Se utiliza **Bootstrap 5** para acelerar el desarrollo visual.
- Se mantiene la paleta del Hito 1: azul primario, verde secundario y naranja como acento.
- Se agregan **mock services** para permitir demo sin backend disponible.
- La capa `services/api.js` queda lista para apuntar a `VITE_API_URL`.

## Siguiente paso sugerido

En el siguiente hito, el equipo puede conectar las vistas existentes al backend real, persistir autenticación con JWT y agregar validaciones/transiciones de carga más detalladas.
