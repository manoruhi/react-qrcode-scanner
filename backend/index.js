const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = 3001;

// Parse the requests of content-type 'application/json'
app.use(bodyParser.json());

// Create the MySQL connection pool
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'infoware_db',
    port: 3306
});

app.get('/result/:link', (req, res) => {
    const link = req.params.link;
    console.log(link);
    res.send("link get");
});


app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

