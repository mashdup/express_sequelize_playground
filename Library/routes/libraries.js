const { Library } = require('../sequelize');
var express = require('express');
var router = express.Router();

//GET ALL
router.get('/', (req, res, next) => {
    Library.findAll(req.query)
        .then(libraries => res.json(libraries))
        .catch(next);
});

//PARAMS
router.param('library', (req, res, next, libraryId) => {
    libraryId = parseInt(libraryId, 10);
    if (isNaN(libraryId)) {
        return res.status(400).end();
    }

    Library.findByPk(libraryId)
        .then(library => {
            req.library = library;
            next();
        });
});

//CREATE
router.post('/', (req, res, next) => {
    Library.create(req.body)
        .then(library => res.location(`${req.baseUrl}/${library.id}`).json(library))
        .catch(next);
});

//READ
router.get('/:library', (req, res, next) => {
    if (req.library != null) {
        res.json(req.library);
    } else {
        res.status(404).end();
    }
});

//UPDATE
router.put('/:library', (req, res, next) => {
    if (req.library != null) {
        req.library.update(req.body)
            .then( updated => res.send(true))
            .catch( err => res.status(500).end());
    } else {
        res.status(404).end();
    }
});

//DELETE
router.delete('/:library', (req, res, next) => {
    if (req.library != null) {
        req.library.destroy()
            .then( deleted => res.send(true))
            .catch( err => res.status(500).end());
    } else {
        res.status(404).end();
    }
});

module.exports = router;