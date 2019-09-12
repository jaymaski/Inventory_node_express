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

//Routes

/*
// Select posts
router.get('/', async (req, res) => {
    try {
        let results = await db.all();
        res.json(results);
    }
    catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});
*/

// Select posts
router.get('/', (req, res) => {
    let sql = 'SELECT * FROM items';
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        res.render('items.ejs', {
            allItems: results 
        });
        //res.json(results);
    });
});

module.exports = router;