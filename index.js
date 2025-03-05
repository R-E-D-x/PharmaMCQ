import express from 'express';
import pg from 'pg';
import 'dotenv/config';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const y3 = { "bioII": { "name": "Bio II" }, "pharmaceuticalMicro": { "name": "Pharmaceutical Micro" }, "phyto": { "name": "Phyto" }, "ceuticsIII": { "name": "Ceutics III" }, "medicinalChemI": { "name": "Medicinal Chem. I" }, "pharmaI": { "name": "Pharma I" }, "para": { "name": "Para" }, "kinetics": { "name": "Kinetics" }, "forensic": { "name": "Forensic" }, "ceuticsIV": { "name": "Ceutics IV" }, "pharmaII": { "name": "Pharma II" }, "medicinalChemII": { "name": "Medicinal Chem. II" } };
console.log('filename: ' + __filename);
console.log('dir__dirname: ' + __dirname);
app.use(express.static(path.join(__dirname, "public")));

// Set EJS as view engine
app.set("view engine", "ejs");
const app = express();
app.
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
    res.send('this is working!')
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
// const biologyMCQs = [
//     {
//         category: 'bioII',
//         question: 'Which biomolecule is the primary source of energy for most organisms?',
//         a: 'Proteins',
//         b: 'Lipids',
//         c: 'Carbohydrates',
//         d: 'Nucleic acids',
//         answer: 'c', // Carbohydrates are the main energy source.
//         tip: 'Glucose, a carbohydrate, is a key energy source in cellular respiration.'
//     },
//     {
//         category: 'bioII',
//         question: 'What is the basic unit of life?',
//         a: 'Tissue',
//         b: 'Organ',
//         c: 'Cell',
//         d: 'Organ system',
//         answer: 'c', // The cell is the fundamental unit of life.
//         tip: 'Cells are the smallest structural and functional units of organisms.'
//     },
//     {
//         category: 'bioII',
//         question: 'Which process converts nitrogen gas into a form usable by plants?',
//         a: 'Photosynthesis',
//         b: 'Nitrogen fixation',
//         c: 'Respiration',
//         d: 'Fermentation',
//         answer: 'b', // Nitrogen fixation converts atmospheric nitrogen into ammonia.
//         tip: 'Bacteria like Rhizobium help convert nitrogen gas into ammonia.'
//     },
//     {
//         category: 'bioII',
//         question: 'Which human body system is responsible for transporting oxygen?',
//         a: 'Nervous system',
//         b: 'Digestive system',
//         c: 'Respiratory system',
//         d: 'Circulatory system',
//         answer: 'd', // The circulatory system transports oxygen via blood.
//         tip: 'Red blood cells carry oxygen using hemoglobin.'
//     },
//     {
//         category: 'bioII',
//         question: 'What is the main function of the large intestine?',
//         a: 'Nutrient absorption',
//         b: 'Water absorption',
//         c: 'Protein digestion',
//         d: 'Enzyme production',
//         answer: 'b', // The large intestine absorbs water and forms solid waste.
//         tip: 'The large intestine prevents dehydration by reabsorbing water.'
//     }
// ];
// async function fn() {
//     let queryRandom = await db.query('SELECT * FROM questions');
//     console.log(queryRandom.rowCount)
//     if (queryRandom.rowCount > 10) {
//         console.log('cancelled')
//     } else {
//         for (const Q of biologyMCQs) {
//             await db.query(
//                 `INSERT INTO questions (category, question, a, b, c, d, answer, tip)
//              VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
//                 [Q.category, Q.question, Q.a, Q.b, Q.c, Q.d, Q.answer, Q.tip]
//             );
//         }
//     }
// }
// fn()

app.listen(port, () => {
    console.log(`listining on: ${process.env.URL || ''}:${port}`);
})