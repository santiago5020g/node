'use strict'

var mongoose = require('mongoose');
var app = require('./app');

var port = process.env.port || 3000;

mongoose.connect('mongodb://localhost:27017/app_albums',(err,res) =>{
    if(err){
        throw err;
    }else{
        console.log("Base de datos funcionando correctamente..");

        app.listen(port, function(){
            console.log('Servidor nodejs corriendo(app.listen)... ');
        });

    }
});