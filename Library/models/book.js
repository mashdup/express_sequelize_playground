module.exports = (sequelize, type) => {
    return sequelize.define('book', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        name: {
            type: type.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }

    })
}