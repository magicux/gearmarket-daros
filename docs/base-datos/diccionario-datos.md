# 06A · Diccionario de datos

## Tabla `users`
| Campo | Tipo | Regla |
|---|---|---|
| id | SERIAL | PK |
| name | VARCHAR(100) | obligatorio |
| email | VARCHAR(120) | obligatorio, único |
| password | VARCHAR(255) | obligatorio |
| avatar | TEXT | opcional |
| created_at | TIMESTAMP | default current_timestamp |

## Tabla `publications`
| Campo | Tipo | Regla |
|---|---|---|
| id | SERIAL | PK |
| title | VARCHAR(150) | obligatorio |
| description | TEXT | obligatorio |
| price | NUMERIC(12,2) | obligatorio, >= 0 |
| image_url | TEXT | opcional |
| category | VARCHAR(80) | obligatorio |
| location | VARCHAR(120) | opcional |
| user_id | INT | FK → users.id |
| created_at | TIMESTAMP | default current_timestamp |

## Tabla `favorites`
| Campo | Tipo | Regla |
|---|---|---|
| id | SERIAL | PK |
| user_id | INT | FK → users.id |
| publication_id | INT | FK → publications.id |

## Tabla `messages`
| Campo | Tipo | Regla |
|---|---|---|
| id | SERIAL | PK |
| sender_id | INT | FK → users.id |
| receiver_id | INT | FK → users.id |
| publication_id | INT | FK → publications.id |
| message | TEXT | obligatorio |
| created_at | TIMESTAMP | default current_timestamp |


> Nota: el modelo `messages` ya permite respuestas entre comprador y vendedor sin crear nuevas tablas, porque cada respuesta se guarda como un nuevo registro con `sender_id`, `receiver_id` y `publication_id`. Para una versión más avanzada podrían agregarse `read_at`, `parent_message_id` o `conversation_id`, pero para Hito 3 no es obligatorio.
