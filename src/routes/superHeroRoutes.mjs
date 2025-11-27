import { Router } from 'express';
import {
    obtenerSuperheroePorIdController,
    obtenerTodosLosSuperheroesController,
    buscarSuperheroesPorAtributoController,
    obtenerSuperheroesMayoresDe30Controller,
    crearSuperheroeController,
    actualizarSuperheroePorIdController,
    eliminarSuperheroePorIdController,
    eliminarSuperheroePorNombreController
} from '../controllers/superheroesController.mjs';
import { registerValidationRules } from '../middlewares/validationRules.mjs';
import { handleValidationErrors } from '../middlewares/errorMiddleware.mjs';

const router = Router();

// Endpoint que al realizarle una peticion GET nos devuelve todos los superheroes
router.get('/heroes/obtener', obtenerTodosLosSuperheroesController);

// Endpoint que al realizarle una peticion GET nos devuelve un superheroe
router.get('/heroes/obtener/:id', obtenerSuperheroePorIdController);

router.get('/heroes/buscar/:atributo/:valor', buscarSuperheroesPorAtributoController);

router.get('/heroes/mayores-30', obtenerSuperheroesMayoresDe30Controller);

// Endpoint que al realizar una peticion GET muestra el formulario para agregar un superheroe
router.get('/heroes/agregar', crearSuperheroeController);
// Endpoint que al realizarle una peticion POST crea e inserta un nuevo superheroe en la base de datos, y nos devuelve el superheroe creado
router.post('/heroes/agregar', registerValidationRules(), handleValidationErrors, crearSuperheroeController);

// Endpoint que al realizar una peticion GET muestra el formulario para editar un superheroe
router.get('/heroes/editar/:id', actualizarSuperheroePorIdController);
// Endpoint que al realizarle una peticion PUT actualiza un superheroe en la base de datos, y devuelve el superheroe actualizado
router.put('/heroes/editar/:id', actualizarSuperheroePorIdController);

// Endpoint que al realizarle una peticion DELETE borra un superheroe por ID en la base de datos, y devuelve el superheroe borrado
router.delete('/heroes/eliminar/:id', eliminarSuperheroePorIdController);

// Endpoint que al realizarle una peticion DELETE borra un superheroe por Nombre del superheroe en la base de datos, y devuelve el superheroe borrado
router.delete('/heroes/eliminar/nombre/:nombre', eliminarSuperheroePorNombreController);

export default router;