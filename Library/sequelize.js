const Sequelize = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './library.db'
  });

const Library = require('./models/library')(sequelize, Sequelize);
const Book = require('./models/book')(sequelize, Sequelize);
const User = require('./models/user')(sequelize, Sequelize);

Book.belongsTo(Library);
Book.belongsTo(User);

sequelize.sync({force : false, alter : false})
    .then(() => {
        console.log('database sync');
    });

module.exports = {
    Library,
    Book,
    User
};