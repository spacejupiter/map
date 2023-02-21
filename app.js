var createError = require('http-errors');
var express = require('express');
var path = require('path');
const cors= require ('cors');

var app = express();



app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname,'build')));
app.get('/',()=>{
  res.sendFile(path.join(__dirname,'build','index.html'));
})

app.use(cors({
  origin : '*'
}));




module.exports = app;
