var express = require('express')
var app = express()

app.get('/', function (req, res) {
	res.render('index',
		{
			title: 'ENGventory',
			madewith: 'NodeJS, Express, EJS & MySQL',
			author: 'EliteDev',
			page: 'home',
			category: { category1: 'Projectors', category2: 'Laptops', category3: 'Audio', category4: 'Accessories', category5: 'Others' },
			category_image: { category1: 'projector.png', category2: 'laptop.png', category3: 'audio.png', category4: 'accessories.png', category5: 'others.png' }
		})
})

module.exports = app;
