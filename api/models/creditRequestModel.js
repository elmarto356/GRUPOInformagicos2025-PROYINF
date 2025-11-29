const { pool } = require('../db');

const CreditRequestModel = {
  // Crear una nueva solicitud de crédito
  async create(userId, amount, months) {
    const query = `
      INSERT INTO credit_requests (user_id, amount, months, status, created_at)
      VALUES ($1, $2, $3, 'pending', NOW())
      RETURNING id, user_id, amount, months, status, created_at
    `;
    const result = await pool.query(query, [userId, amount, months]);
    return result.rows[0];
  },

  // Obtener todas las solicitudes de un usuario
  async findByUserId(userId) {
    const query = `
      SELECT id, user_id, amount, months, status, created_at
      FROM credit_requests
      WHERE user_id = $1
      ORDER BY created_at DESC
    `;
    const result = await pool.query(query, [userId]);
    return result.rows;
  },

  // Obtener una solicitud por ID
  async findById(id) {
    const query = `
      SELECT id, user_id, amount, months, status, created_at
      FROM credit_requests
      WHERE id = $1
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  },

  // Actualizar el estado de una solicitud
  async updateStatus(id, status) {
    const query = `
      UPDATE credit_requests
      SET status = $1
      WHERE id = $2
      RETURNING id, user_id, amount, months, status, created_at
    `;
    const result = await pool.query(query, [status, id]);
    return result.rows[0];
  }
};

module.exports = CreditRequestModel;
