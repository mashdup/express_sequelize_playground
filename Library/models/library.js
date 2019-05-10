module.exports = (sequelize, type) => {
    return sequelize.define('library', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        name: {
            type: type.STRING,
            allowNULL: false,
            validate: {
                notEmpty: true
            }
        }

    })
}