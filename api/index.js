const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { ping, pool } = require('./db');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.json({
    ok: true,
    msg: 'API viva',
    endpoints: ['/api/hello', '/api/users']
  });
});

app.get('/api/hello', (_req, res) => {
  res.json({ ok: true, msg: 'Hola desde API' });
});

// Health DB
app.get('/api/health/db', async (_req, res) => {
  try {
    const time = await ping();
    res.json({ status: 'ok', time });
  } catch (e) {
    res.status(500).json({ status: 'error', error: e.message });
  }
});

// Rutas
app.use('/api', usersRouter);
app.use('/api', authRouter);

const PORT = process.env.API_PORT || 8080;
app.listen(PORT, () => console.log(`API escuchando en :${PORT}`));

process.on('SIGTERM', () =>
  pool.end().then(() => {
    console.log('Pool cerrado');
    process.exit(0);
  })
);