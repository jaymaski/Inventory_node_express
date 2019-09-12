const express = require('express');
const app = express();

//Import Routes
const  itemsRoute = require('./routes/items');

app.listen('3000', () => {
    console.log('Server started on port 3000');
});