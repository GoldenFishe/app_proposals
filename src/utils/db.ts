import {Pool} from "pg";

import {getDataFromEnvironment} from "./env";

const pool = new Pool({
    user: getDataFromEnvironment("DB_USER"),
    host: process.env["DATABASE_URL"] || getDataFromEnvironment("DB_HOST"),
    database: getDataFromEnvironment("DB_NAME"),
    password: getDataFromEnvironment("DB_PASSWORD"),
    port: Number(getDataFromEnvironment("DB_PORT"))
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