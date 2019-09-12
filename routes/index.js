var express = require('express')
var app = express()

app.get('/', function(req, res) {
	res.render('index', {title: 'Inventory App', madewith: 'NodeJS, Express, EJS & MySQL', author: 'Jay Mascarenas'})
})

module.exports = app;
