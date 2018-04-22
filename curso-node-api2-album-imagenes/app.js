'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//carga de rutas
var albumRoutes = require('./routes/album');
var imageRoutes = require('./routes/image');


app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(bodyParser.json());

//configurar cabeceras
app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-API-KEY, Origin, X-Requested-With','Content-Type, Accept, Access-Control-Request-Method');
    res.header('Access-Control-Allow-Method', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

    next();
});


//rutas base
app.use('/api', albumRoutes);
app.use('/api', imageRoutes);

module.exports = app;