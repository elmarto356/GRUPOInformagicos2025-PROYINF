const { pool } = require('../db');

const AuthModel = {
  // Obtener usuario por email y contraseña para login
  async getUserForLogin(email) {
    const query = 'SELECT id, rut, name, lastname, email, password, created_at FROM users WHERE email = $1';
    const result = await pool.query(query, [email]);
    return result.rows[0];
  }
};

module.exports = AuthModel;
