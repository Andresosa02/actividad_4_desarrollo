const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors()); // Permite peticiones desde Flutter
app.use(bodyParser.json()); // Parsea JSON en el body

// Base de datos en memoria (arreglo)
let registros = [];
let nextId = 1;

// ==================== RUTAS ====================

// GET /api/registros - Obtener todos los registros
app.get('/api/registros', (req, res) => {
  res.json({
    success: true,
    data: registros,
    count: registros.length
  });
});

// GET /api/registros/:id - Obtener un registro por ID
app.get('/api/registros/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const registro = registros.find(r => r.id === id);
  
  if (!registro) {
    return res.status(404).json({
      success: false,
      message: 'Registro no encontrado'
    });
  }
  
  res.json({
    success: true,
    data: registro
  });
});

// POST /api/registros - Crear un nuevo registro
app.post('/api/registros', (req, res) => {
  const { nombre, email, telefono } = req.body;
  
  // Validación
  if (!nombre || !email || !telefono) {
    return res.status(400).json({
      success: false,
      message: 'Todos los campos son requeridos (nombre, email, telefono)'
    });
  }
  
  // Validación de email básica
  if (!email.includes('@')) {
    return res.status(400).json({
      success: false,
      message: 'Email inválido'
    });
  }
  
  // Crear nuevo registro
  const nuevoRegistro = {
    id: nextId++,
    nombre,
    email,
    telefono,
    createdAt: new Date().toISOString()
  };
  
  registros.push(nuevoRegistro);
  
  res.status(201).json({
    success: true,
    message: 'Registro creado exitosamente',
    data: nuevoRegistro
  });
});

// PUT /api/registros/:id - Actualizar un registro
app.put('/api/registros/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { nombre, email, telefono } = req.body;
  
  const index = registros.findIndex(r => r.id === id);
  
  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: 'Registro no encontrado'
    });
  }
  
  // Validación
  if (!nombre || !email || !telefono) {
    return res.status(400).json({
      success: false,
      message: 'Todos los campos son requeridos (nombre, email, telefono)'
    });
  }
  
  if (!email.includes('@')) {
    return res.status(400).json({
      success: false,
      message: 'Email inválido'
    });
  }
  
  // Actualizar registro
  registros[index] = {
    ...registros[index],
    nombre,
    email,
    telefono,
    updatedAt: new Date().toISOString()
  };
  
  res.json({
    success: true,
    message: 'Registro actualizado exitosamente',
    data: registros[index]
  });
});

// DELETE /api/registros/:id - Eliminar un registro
app.delete('/api/registros/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = registros.findIndex(r => r.id === id);
  
  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: 'Registro no encontrado'
    });
  }
  
  const registroEliminado = registros.splice(index, 1)[0];
  
  res.json({
    success: true,
    message: 'Registro eliminado exitosamente',
    data: registroEliminado
  });
});

// DELETE /api/registros - Eliminar todos los registros
app.delete('/api/registros', (req, res) => {
  const count = registros.length;
  registros = [];
  
  res.json({
    success: true,
    message: `${count} registro(s) eliminado(s)`,
    count: count
  });
});

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({
    message: 'API de Registros - Actividad 3 Flutter',
    version: '1.0.0',
    endpoints: {
      'GET /api/registros': 'Obtener todos los registros',
      'GET /api/registros/:id': 'Obtener un registro por ID',
      'POST /api/registros': 'Crear nuevo registro',
      'PUT /api/registros/:id': 'Actualizar registro',
      'DELETE /api/registros/:id': 'Eliminar registro',
      'DELETE /api/registros': 'Eliminar todos los registros'
    }
  });
});

// Manejo de errores 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Ruta no encontrada'
  });
});

// Manejo de errores del servidor
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Error interno del servidor'
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📋 API disponible en http://localhost:${PORT}/api/registros`);
});
