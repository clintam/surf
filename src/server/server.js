var express = require('express');
var items = require('./routes/items');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/items', items.findAll);
app.get('/items/:id', items.findById);
app.post('/items', items.add);
app.put('/items/:id', items.update);
app.delete('/items/:id', items.delete);

app.listen(8080);
console.log('Listening on port 8080...');

exports.app = app;