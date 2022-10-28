const db = require('../database/models');
const sequelize = db.sequelize;

//Otra forma de llamar a los modelos
const Movies = db.Movie;

const moviesController = {
    'list': (req, res) => {
        db.Movie.findAll()
            .then(movies => {
                res.render('moviesList.ejs', {movies})
            })
    },
    'detail': (req, res) => {
        db.Movie.findByPk(req.params.id)
            .then(movie => {
                res.render('moviesDetail.ejs', {movie});
            });
    },
    'new': (req, res) => {
        db.Movie.findAll({
            order : [
                ['release_date', 'DESC']
            ],
            limit: 5
        })
            .then(movies => {
                res.render('newestMovies', {movies});
            });
    },
    'recomended': (req, res) => {
        db.Movie.findAll({
            where: {
                rating: {[db.Sequelize.Op.gte] : 8} // quiere decir que el rating tiene que ser mayor o igual a 8.
            },
            order: [
                ['rating', 'DESC']
            ]
        })
            .then(movies => {
                res.render('recommendedMovies.ejs', {movies});
            });
    }, 
    
    //Aqui debemos modificar y completar lo necesario para trabajar con el CRUD

    add: function (req, res) {   
        db.Genre.findAll({  //traigo todos los generos
            order:['name']  //ordeno los generos por nombres, dependiendo el abcdario. Si quiero que sea descendiente, debo abrir corchetes y poner ['name',DESC]
        }) 
          .then(genres=> res.render('moviesAdd',{genres}))  //envio los generes cuando uso el segundo parametro {genres} como objeto.
          .catch(err=>console.log(err))      
    },

    create: function (req, res) { 
       
        const {title,release_date,awards,length,rating,genre} =req.body;
       db.Movie.create({
        title: req.body.title,
        release_date: req.body.release_date,
        awards:req.body.awards,
        length:req.body.length,
        rating:req.body.rating,
        genre_id : req.body.genre,
       }).then(movie => { 
            console.log(movie)
            return res.redirect('/movies')
       }).catch(err=>console.log(err))
    },

    edit: function(req, res) {  
        db.Movie.findByPk(req.params.id)
        .then(movie => {
            res.render('moviesEdit', {movie});
        })
        .catch(err =>console.log(err))
    },

    update: function (req,res) {  
       db.Movie.update({
        title: req.body.title,
        release_date: req.body.release_date,
        awards:req.body.awards,
        length:req.body.length,
        rating:req.body.rating,
        genre_id : req.body.genre,
      }, {
            where: {
                id: req.params.id  //siempre utilizo el where, para especificarque quiero modificar, sino modifaca todo. Aca requiero el parametro por id.
            }
       })     
       .then(movie => { 
            console.log(movie);
            return  res.redirect('/movies/detail/' + req.params.id)  //se redirecciona a detalle para que se vea el formulario y de ahi modificar la peli.
       })
       .catch(err=>console.log(err))               
    },

    delete: function (req, res) {  
        db.Movie.findByPk({
            where: {
                id: req.params.id
         }
         .then(movie => {
           res.render("moviesDelete", {movie})
         })
        })
        .catch(err=>console.log(err))   
    },

    destroy: function (req, res) {  
        db.Movie.destroy({
            where: {
                id: req.params.id
         }
         .then(movies => {
            res.redirect('/moviesDelete', {movies})
        })         
        }) 
        .catch(err=>console.log(err))  
    }}

   module.exports = moviesController;