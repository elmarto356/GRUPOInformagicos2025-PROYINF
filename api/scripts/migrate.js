const fs = require('fs');
const path = require('path');
const { pool } = require('../db');

async function ensureMigrationsTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      name text PRIMARY KEY,
      applied_at timestamptz NOT NULL DEFAULT now()
    )
  `);
}

async function getAppliedNames() {
  const { rows } = await pool.query('SELECT name FROM schema_migrations');
  return new Set(rows.map(r => r.name));
}

async function applyMigration(filePath, name) {
  const sql = fs.readFileSync(filePath, 'utf8');
  console.log(`🔄 Aplicando ${name}…`);
  try {
    await pool.query('BEGIN');
    await pool.query(sql);
    await pool.query('INSERT INTO schema_migrations(name) VALUES ($1)', [name]);
    await pool.query('COMMIT');
    console.log(`${name} aplicado`);
  } catch (err) {
    await pool.query('ROLLBACK');
    console.error(`Falló ${name}:`, err.message);
    throw err;
  }
}

async function runMigrations() {
  try {
    console.log('Ejecutando migraciones');
    await ensureMigrationsTable();

    const dir = path.join(__dirname, '../migrations');
    const files = fs.readdirSync(dir)
      .filter(f => f.endsWith('.sql'))
      .sort(); // 00_, 01_, 02_…

    const applied = await getAppliedNames();

    for (const f of files) {
      if (applied.has(f)) {
        console.log(`Skip ${f} (ya aplicada)`);
        continue;
      }
      await applyMigration(path.join(dir, f), f);
    }

    console.log('Base al día');
  } catch (error) {
    console.error('Error general:', error.message);
    process.exitCode = 1;
  } finally {
    await pool.end();
    process.exit();
  }
}

runMigrations();
