const express = require('express');
const app = express();

//Import Routes
const  itemsRoute = require('./routes/items');

//Items Routes
app.use('/', itemsRoute);
app.use('/items', itemsRoute);
app.use('/createNewItem', itemsRoute);
app.use('/:id', itemsRoute);
app.use('/update/:id', itemsRoute);
app.use('/delete/:id', itemsRoute);

app.listen('3000', () => {
    console.log('Server started on port 3000');
});