'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
//var mongoose = require('mongoose');
var app = express();
var port = process.argv[2] || 9001;
mongoose.connect(require('./config').db.uri);

var routes = require('./routes')();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/api', routes);

app.listen(port);
console.log('Magic happens on ' + port);