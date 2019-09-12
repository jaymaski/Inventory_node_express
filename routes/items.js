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

router.get('/items', (req, res) => {
    let sql = 'SELECT * FROM items';
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        res.json(results);
    });
});

/*
// Select single post
router.get('/:id', async (req, res, next) => {
    try {
        let results = await db.one(req.params.id);
        res.json(results);
    }
    catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});
*/
// Select single post
router.get('/:id', (req, res) => {
    let sql = `SELECT * FROM items WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.json(result);
    });
});

// Create Item
router.get('/createNewItem', (req, res) => {
    let post = {name:'Asus ROG', qty: 4, amount: 75000};
    let sql = 'INSERT INTO items SET ?';
    let query = db.query(sql, post, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Item Added!');
    });
});

// Update post
router.get('/update/:id', (req, res) => {
    let newName = 'Razer Blade Stealth Updated value 2';
    let newQty = '7';
    let newAmount = '120000';
    //let id = '';
    let sql = `UPDATE items SET name = ?, qty = ${newQty}, amount = ${newAmount} WHERE id = ${req.params.id}`;
    let query = db.query(sql, newName, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Item updated! (Go to /items to see changes)');
    });
});

module.exports = router;