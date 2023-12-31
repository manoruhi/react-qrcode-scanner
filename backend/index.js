const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'qrcode_db',
    port: 3306
});

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

const port = 3001;

// Parse the requests of content-type 'application/json'
app.use(bodyParser.json());

app.post('/result', (req, res) => {
    if(req.method == "POST"){
        const url_data = req.body.data;
        console.log(url_data);
        pool.query('INSERT INTO qrcode_data (qrcode_result) VALUES (?)', [url_data], (error, results) => {
            if (error) {
                console.error(error);
                res.status(500).send('Error creating user');
            } else {
                res.status(200).send('Qrcode data is inserted successfully');
            }
        });
    }
});

app.get('/qrcode_data', (req,res) =>{
    if(req.method == "GET"){
        pool.query('SELECT * FROM qrcode_data', (error, results) => {
            if (error) {
                console.error(error);
                res.status(500).send('Error retrieving users');
            } else {
                res.status(200).json(results);
            }
        });
    }
})

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

