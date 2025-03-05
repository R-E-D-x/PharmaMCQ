import express from 'express';
import pg from 'pg';
import 'dotenv/config';

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const port = 4000;
const env = process.env;


const db = new pg.Client({
    connectionstring: env.DATABASE_PUBLIC_URL,
    // connectionstring: env.DATABASE_URL,
    user: env.PGUSER,
    password: env.PGPASSWORD,
    database: env.PGDATABASE,
    host: env.PGHOST,
    // port: 5432
    port: env.PGPORT
})
db.connect();
async function fn() {
    let result = await db.query("SELECT * FROM questions")
    console.log(result.rows)
    return result.rowCount
}
fn()