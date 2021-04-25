import {Pool} from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
    user: process.env["DB_USER"],
    host: process.env["DB_HOST"],
    database: process.env["DB_NAME"],
    password: process.env["DB_PASSWORD"],
    port: Number(process.env["DB_PORT"]),
});

export const query = async (command: string, params?: string[]): Promise<any> => {
    console.log('connected');
    try {
        const client = await pool.connect();
        const startTime = Date.now();
        const result = await client.query(command, params);
        const duration = `${(Date.now() - startTime) / 1000} s`;
        console.log('executed query', {command, duration, rows: result.rowCount});
        client.release();
        return result.rows;
    } catch (err) {
        console.error(err.stack);
    }
};