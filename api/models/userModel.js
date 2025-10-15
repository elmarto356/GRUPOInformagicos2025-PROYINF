const { pool } = require('../db');

const UserModel = {
  // crear un nuevo usuario
  async create(rut, name, lastname, email, password) {
    const query = `
      INSERT INTO users (rut, name, lastname, email, password)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, rut, name, lastname, email, created_at
    `;
    const result = await pool.query(query, [rut, name, lastname, email, password]);
    return result.rows[0];
  },

  // buscar usuario por email
  async findByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = $1';
    const result = await pool.query(query, [email]);
    return result.rows[0];
  },

  // buscar usuario por RUT
  async findByRut(rut) {
    const query = 'SELECT * FROM users WHERE rut = $1';
    const result = await pool.query(query, [rut]);
    return result.rows[0];
  },

  // buscar usuario por ID
  async findById(id) {
    const query = 'SELECT id, rut, name, lastname, email, created_at FROM users WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }
};

module.exports = UserModel;
