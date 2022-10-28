module.exports = (sequelize, dataTypes) => {
    let alias = 'Movie';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: dataTypes.STRING
        },
        rating: {
            type: dataTypes.INTEGER
        },
        length: {
            type: dataTypes.INTEGER
        },
        awards: {
            type: dataTypes.INTEGER
        },
        release_date: {
            type: dataTypes.DATE
        },
        genre_id : {
            type : dataTypes.INTEGER  //se agrega genero aca porque sino, por mas que lo pongamos en moviesController, en el destruturin, en la vista no va a aparecer y en la base de datos, si aparece la peli creada, pero sin un id de generos.
        }
    };
    let config = {
        tableName: 'movies',
        timestamps: false
    };
    const Movie = sequelize.define(alias, cols, config)

    return Movie
}