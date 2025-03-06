import express from 'express';
import pg from 'pg';
import 'dotenv/config';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));
const y3 = { "bioII": { "name": "Bio II" }, "pharmaceuticalMicro": { "name": "Pharmaceutical Micro" }, "phyto": { "name": "Phyto" }, "ceuticsIII": { "name": "Ceutics III" }, "medicinalChemI": { "name": "Medicinal Chem. I" }, "pharmaI": { "name": "Pharma I" }, "para": { "name": "Para" }, "kinetics": { "name": "Kinetics" }, "forensic": { "name": "Forensic" }, "ceuticsIV": { "name": "Ceutics IV" }, "pharmaII": { "name": "Pharma II" }, "medicinalChemII": { "name": "Medicinal Chem. II" } };

// Set EJS as view engine
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const port = process.env.PORT;

app.use(express.static(__dirname + '/public'));
const localObj = {
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    host: process.env.PGHOST,
    port: process.env.PGPORT
}
const db = new pg.Client({
    connectionstring: process.env.DATABASE_PUBLIC_URL,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    host: process.env.PGHOST,
    port: process.env.PGPORT
});
db.connect();

app.get('/', (req, res) => {
    res.render('index.ejs')
});
app.get('/y3/:subject', async (req, res) => {
    let subj = req.params.subject
    let result = await db.query('SELECT * FROM questions WHERE category = $1', [subj]);
    let rows = result.rows
    res.render('y3.ejs', {
        title: y3[subj].name,
        questions: rows
    });
});
app.get('/admin', async (req, res) => {
    res.render('admin/adminLogin.ejs', {
        message: 'Admins only'
    });
});
app.get('/new-question', (req, res) => {
    res.render('admin/adminPanel.ejs');
});
app.post('/add-question', async (req, res) => {
    const body = req.body

    let result = await db.query('INSERT INTO questions (category, question, a, b, c, d,answer,tip,year) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *'
        , [body.category, body.question, body.a, body.b, body.c, body.d, body.answer, body.tip, Number(body.year)])
    if (result.rowCount) {
        res.send(`
        <h1>DONE</h1>
        YOU WILL BE REDIRECTED IN 3 SECS
    <script>
    setTimeout(()=> window.history.back() ,3000)
        
    </script>
`);

    } else {
        res.send('error')
    }
});
app.listen(port, () => {
    console.log(`listining on: ${process.env.URL || ''}:${port}`);
});