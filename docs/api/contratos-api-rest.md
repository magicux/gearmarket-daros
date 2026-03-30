# Contratos API REST - GearMarket Hito 3

Base URL local: `http://localhost:3000/api/v1`

## Auth

### POST `/auth/register`
Registra un usuario y retorna JWT.

**Request**
```json
{
  "name": "Ana Torres",
  "email": "ana@test.cl",
  "password": "123456"
}
```

**Response 201**
```json
{
  "message": "Usuario registrado correctamente",
  "token": "jwt_token",
  "user": {
    "id": 1,
    "name": "Ana Torres",
    "email": "ana@test.cl",
    "avatar": null
  }
}
```

### POST `/auth/login`

**Request**
```json
{
  "email": "ana@test.cl",
  "password": "123456"
}
```

**Response 200**
```json
{
  "token": "jwt_token",
  "user": {
    "id": 1,
    "name": "Ana Torres",
    "email": "ana@test.cl",
    "avatar": null
  }
}
```

## Publications

### GET `/publications`
Lista pública de publicaciones.

### GET `/publications/:id`
Detalle público de una publicación.

### POST `/publications`
Ruta protegida por JWT.

**Headers**
```http
Authorization: Bearer jwt_token
```

**Request**
```json
{
  "title": "Raqueta Head Speed MP",
  "description": "Muy buen estado",
  "price": 110000,
  "image_url": "https://...",
  "category": "tenis",
  "location": "Concepción"
}
```

**Response 201**
```json
{
  "message": "Publicación creada correctamente",
  "publication_id": 10
}
```

### PUT `/publications/:id`
Ruta protegida. Solo el dueño puede editar.

### DELETE `/publications/:id`
Ruta protegida. Solo el dueño puede eliminar.

## Favorites

### GET `/favorites`
Ruta protegida. Lista favoritos del usuario autenticado.

### POST `/favorites`
Ruta protegida.

**Request**
```json
{
  "publication_id": 10
}
```

**Response 201**
```json
{
  "message": "Favorito agregado"
}
```

### DELETE `/favorites/:publicationId`
Ruta protegida.

## Messages

### POST `/messages`
Ruta protegida.

**Request**
```json
{
  "receiver_id": 2,
  "publication_id": 10,
  "message": "Hola, ¿sigue disponible?"
}
```

**Response 201**
```json
{
  "message": "Mensaje enviado correctamente"
}
```

## Profile

### GET `/profile`
Ruta protegida.

**Response 200**
```json
{
  "id": 1,
  "name": "Ana Torres",
  "email": "ana@test.cl",
  "avatar": null
}
```


## Mensajes

### GET /api/v1/messages
Devuelve la bandeja de mensajes recibidos por el usuario autenticado.

### POST /api/v1/messages
Permite enviar un mensaje al vendedor de una publicación.

Body:
```json
{
  "receiver_id": 2,
  "publication_id": 10,
  "message": "Hola, me interesa este producto"
}
```


## Mensajería y respuestas
- `GET /api/v1/messages`: devuelve conversaciones agrupadas por publicación y contraparte.
- `GET /api/v1/messages/thread/:publicationId/:userId`: devuelve el historial completo de una conversación.
- `POST /api/v1/messages`: sirve tanto para el primer contacto como para responder, porque cada respuesta se registra como un nuevo mensaje en la misma tabla `messages`.
