const { Book, Library, User } = require('../sequelize');
var express = require('express');
var router = express.Router();



router.param('book', (req, res, next, bookId) => {
    bookId = parseInt(bookId, 10);
    if (isNaN(bookId)) {
        return res.status(400).end();
    }

    Book.findByPk(bookId)
        .then(book => {
            req.book = book;
            next();
        });
});

//GET
router.get('/', (req, res, next) => {
    var query = req.query;
    if (req.query.libraryId != undefined) {
        query.where = {
            libraryId: req.query.libraryId
        };
    }
    query.include = [
        {
            model: Library,
            required: false
        }
    ];
    Book.findAll(query)
        .then(books => res.json(books))
        .catch(next);
});

router.get('/:book',(req, res, next) => {
    if (req.book != null) {
        res.json(req.book);
    } else {
        res.status(404).end();
    }
});

//CREATE
router.post('/', (req, res, next) => {
    if (req.body.libraryId != null) {
        var libraryId = parseInt(req.body.libraryId, 10);
        if (isNaN(libraryId)) {
            res.status(400).end();
        }
        Library.findByPk(libraryId)
            .then(library => {
                Book.create(req.body)
                    .then( book => res.location(`${req.baseUrl}/${book.id}`).json(book))
                    .catch(next);
            })
            .catch(err => {
                res.status(404).send("unable to find library with that id").end();
            });
    } else {
        res.status(404).send("required library id").end();
    }
});

//UPDATE
router.put('/:book', (req, res, next) => {
    if (req.book != null) {
        req.book.update(req.body)
            .then(book => res.location(`${req.baseUrl}/${book.id}`).json(book))
            .catch(next);
    } else {
        res.status(404).end();
    }
});

//DELETE
router.delete('/:book', (req, res, next) => {
    if (req.book != null) {
        req.book.destroy()
            .then( deleted => res.send(true))
            .catch( err => res.status(500).end())
    } else {
        res.status(404).end();
    }
});

module.exports = router;