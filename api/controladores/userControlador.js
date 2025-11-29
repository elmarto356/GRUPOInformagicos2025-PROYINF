const UserModel = require('../models/userModel');

const UserController = {
  // crear un nuevo usuario
  async createUser(req, res) {
    try {
      const { rut, name, lastname, email, password } = req.body;

      // validar campos requeridos
      if (!rut || !name || !lastname || !email || !password) {
        return res.status(400).json({
          ok: false,
          error: 'RUT, nombre, apellido, email y contraseña son requeridos'
        });
      }

      // validar formato de RUT (formato: 12345678-9)
      const rutRegex = /^\d{7,8}-[\dkK]$/;
      if (!rutRegex.test(rut)) {
        return res.status(400).json({
          ok: false,
          error: 'Formato de RUT inválido. Use el formato: 12345678-9'
        });
      }

      // verificar si el RUT ya existe
      const existingUserByRut = await UserModel.findByRut(rut);
      if (existingUserByRut) {
        return res.status(400).json({
          ok: false,
          error: 'El RUT ya está registrado'
        });
      }

      // verificar si el email ya existe
      const existingUserByEmail = await UserModel.findByEmail(email);
      if (existingUserByEmail) {
        return res.status(400).json({
          ok: false,
          error: 'El email ya está registrado'
        });
      }

      // crear usuario 
      const user = await UserModel.create(rut, name, lastname, email, password);

      res.status(201).json({
        ok: true,
        msg: 'Usuario creado exitosamente',
        data: user
      });

    } catch (error) {
      console.error('Error al crear usuario:', error);
      res.status(500).json({
        ok: false,
        error: 'Error interno del servidor'
      });
    }
  },

  // obtener todos los usuarios
  async getAllUsers(req, res) {
    try {
      const users = await UserModel.getAll();
      res.json({ ok: true, data: users });
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      res.status(500).json({ ok: false, error: error.message });
    }
  },

  // obtener un usuario por ID
  async getUserById(req, res) {
    try {
      const { id } = req.params;
      const user = await UserModel.findById(id);

      if (!user) {
        return res.status(404).json({
          ok: false,
          error: 'Usuario no encontrado'
        });
      }

      res.json({ ok: true, data: user });
    } catch (error) {
      console.error('Error al obtener usuario:', error);
      res.status(500).json({ ok: false, error: error.message });
    }
  }
};

module.exports = UserController;