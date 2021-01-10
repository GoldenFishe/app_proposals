import {Pool} from 'pg';
import {DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER} from "../config";

const pool = new Pool({
    user: DB_USER,
    host: DB_HOST,
    database: DB_NAME,
    password: DB_PASSWORD,
    port: DB_PORT
});

export const query = async (command: string, params?: string[]): Promise<any> => {
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