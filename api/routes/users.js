const express = require('express');
const { pool } = require('../db');

const router = express.Router();

// POST: Crear usuario
router.post('/users', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // validar campos requeridos
    if (!name || !email || !password) {
      return res.status(400).json({ 
        ok: false, 
        error: 'Nombre, email y contraseña son requeridos' 
      });
    }
    
    // insertar usuario
    const result = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email, created_at',
      [name, email, password]
    );
    
    res.status(201).json({ 
      ok: true, 
      msg: 'Usuario creado exitosamente',
      data: result.rows[0]
    });
    
  } catch (error) {
    if (error.code === '23505') {
      return res.status(400).json({ 
        ok: false, 
        error: 'El email ya está registrado' 
      });
    }
    
    res.status(500).json({ 
      ok: false, 
      error: error.message 
    });
  }
});

router.get('/users', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, name, email, created_at FROM users ORDER BY id DESC'
    );
    res.json({ ok: true, data: result.rows });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
});

module.exports = router;