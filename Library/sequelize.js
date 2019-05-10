const Sequelize = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './library.db'
  });

const Library = require('./models/library')(sequelize, Sequelize);

sequelize.sync({force : false})
    .then(() => {
        console.log('database sync');
    });

module.exports = {
    Library
};