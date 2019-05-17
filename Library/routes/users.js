const { User } = require('../sequelize');
var express = require('express');
var router = express.Router();

router.param('user', function (req, res, next, userId) {
  userId = parseInt(userId, 10);
  if (isNaN(userId)) {
    return res.status(400).end();
  }
  User.findByPk(userId)
    .then(user => {
      req.user = user;
      next();
    });
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.findAll(req.query)
    .then(users => res.json(users))
    .catch(err => res.status(500).end());
});

router.get('/:user', function (req, res, next) {
  if (req.user != null ) {
    res.json(req.user);
  } else {
    res.status(404).end();
  }
});

//CREATE
router.post('/', function(req, res, next) {
  User.create(req.body)
    .then( user => res.location(`${req.baseUrl}/${user.id}`).json(user))
    .catch(err => res.status(500).end());

});

//UPDATE
router.put('/:user', function (req, res, next) {
  if (req.user != null) {
    req.user.update(req.body)
      .then( user => res.location(`${req.baseUrl}/${user.id}`).json(user))
      .catch( err => res.status(500).end());
  } else {
    res.status(404).end();
  }
});

//DELETE
router.delete('/:user', function (req,res,next){
  if (req.user != null) {
    req.user.destroy()
      .then( deleted => res.send(true))
      .catch( err => res.status(500).end());
  } else {
    res.status(404).end();
  }
});

module.exports = router;
