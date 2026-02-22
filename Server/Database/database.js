import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config({ quiet: true });

const { Pool } = pkg;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const checking_DB = async () => { 
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('Connected:', res.rows);
  } catch (err) {
    console.error('Error:', err);
  }
};

export { pool, checking_DB };