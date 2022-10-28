const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/moviesController');

router.get('/movies', moviesController.list);
router.get('/movies/new', moviesController.new);
router.get('/movies/recommended', moviesController.recomended);
router.get('/movies/detail/:id', moviesController.detail);


//Rutas exigidas para la creación del CRUD
router.get('/movies/add', moviesController.add);
router.post('/movies/create', moviesController.create); //ruta que procesa la info
router.get('/movies/edit/:id', moviesController.edit); //muestra el formulario
router.put('/movies/update/:id', moviesController.update); //permite actualizar
router.get('/movies/delete/:id', moviesController.delete); //mustra pantalla intermedia
router.delete('/movies/delete/:id', moviesController.destroy); // borra la pantalla

module.exports = router;