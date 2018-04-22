'use strict'

var express = require('express');
var ImageController = require('../controllers/image');
var api = express.Router();

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({uploadDir: './uploads'});



api.get('/pruebas-image', ImageController.pruebas );
api.get('/imagen/:id', ImageController.getImage );
api.post('/imagen', ImageController.saveImage );
api.get('/imagenes/:album?', ImageController.getImages );
api.put('/imagen/:id', ImageController.updateImage );
api.delete('/imagen/:id', ImageController.deleteImage );

api.post('/subir-imagen/:id', multipartMiddleware , ImageController.uploadImage );
api.get('/get-imagen/:imageFile', ImageController.getImageFile );

module.exports = api;


