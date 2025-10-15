const express = require('express');
const AuthController = require('../controladores/authController');

const router = express.Router();

// POST /api/login - Iniciar sesión
router.post('/login', AuthController.login);

module.exports = router;
