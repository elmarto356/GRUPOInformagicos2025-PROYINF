<<<<<<< HEAD
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { ping, pool } = require('./db');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const OCRRouter = require('./routes/OCR');
const simulacionRouter = require('./routes/simulacionRouter'); 

const app = express();
app.use(cors());
app.use(express.json());

// --- Ruta raíz ---
app.get('/', (_req, res) => {
  res.json({
    ok: true,
    msg: 'API viva',
    endpoints: [
      '/api/hello',
      '/api/users',
      '/api/auth',
      '/api/OCR',
      '/api/simulations'
    ]
  });
});

// --- Ruta de prueba simple ---
app.get('/api/hello', (_req, res) => {
  res.json({ ok: true, msg: 'Hola desde API' });
});

// --- Health check de la DB ---
app.get('/api/health/db', async (_req, res) => {
  try {
    const time = await ping();
    res.json({ status: 'ok', time });
  } catch (e) {
    res.status(500).json({ status: 'error', error: e.message });
  }
});

// --- Rutas principales ---
app.use('/api', usersRouter);
app.use('/api', authRouter);
app.use('/api', OCRRouter);
app.use('/api', simulacionRouter);

const PORT = process.env.API_PORT || 8080;
app.listen(PORT, () => console.log(`API escuchando en :${PORT}`));

process.on('SIGTERM', () =>
  pool.end().then(() => {
    console.log('Pool cerrado');
    process.exit(0);
  })
);
=======
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { ping, pool } = require('./db');

const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const OCRRouter = require('./routes/OCR');
const simulacionRouter = require('./routes/simulacionRouter'); 

const {WebpayPlus} = require('transbank-sdk');

const app = express();
app.use(cors());
app.use(express.json());


// --- Ruta raíz ---
app.get('/', (_req, res) => {
  res.json({
    ok: true,
    msg: 'API viva',
    endpoints: [
      '/api/hello',
      '/api/users',
      '/api/auth',
      '/api/OCR',
      '/api/simulations'
    ]
  });
});

// --- Ruta de prueba simple ---
app.get('/api/hello', (_req, res) => {
  res.json({ ok: true, msg: 'Hola desde API' });
});

// --- Health check de la DB ---
app.get('/api/health/db', async (_req, res) => {
  try {
    const time = await ping();
    res.json({ status: 'ok', time });
  } catch (e) {
    res.status(500).json({ status: 'error', error: e.message });
  }
});

// --- Rutas principales ---
app.use('/api', usersRouter);
app.use('/api', authRouter);
app.use('/api', OCRRouter);
app.use('/api', simulacionRouter);

const PORT = process.env.API_PORT || 8080;
app.listen(PORT, () => console.log(`API escuchando en :${PORT}`));

process.on('SIGTERM', () =>
  pool.end().then(() => {
    console.log('Pool cerrado');
    process.exit(0);
  })
);

//--- pago ---
app.post("/pagar", async (req, res) => {
  try {
    const { monto } = req.body;

    const buyOrder = "orden-" + Date.now();
    const sessionId = "sesion-" + Date.now();
    const returnUrl = "http://localhost:3000/webpay/confirmar";

    const transaction = WebpayPlus.Transaction.buildForIntegration(
      "597055555532",
      "579f8c0d-f309-4b3c-8c9f-2ec503dbab1c"
    );

    const response = await transaction.create(
      buyOrder,
      sessionId,
      monto,
      returnUrl
    );

    return res.json({
      url: response.url,
      token: response.token,
    });

  } catch (error) {
    console.error("Error en Webpay:", error);
    res.status(500).json({ error: "Error al crear transacción" });
  }
});
>>>>>>> 1503bf0 (webpay)
