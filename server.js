var express = require('express');

var app = express();

app.use(express.static('dist'));
app.listen(80);
console.log("Starting express static server at 80");