const { User } = require('../sequelize');
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.findAll(req.query)
    .then(users => res.json(users))
    .catch(err => res.status(500).end());
});

//CREATE
router.post('/', function(req, res, next) {
  User.create(req.body)
    .then( user => res.location(`${req.baseUrl}/${user.id}`).json(user))
    .catch(err => res.status(500).end());

});

module.exports = router;
