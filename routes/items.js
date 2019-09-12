var express = require('express')
var app = express()

// SHOW LIST OF ITEMS
app.get('/', function(req, res, next) {
	req.getConnection(function(error, conn) {
		conn.query('SELECT * FROM items ORDER BY id ASC',function(err, rows, fields) {
			//if(err) throw err
			if (err) {
				req.flash('error', err)
				res.render('items/allItems', {
					title: 'Item List', 
					data: ''
				})
			} else {
				// render to views/item/allItems.ejs template file
				res.render('items/allItems', {
					title: 'Items List', 
					data: rows,
					page: 'allItems'
				})
			}
		})
	})
})

// SHOW ADD ITEM FORM
app.get('/addItem', function(req, res, next){	
	res.render('items/addItem', {
		title: 'Add New Item',
		name: '',
		qty: '',
		amount: '',	
		page: 'addItem'
	})
})

// ADD NEW ITEM POST ACTION
app.post('/addItem', function(req, res, next){	
	var item = {
		name: req.body.name,
		qty: req.body.qty,
		amount: req.body.amount
	}
	
	req.getConnection(function(error, conn) {
		conn.query('INSERT INTO items SET ?', item, function(err, result) {
			//if(err) throw err
			if (err) {
				req.flash('error', err)
				// render to views/items/addItem.ejs
				res.render('items/addItem', {
					title: 'Add New Item',
					name: item.name,
					qty: item.qty,
					amount: item.amount,	
					page: 'addItem'					
				})
			} else {				
				req.flash('success', 'Item added to inventory!!!')
				// render toitems/addItem.ejs
				res.render('items/addItem', {
					title: 'Add New Item',
					name: '',
					qty: '',
					amount: '',	
					page: 'addItem'					
				})
			}
		})
	})
})

// SHOW EDIT ITEM FORM
app.get('/editItem/(:id)', function(req, res, next){
	req.getConnection(function(error, conn) {
		conn.query('SELECT * FROM items WHERE id = ?', [req.params.id], function(err, rows, fields) {
			if(err) throw err
			// if item not found
			if (rows.length <= 0) {
				req.flash('error', 'Item not found with id = ' + req.params.id)
				res.redirect('/items')
			}
			else { // if item found
				// render to views/items/editItem.ejs template file
				res.render('items/editItem', {
					title: 'Edit Item', 
					//data: rows[0],
					id: rows[0].id,
					name: rows[0].name,
					qty: rows[0].qty,
					amount: rows[0].amount,	
					page: 'editItem'					
				})
			}			
		})
	})
})

// EDIT ITEM POST ACTION
app.put('/editItem/(:id)', function(req, res, next) {
	var item = {
		name: req.body.name,
		qty: req.body.qty,
		amount: req.body.amount
	}
	
	req.getConnection(function(error, conn) {
		conn.query('UPDATE items SET ? WHERE id = ' + req.params.id, item, function(err, result) {
			//if(err) throw err
			if (err) {
				req.flash('error', err)
		
				// render to views/items/addItem.ejs
				res.render('items/editItem', {
					title: 'Edit Item',
					id: req.params.id,
					name: req.body.name,
					qty: req.body.qty,
					amount: req.body.amount
				})
			} else {
				req.flash('success', 'Data updated successfully!')
				
				// render to views/items/addItem.ejs
				res.render('items/editItem', {
					title: 'Edit Item',
					id: req.params.id,
					name: req.body.name,
					qty: req.body.qty,
					amount: req.body.amount,	
					page: 'editItem'
				})
			}
		})
	})
})

// DELETE ITEM
app.delete('/delete/(:id)', function(req, res, next) {
	var item = { id: req.params.id }
	
	req.getConnection(function(error, conn) {
		conn.query('DELETE FROM items WHERE id = ' + req.params.id, item, function(err, result) {
			//if(err) throw err
			if (err) {
				req.flash('error', err)
				res.redirect('/items')
			} else {
				req.flash('success', 'Item deleted successfully! id = ' + req.params.id)
				res.redirect('/items')
			}
		})
	})
})

module.exports = app
