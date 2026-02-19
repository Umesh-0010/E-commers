import pkg from 'pg';
import dotenv from 'dotenv'
dotenv.config({quiet:true})

const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});
 

const checking_DB = async ()=>{ 
try {
  await pool.query("SELECT 1");
  console.log("Database connected successfully...........");
} catch (error) {
  console.error("Database connection failed...........");
  console.error(error.message);
}
}


export {pool, checking_DB};