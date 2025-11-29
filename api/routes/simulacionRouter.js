const express = require('express');
const router = express.Router();
const { simulateStandard } = require('../controladores/simulationController');

function parseBody(body) {
  const amount = Number(body.amount);
  const months = Number(body.months);

  if (!Number.isFinite(amount) || !Number.isInteger(months)) {
    return { ok: false, error: "Debe enviar 'amount' (número) y 'months' (entero)." };
  }
  if (amount < 100000 || amount > 50000000) {
    return { ok: false, error: "El monto debe estar entre $100.000 y $50.000.000." };
  }
  if (months < 6 || months > 60) {
    return { ok: false, error: "Las cuotas deben ser entre 6 y 60 meses." };
  }
  return { ok: true, amount, months };
}

router.post('/simulations', (req, res) => {
  const parsed = parseBody(req.body);
  if (!parsed.ok) return res.status(400).json({ ok: false, error: parsed.error });

  const { amount, months } = parsed;
  const sim = simulateStandard({ amount, months });

  res.json({
    ok: true,
    input: { amount, months },
    ...sim,
    notes: [
      'Simulación con tasa estándar fija 16.5% anual.'
    ]
  });
});

module.exports = router;