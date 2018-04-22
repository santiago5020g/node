'use strict'

var mongoose = require('mongoose');
var app = require('./app');

var port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/cursofavoritos', function(err,res) {

    if(err){
        throw err;
    }else{
        console.log("Conexion a mongodb correcta");
        app.listen(port, function(){
            console.log("Api rest en http://localhost:"+port);
        });
    }

});





