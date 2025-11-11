const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const DB_PATH = process.env.DB_PATH || path.join(__dirname, 'barbill.db');
const migrationsPath = path.join(__dirname, 'migrations.sql');
const initSql = fs.readFileSync(migrationsPath, 'utf8');

const db = new Database(DB_PATH);

// ensure migrations run
db.exec(initSql);

module.exports = db;