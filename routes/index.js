var express = require('express')
var app = express()

app.get('/', function(req, res) {
	res.render('index', {title: 'My Simple Inventory App'})
})

module.exports = app;