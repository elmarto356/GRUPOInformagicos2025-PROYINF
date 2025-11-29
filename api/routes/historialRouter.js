// routes/historialRouter.js
const express = require("express");
const router = express.Router();
const { pool } = require("../db");

router.get("/historial-simulaciones", async (req, res) => {
  try {
    const userId = 2; // ID de usuario fijo para EL EJEMPLOOO

    const { rows } = await pool.query(
      `SELECT id,
              created_at,
              amount,
              months,
              annual_rate,
              monthly_payment,
              total_interest,
              total_to_pay
       FROM simulations
       WHERE user_id = $1
       ORDER BY created_at DESC`,
      [userId]
    );

    res.json({ simulations: rows });
  } catch (err) {
    console.error("Error al obtener historial:", err);
    res
      .status(500)
      .json({ message: "Error al obtener el historial de simulaciones" });
  }
});

module.exports = router;
