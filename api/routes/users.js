const express = require('express');
const { pool } = require('../db');
const bcrypt = require('bcrypt');

const router = express.Router();

// POST: Crear usuario
router.post('/users', async (req, res) => {
  try {
    const { rut, name, lastname, email, password } = req.body;

    // validar
    if (!rut || !name || !lastname || !email || !password) {
      return res.status(400).json({ ok: false, error: 'Campos requeridos: rut, name, lastname, email, password' });
    }

    // hashear password
    const hashed = await bcrypt.hash(password, 10);

    // insertar
    const sql = `
      INSERT INTO users (rut, name, lastname, email, password)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, rut, name, lastname, email, created_at;
    `;
    const params = [rut, name, lastname, email, hashed];
    const result = await pool.query(sql, params);

    res.status(201).json({ ok: true, msg: 'Usuario creado', data: result.rows[0] });
  } catch (error) {
    if (error.code === '23505') {
      // UNIQUE violation (rut o email)
      return res.status(400).json({ ok: false, error: 'RUT o email ya registrado' });
    }
    res.status(500).json({ ok: false, error: error.message });
  }
});

// GET: listar
router.get('/users', async (_req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, rut, name, lastname, email, created_at FROM users ORDER BY id DESC;'
    );
    res.json({ ok: true, data: result.rows });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
});

module.exports = router;
