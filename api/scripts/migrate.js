const fs = require('fs');
const path = require('path');
const { pool } = require('../db');

async function runMigration() {
  try {
    console.log('🔄 Creando tabla users...');
    
    const sqlPath = path.join(__dirname, '../migrations/init.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');
    
    await pool.query(sql);
    
    console.log('✅ Tabla users creada exitosamente');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await pool.end();
    process.exit(0);
  }
}

runMigration();