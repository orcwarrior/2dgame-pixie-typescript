var express = require('express');

var app = express();
var port = process.env.PORT || 80;
app.use(express.static('dist'));
app.listen(port);
console.log("Starting express static server at" + port);