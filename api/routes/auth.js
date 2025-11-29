const express = require('express');
const AuthController = require('../controladores/authController');

const router = express.Router();
const { pool } = require("../db");


// POST /api/auth - Iniciar sesión
router.post('/auth', async (req, res) => {
    const {email, password} = req.body;

    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

        if (result.rows.length === 0) {
            return res.status(401).json({ ok: false, error: 'usuario inválido' });
        }

        const user = result.rows[0];
        if (user.password !== password) {
            return res.status(401).json({ ok: false, error: 'Contraseña inválida' });
        }

        //respuesta exitosa
        res.json({ ok: true, msg: 'Inicio de sesión exitoso', data: { id: user.id, rut: user.rut, name: user.name, lastname: user.lastname, email: user.email } });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, error: 'Error del servidor' });
    }
});

module.exports = router;