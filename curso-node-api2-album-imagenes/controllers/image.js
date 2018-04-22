'use strict'

var Image = require('../models/imagen');
var Album = require('../models/album');

var path = require('path');

function pruebas(req, res) {
    res.status(200).send({ message: 'Pruebas de controlador de imagenes' });
}

function getImage(req, res) {
    var imageId = req.params.id;

    Image.findById(imageId, (err, image) => {
        if (err) {
            return res.status(500).send({ message: "Error en la peticion" });
        }

        if (!image) {
            return res.status(404).send({ message: "Imagen no encontrada" });
        }

        Album.populate(image, { path: 'album' }, (err, image) => {
            if (err) {
                return res.status(500).send({ message: "Error en la peticion" });
            }

            res.status(200).send({ image });
        });



    });
}


function getImages(req, res) {
    var albumId = req.params.album;

    if (!albumId) {
        var find = Image.find({}).sort('-title');
    }
    else {
        var find = Image.find({ album: albumId }).sort('-title');
    }


    find.exec((err, images) => {
        if (err) {
            return res.status(500).send({ message: "Error en la peticion" });
        }

        if (!images) {
            return res.status(404).send({ message: "no hay imagenes" });
        }

        Album.populate(images, { path: 'album' }, (err, images) => {
            if (err) {
                return res.status(500).send({ message: "Error en la peticion" });
            }

            return res.status(200).send({ images });
        });
    });


}


function saveImage(req, res) {
    var image = new Image();

    var params = req.body;
    image.title = params.title;
    image.picture = null;
    image.album = params.album;

    image.save((err, imageStored) => {
        if (err) {
            return res.status(500).send({ message: 'Error al guardar imagen' })
        }

        if (!imageStored) {
            return res.status(404).send({ message: "Imagen no guardada" });
        }


        res.status(200).send({ imageStored });

    });

}


function updateImage(req, res) {
    var imageId = req.params.id;
    var update = req.body;

    Image.findByIdAndUpdate(imageId, update, (err, imageUpdated) => {
        if (err) {
            return res.status(500).send({ message: 'Error al actualizar imagen' })
        }

        if (!imageUpdated) {
            return res.status(404).send({ message: "Imagen no actualizada" });
        }

        res.status(200).send({ imageUpdated });
    });
}


function deleteImage(req, res){
    var imageId = req.params.id;

    Image.findByIdAndRemove(imageId, (err, imageDeleted) => {
        if (err) {
            return res.status(500).send({ message: 'Error al borrar imagen' })
        }

        if (!imageDeleted) {
            return res.status(404).send({ message: "Imagen no borrada" });
        }

        res.status(200).send({ imageDeleted });
    });

}


function uploadImage(req, res){
    var imageId = req.params.id;
    var fileName = 'No subido...';

    if(req.files){
        var filePath = req.files.image.path;
        var fileSplit = filePath.split('\\');
        var fileName = fileSplit[1];

        Image.findByIdAndUpdate(imageId,{ picture: fileName }, (err, imageUpdated) => {
            if (err) {
                return res.status(500).send({ message: 'Error al borrar imagen' })
            }
    
            if (!imageUpdated) {
                return res.status(404).send({ message: "Imagen no borrada" });
            }
    
            res.status(200).send({ imageUpdated });
        });
    }else{
        res.status(200).send({message: 'No se ha subido imagen'});
    }
}

var fs = require('fs');
function getImageFile(req,res){
    var imageFile = req.params.imageFile;

    fs.exists('./uploads/'+imageFile, function(exists){
        if(exists){
            res.sendFile(path.resolve('./uploads/'+imageFile));
        }else{
            res.status(200).send({message: 'No existe la imagen'});
        }
    });

   
}


module.exports = {
    pruebas,
    getImage,
    saveImage,
    getImages,
    updateImage,
    deleteImage,
    uploadImage,
    getImageFile
}