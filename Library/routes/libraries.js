const { Library } = require('../sequelize');
var express = require('express');
var router = express.Router();


var getLibraries = function () {
    return new Promise(function(resolve, reject) {
        return Library.findAll().then( libraries => {
            resolve(libraries);
        }).catch(err => {
            console.error('failed to get libraries :', err);
            reject('failed to get libraries');
        });
    });
};

var addLibrary = function (libraryToAdd) {
    return new Promise(function(resolve, reject) {
        Library.create(libraryToAdd).then((library) => {
            resolve(library);
        }).catch(err => {
            reject('failed to create', err);
            console.error('failed to create', err);
        });
    });
};

router.get('/', function(req, res, next) {
    getLibraries().then( data => {
        res.json(data);
    }).catch(err => {
        res.status(500).send(err);
    });
});

router.post('/',function(req,res,next){
    if (req.is('json')) {
        addLibrary(req.body).then((newLibrary) => {
            res.json(newLibrary);
        }).catch(err => {
            res.status(500).send('failed to create library : '+ err);
        });
    } else {
        res.status(400).send('This is not JSON');
    }
});

router.get('/:id', function(req,res,next) {
    res.send(router.param('id'));
});
module.exports = router;