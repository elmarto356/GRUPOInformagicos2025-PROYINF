const AuthModel = require('../models/authModel');

const AuthController = {
  // login de usuario
  async login(req, res) {
    try {
      const { email, password } = req.body;

      // validar campos requeridos
      if (!email || !password) {
        return res.status(400).json({
          ok: false,
          error: 'Email y contraseña son requeridos'
        });
      }

      // buscar usuario por email
      const user = await AuthModel.getUserForLogin(email);

      // verificar si el usuario existe
      if (!user) {
        return res.status(401).json({
          ok: false,
          error: 'Credenciales inválidas'
        });
      }

      // comparar contraseña (texto plano)
      if (user.password !== password) {
        return res.status(401).json({
          ok: false,
          error: 'Credenciales inválidas'
        });
      }

      // login exitoso - devolver datos del usuario (sin password)
      const { password: _, ...userData } = user;

      res.json({
        ok: true,
        msg: 'Login exitoso',
        data: userData
      });

    } catch (error) {
      console.error('Error en login:', error);
      res.status(500).json({
        ok: false,
        error: 'Error interno del servidor'
      });
    }
  }
};

module.exports = AuthController;
