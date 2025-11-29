const express = require('express');
const router = express.Router();
const CreditRequestController = require('../controladores/creditRequestController');

// POST: Crear una nueva solicitud de crédito
router.post('/credit-requests', CreditRequestController.createRequest);

// GET: Obtener todas las solicitudes de un usuario
router.get('/credit-requests/user/:userId', CreditRequestController.getUserRequests);

// GET: Obtener una solicitud específica por ID
router.get('/credit-requests/:id', CreditRequestController.getRequestById);

module.exports = router;
