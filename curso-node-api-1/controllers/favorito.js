'use strict'

var Favorito = require('../models/favorito');

function prueba(req, res) {

    if (req.params.nombre) {
        var nombre = req.params.nombre;
    }
    else {
        var nombre = "sin nombre";
    }

    res.status(200).send({
        data: [2, 3, 4],
        texto: "hola mundo, se recibe " + nombre
    });
}

function getFavorito(req, res) {
    var favoritoId = req.params.id;

    Favorito.findById(favoritoId, (err, favorito) => {
        if (err) {
            res.status(500).send({ message: "error al devolver el marcador" });
            return;
        }

        if (!favorito) {
            res.status(404).send({
                message: 'No hay marcador'
            });
            return;
        }

        res.status(200).send({
            favorito
        });

       
    });


}

function getFavoritos(req, res) {
    Favorito.find({}).sort('-id').exec((err, favoritos) => {
        if (err) {
            res.status(500).send({
                message: 'Error al devolver los favoritos'
            });
            return;
        }

        if (!favoritos) {
            res.status(404).send({
                message: 'No hay marcadores'
            });
            return;
        }

        res.status(200).send({
            favoritos
        });

    });
}

function saveFavorito(req, res) {
    var favorito = new Favorito();
    var params = req.body;


    favorito.title = params.title;
    favorito.description = params.description;
    favorito.url = params.url;

    favorito.save(function (err, favoritoStored) {
        if (err) {
            res.status(500).send({
                message: 'Error al guardar el marcador fav'
            });
            return;
        }
        res.status(200).send({
            favorito: favoritoStored
        });

    });

}

function updateFavorito(req, res) {
    var favoritoId = req.params.id;
    var update = req.body;
    //console.log(update);

    Favorito.findByIdAndUpdate(favoritoId, update, (err, favoritoUpdate) => {

        if (err) {
            res.status(500).send({
                message: 'Error al actualizar el marcador'
            });
            return;
        }

        res.status(200).send({ favorito: favoritoUpdate });
    });

}

function deleteFavorito(req, res) {
    var favoritoId = req.params.id;
    
        Favorito.findById(favoritoId, (err, favorito) => {
            if (err) {
                res.status(500).send({ message: "error al devolver el marcador" });
                return;
            }
    
            if (!favorito) {
                res.status(404).send({
                    message: 'No hay marcador'
                });
                return;
            }else{
                favorito.remove(err => {
                    if(err){
                        res.status(500).send({ message: "Error al borrar" });
                        return;
                    }

                    res.status(200).send({ message: "El marcador se ha eliminado" });
                    
                });
            }
    
        
        });

}


module.exports = {
    prueba,
    getFavorito,
    saveFavorito,
    getFavoritos,
    updateFavorito,
    deleteFavorito
}