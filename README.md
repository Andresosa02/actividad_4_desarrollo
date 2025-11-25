# API REST - Actividad 4

API REST desarrollada con Node.js y Express para gestionar registros de contactos.

## 🚀 Instalación

```bash
# Instalar dependencias
npm install

# Iniciar servidor
npm start

# Modo desarrollo (auto-reload)
npm run dev
```

## 📋 Endpoints

### Base URL: `http://localhost:3000`

| Método | Endpoint             | Descripción                  |
| ------ | -------------------- | ---------------------------- |
| GET    | `/api/registros`     | Obtener todos los registros  |
| GET    | `/api/registros/:id` | Obtener un registro por ID   |
| POST   | `/api/registros`     | Crear nuevo registro         |
| PUT    | `/api/registros/:id` | Actualizar registro          |
| DELETE | `/api/registros/:id` | Eliminar registro            |
| DELETE | `/api/registros`     | Eliminar todos los registros |

## 📝 Formato de Datos

### Crear/Actualizar Registro

```json
{
  "nombre": "Juan Pérez",
  "email": "juan@example.com",
  "telefono": "1234567890"
}
```

### Respuesta Exitosa

```json
{
  "success": true,
  "message": "Registro creado exitosamente",
  "data": {
    "id": 1,
    "nombre": "Juan Pérez",
    "email": "juan@example.com",
    "telefono": "1234567890",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

## 🔧 Tecnologías

- Node.js
- Express.js
- CORS
- Body-parser

## 💾 Almacenamiento

Los datos se almacenan en memoria (arreglo). Los datos se pierden al reiniciar el servidor.
