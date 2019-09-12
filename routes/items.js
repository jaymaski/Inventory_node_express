const express = require('express');
const router = express.Router();
const mysql = require('mysql');

// Create connection
const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'inventory'
});

// Connect
db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('Connected to Database!');
});

module.exports = router;