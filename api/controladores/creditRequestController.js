const CreditRequestModel = require('../models/creditRequestModel');

const CreditRequestController = {
  // Crear una nueva solicitud de crédito
  async createRequest(req, res) {
    try {
      const { userId, amount, months } = req.body;

      // Validar campos requeridos
      if (!userId || !amount || !months) {
        return res.status(400).json({
          ok: false,
          error: 'userId, amount y months son requeridos'
        });
      }

      // Validar tipos de datos
      const amountNum = Number(amount);
      const monthsNum = Number(months);

      if (!Number.isFinite(amountNum) || !Number.isInteger(monthsNum)) {
        return res.status(400).json({
          ok: false,
          error: 'amount debe ser un número y months un entero'
        });
      }

      // Validar rangos (opcional, ya que quitaste los CHECKs de BD)
      if (amountNum < 100000 || amountNum > 50000000) {
        return res.status(400).json({
          ok: false,
          error: 'El monto debe estar entre $100.000 y $50.000.000'
        });
      }

      if (monthsNum < 6 || monthsNum > 60) {
        return res.status(400).json({
          ok: false,
          error: 'Las cuotas deben estar entre 6 y 60 meses'
        });
      }

      // Crear la solicitud usando el modelo
      const creditRequest = await CreditRequestModel.create(userId, amountNum, monthsNum);

      res.status(201).json({
        ok: true,
        msg: 'Solicitud de crédito creada exitosamente',
        data: creditRequest
      });

    } catch (error) {
      console.error('Error al crear solicitud de crédito:', error);
      res.status(500).json({
        ok: false,
        error: 'Error interno del servidor'
      });
    }
  },

  // Obtener todas las solicitudes de un usuario
  async getUserRequests(req, res) {
    try {
      const { userId } = req.params;

      if (!userId) {
        return res.status(400).json({
          ok: false,
          error: 'userId es requerido'
        });
      }

      const requests = await CreditRequestModel.findByUserId(userId);

      res.json({
        ok: true,
        data: requests
      });

    } catch (error) {
      console.error('Error al obtener solicitudes:', error);
      res.status(500).json({
        ok: false,
        error: 'Error interno del servidor'
      });
    }
  },

  // Obtener una solicitud específica por ID
  async getRequestById(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          ok: false,
          error: 'id es requerido'
        });
      }

      const request = await CreditRequestModel.findById(id);

      if (!request) {
        return res.status(404).json({
          ok: false,
          error: 'Solicitud no encontrada'
        });
      }

      res.json({
        ok: true,
        data: request
      });

    } catch (error) {
      console.error('Error al obtener solicitud:', error);
      res.status(500).json({
        ok: false,
        error: 'Error interno del servidor'
      });
    }
  }
};

module.exports = CreditRequestController;
