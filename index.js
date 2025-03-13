import express from 'express';
import pg from 'pg';
import 'dotenv/config';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';
import session from 'express-session';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(session({
    secret: "secret-key", // Used to sign session ID cookie
    resave: false, // Prevents saving unchanged sessions
    saveUninitialized: false, // Doesn't save empty sessions
    cookie: { secure: false, maxAge: 3 * 24 * 60 * 60 * 1000 } // Set to true in production with HTTPS
}));

app.use(express.static(path.join(__dirname, "public")));
const y3 = { "bioII": { "name": "Bio II" }, "pharmaceuticalMicro": { "name": "Pharmaceutical Micro" }, "phyto": { "name": "Phyto" }, "ceuticsIII": { "name": "Ceutics III" }, "medicinalChemI": { "name": "Medicinal Chem. I" }, "pharmaI": { "name": "Pharma I" }, "para": { "name": "Para" }, "kinetics": { "name": "Kinetics" }, "forensic": { "name": "Forensic" }, "ceuticsIV": { "name": "Ceutics IV" }, "pharmaII": { "name": "Pharma II" }, "medicinalChemII": { "name": "Medicinal Chem. II" } };

// Set EJS as view engine
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const port = process.env.PORT;

app.use(express.static(__dirname + '/public'));

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
    res.sendFile('index.html');
});
app.get('/y3/:subject', async (req, res) => {
    let subj = req.params.subject;
    let result = await db.query('SELECT * FROM questions WHERE category = $1', [subj]);
    let session = req.session.user
    if (session) {
        return res.redirect(`../${session.username}/y3/${subj}`)
    }
    let questions = result.rows
    res.render('userLogin.ejs', {
        subject: subj,
        message: ''
    })
});
app.get('/:user/y3/:subject', async (req, res) => {
    let { user, subject } = req.params;
    let session = req.session.user;
    if (!req.session.user) return res.send('<h1 style="text-align:center; margin-top:50vh;"> you are being redirected...</h1> <script>setTimeout(()=> window.history.back() ,1500)</script>');
    const questions = (await db.query('SELECT * FROM questions WHERE category = $1', [subject])).rows
    const temp = {
        type: 'user',
        username: 'redx56',
        password: '12345678',
        subject: req.params.subject
    }
    res.render('y3.ejs', {
        user: session.user,
        title: y3[subject].name,
        questions: questions
    })

});
app.post('/verify-admin', async (req, res) => {
    const { username, password } = req.body
    const rows = (await db.query('SELECT * FROM admins WHERE username = $1', [username])).rows
    if (!rows.length) {
        res.render('adminLogin', {
            message: 'Username not found.'
        });
    } else if (rows[0].password === password) {
        req.session.admin = { type: 'admin', ...rows[0] };
        res.redirect(`/${username}/admin-panel`)
    } else {
        res.render('adminLogin', {
            message: 'Wrong Password'
        });
    }
})
app.post('/verify-user', async (req, res) => {
    const { username, password, subject } = req.body;
    const rows = (await db.query('SELECT * FROM users WHERE username = $1', [username])).rows
    if (!rows.length) {
        res.render('userLogin', {
            subject: subject,
            message: 'User not found.'
        });
    } else if (rows[0].password === password) {
        req.session.user = { type: 'user', ...req.body };
        res.redirect(`${username}/y3/${subject}`)
    } else {
        res.render('userLogin', {
            subject: subject,
            message: 'Wrong Password'
        });
    }
});
app.post('/add-user', async (req, res) => {
    const { year, first_name, last_name, username, password, author } = req.body
    let result = await db.query(`SELECT * FROM users WHERE username = $1`, [username])
    if (result.rowCount) return res.send('user already Exists')
    let rowCount = await db.query(`
    INSERT INTO users (year,first_name,last_name,username,password,author)
    VALUES ($1,$2,$3,$4,$5,$6) RETURNING *
    `, [year, first_name, last_name, username, password, author]);
    if (rowCount) return res.sendFile(__dirname + '/public/success.html')
    res.send('Error')
})
app.get('/admin', async (req, res) => {
    if (!req.session.admin) return res.render('admin/adminLogin')
    res.redirect(`/${req.session.admin.username}/admin-panel`)
})
app.get('/:user/admin-panel', async (req, res) => {
    if (!req.session.admin) return res.redirect('/admin')
    const admin = req.session.admin
    res.render('admin/adminPanel.ejs', { username: admin.first_name });
});
app.post('/add-question', async (req, res) => {
    const { category, question, a, b, c, d, answer, tip, year, author } = req.body

    let result = await db.query(`
    INSERT INTO questions (category, question, a, b, c, d, answer, tip, year, author)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *
    `, [category, question, a, b, c, d, answer, tip, Number(year), author])
    if (result.rowCount) {
        return res.sendFile(__dirname + '/public/success.html');
    }
    res.send('error')

});
app.post("/logout", (req, res) => {
    req.session.destroy(err => {
        if (err) return res.send("Error destroying session");
        res.redirect('/');
    });
});
app.listen(port, () => {
    console.log(`listining on: ${process.env.URL}`);
});