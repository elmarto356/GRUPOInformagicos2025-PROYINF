const express = require('express');
const UserController = require('../controladores/userControlador');

const router = express.Router();

// POST /api/users - Crear usuario
router.post('/users', UserController.createUser);

// GET /api/users/:id - Obtener usuario por ID
router.get('/users/:id', UserController.getUserById);

module.exports = router;