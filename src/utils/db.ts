import {Pool} from "pg";

const pool = new Pool({
    user: process.env["DB_USER"],
    host: process.env["DB_HOST"],
    database: process.env["DB_NAME"],
    password: process.env["DB_PASSWORD"],
    port: Number(process.env["DB_PORT"]),
});

export const query = async <T>(command: string, params?: string[]): Promise<T[]> => {
    const client = await pool.connect();
    const startTime = Date.now();
    const result = await client.query<T>(command, params);
    const duration = `${(Date.now() - startTime) / 1000} s`;
    console.log('executed query', {command, duration, rows: result.rowCount});
    client.release();
    return result.rows;
};