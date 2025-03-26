import pg from "pg";
import dotenv from "dotenv";

dotenv.config();
const { Pool } = pg;

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
});

pool.connect((err, client, release) => {
    if (err) {
        console.error("Error acquiring client", err.stack);
        return;
    }
    console.log("Connected to PostgreSQL database");
    release();
});

// Ensure table exists
const initializeDB = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS tasks (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                description TEXT NOT NULL,
                completed BOOLEAN DEFAULT false
            );
        `);
        console.log("Database initialized");
    } catch (error) {
        console.error("Database initialization error:", error);
    }
};

initializeDB();

export const query = (text, params) => pool.query(text, params);
export default pool;
