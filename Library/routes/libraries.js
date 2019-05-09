const { Library } = require('../sequelize');
var express = require('express');
var router = express.Router();


router.get('/', (req, res, next) => {
    Library.findAll()
        .then(libraries => res.json(libraries))
        .catch(next);
});

router.post('/', (req, res, next) => {
    const fields = ['valid', 'field', 'names', 'to', 'set']
    Library.create(req.body, { fields })
        .then(library => res.location(`${req.baseUrl}/${library.id}`).json(library))
        .catch(next);
});

router.param(':library', (req, res, next, libraryId) => {
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

router.get('/:library', (req, res, next) => {
    res.json(req.library);
});

module.exports = router;
