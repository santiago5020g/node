'use strict'

var Album = require('../models/album');

function getAlbum(req, res){
    var albumId = req.params.id;

    Album.findById(albumId, (err, album) =>{
        if(err){
            return res.status(500).send({ message: 'Error en la peticion' });
            
        }

        if(!album){
            return res.status(404).send({ message: 'El album no existe' });
        }

        return res.status(200).send({ album });
    });
}

function getAlbums(req, res){

    Album.find({},(err, albums) =>{
        if(err){
            return res.status(500).send({ message: 'Error en la peticion' });   
        }

        if(!albums){
            return res.status(404).send({ message: 'No hay albums' });
        }

        return res.status(200).send({ albums });
    });
}


function saveAlbum(req, res){
    var album = new Album();

    var params = req.body;

    album.title = params.title;
    album.description = params.description;

    album.save((err,albumStored)=>{
        if(err){
            return res.status(500).send({ message: 'Error al guardar' });   
        }

        if(!albumStored){
            return res.status(404).send({ message: 'No se ha guardado el album' });   
        }

        return res.status(200).send({ albumStored });
    });
}


function updateAlbum(req, res){
    var albumId = req.params.id;
    var update = req.body;

    Album.findByIdAndUpdate(albumId, update, (err, albumUpdated)=>{
        if(err){
            return res.status(500).send({message: 'Error al actualizar el album'});
        }

        if(!albumUpdated){
            return res.status(404).send({ message: 'No se ha podido actualizar el album' });   
        }

        return res.status(200).send({ albumUpdated });
    });
}


function deleteAlbum(req, res){
    var albumId = req.params.id;

    Album.findByIdAndRemove(albumId, (err, albumDeleted)=>{
        if(err){
            return res.status(500).send({message: 'Error al eliminar el album'});
        }

        if(!albumDeleted){
            return res.status(404).send({ message: 'No se ha podido eliminar el album' });   
        }

        return res.status(200).send({ albumDeleted });
    });
}

module.exports = {
    getAlbum,
    getAlbums,
    saveAlbum,
    updateAlbum,
    deleteAlbum
}