import { Router } from 'express';
import {
    obtenerSuperheroePorIdController,
    obtenerTodosLosSuperheroesController,
    buscarSuperheroesPorAtributoController,
    obtenerSuperheroesMayoresDe30Controller,
    crearSuperheroeController,
    actualizarSuperheroePorIdController,
    eliminarSuperheroePorIdController,
    eliminarSuperheroePorNombreController,
    dashboardSuperheroeController
} from '../controllers/superheroesController.mjs';
import { registerValidationRules } from '../middlewares/validationRules.mjs';
import { handleValidationErrors } from '../middlewares/errorMiddleware.mjs';

const router = Router();

router.get('/heroes/obtener', obtenerTodosLosSuperheroesController);// Endpoint que al realizarle una peticion GET nos devuelve todos los superheroes
router.get('/heroes/obtener/:id', obtenerSuperheroePorIdController);// Endpoint que al realizarle una peticion GET nos devuelve un superheroe
router.get('/heroes/buscar/:atributo/:valor', buscarSuperheroesPorAtributoController);
router.get('/heroes/mayores-30', obtenerSuperheroesMayoresDe30Controller);

router.get('/heroes/agregar', crearSuperheroeController);// Endpoint que al realizar una peticion GET muestra el formulario para agregar un superheroe
router.post('/heroes/agregar', registerValidationRules(), handleValidationErrors, crearSuperheroeController);// Endpoint que al realizarle una peticion POST crea e inserta un nuevo superheroe en la base de datos, y nos devuelve el superheroe creado

router.get('/heroes/editar/:id', actualizarSuperheroePorIdController);// Endpoint que al realizar una peticion GET muestra el formulario para editar un superheroe
router.put('/heroes/editar/:id', registerValidationRules(), handleValidationErrors, actualizarSuperheroePorIdController);// Endpoint que al realizarle una peticion PUT actualiza un superheroe en la base de datos, y devuelve el superheroe actualizado

router.delete('/heroes/eliminar/:id', eliminarSuperheroePorIdController);// Endpoint que al realizarle una peticion DELETE borra un superheroe por ID en la base de datos, y devuelve el superheroe borrado
router.get('/heroes/eliminar/nombre/:nombre', eliminarSuperheroePorNombreController);// Endpoint que al realizarle una peticion DELETE borra un superheroe por Nombre del superheroe en la base de datos, y devuelve el superheroe borrado

router.get('/heroes/dashboard', dashboardSuperheroeController);

export default router;