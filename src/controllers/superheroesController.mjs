import {
    obtenerSuperheroePorId,
    obtenerTodosLosSuperheroes,
    buscarSuperheroesPorAtributo,
    obtenerSuperheroesMayoresDe30,
    crearSuperheroe,
    actualizarSuperheroe,
    eliminarSuperheroe,
    eliminarSuperheroePorNombre
} from '../services/superheroesService.mjs';

import {
    renderizarSuperheroe,
    renderizarListaSuperheroes
} from '../views/responseView.mjs';

// Superheroes por ID
export async function obtenerSuperheroePorIdController(req, res){
    try {
        const {id} = req.params;
        const superheroe = await obtenerSuperheroePorId(id);
        if(!superheroe){
            return res.status(404).send({mensaje: 'Superheroe no encontrado'});
        }
        const superheroeFormateado = renderizarSuperheroe(superheroe);
        return res.status(200).json(superheroeFormateado);
    } catch(error) {
        return res.status(500).send({
            mensaje: 'Error al obtener el superheroe',
            error: error.message
        });
    }
}

// Todos los superheroes
export async function obtenerTodosLosSuperheroesController(req, res){
    try {
        const superheroes = await obtenerTodosLosSuperheroes();
        // const superheroesFormateados = renderizarListaSuperheroes(superheroes);
        // res.status(200).json(superheroesFormateados);
        return res.status(200).render('dashboard', {superheroes});
    } catch(error) {
        return res.status(500).send({
            mensaje: 'Error al obtener los superheroes',
            error: error.message
        });
    }
}

// Superheroes por atributo
export async function buscarSuperheroesPorAtributoController(req, res){
    try {
        const {atributo, valor} = req.params;
        const superheroes = await buscarSuperheroesPorAtributo(atributo, valor);
        if(superheroes.length === 0){
            return res.status(404).send({mensaje: 'No se encontraron superheroes con ese atributo'});
        }
        const superheroesFormateados = renderizarListaSuperheroes(superheroes);
        return res.status(200).json(superheroesFormateados);
    } catch(error) {
        return res.status(500).send({
            mensaje: 'Error al buscar los superheroes',
            error: error.message
        });
    }
}

// Superheroes por atributos fijos
export async function obtenerSuperheroesMayoresDe30Controller(req, res){
    try {
        const superheroes = await obtenerSuperheroesMayoresDe30();
        if(superheroes.length === 0){
            return res.status(404).send({mensaje: 'No se encontraron superheroes mayores de 30 años'});
        }
        const superheroesFormateados = renderizarListaSuperheroes(superheroes);
        return res.status(200).json(superheroesFormateados);
    } catch(error) {
        return res.status(500).send({
            mensaje: 'Error al obtener superheroes mayores de 30',
            error: error.message
        });
    }
}

// Crear un superheroe
export async function crearSuperheroeController(req, res){
    if(req.method === 'GET'){
        return res.status(200).render('addSuperhero');
    }
    if(req.method === 'POST'){
        try {
            const datos = req.body;

            // Convertir los string en array
            if (typeof datos.poderes === 'string') {
                datos.poderes = datos.poderes.split(',').map(p => p.trim()).filter(Boolean);
            }
            if (typeof datos.aliados === 'string' && datos.aliados.length > 0) {
                datos.aliados = datos.aliados.split(',').map(a => a.trim()).filter(Boolean);
            }
            if (typeof datos.enemigos === 'string' && datos.enemigos.length > 0) {
                datos.enemigos = datos.enemigos.split(',').map(e => e.trim()).filter(Boolean);
            }

            const nuevoSuperheroe = await crearSuperheroe(datos);
            // return res.status(201).json(renderizarSuperheroe(nuevoSuperheroe));
            // return res.status(201).render('dashboard');
            return res.redirect('/api/heroes/obtener');
        } catch(error) {
            return res.status(500).send({
                mensaje: 'Error al crear el superheroe',
                error: error.message
            });
        }
    }
    return res.status(405).send('No se como llegamos aca');
}

// Editar un superheroe por id
export async function actualizarSuperheroePorIdController(req, res){
    if(req.method === 'GET'){
        try{
            const { id } = req.params;
            const superheroe = await obtenerSuperheroePorId(id);
            if(!superheroe){
                return res.status(404).send({mensaje: 'Superheroe no encontrado'});
            }
            return res.status(200).render('editSuperhero', {superheroe});
        }catch(error){
            return res.status(500).send({
                mensaje: 'Error al obtener el superheroe',
                error: error.message
            });
        }
    }
    if(req.method === 'PUT'){
        try {
            const { id } = req.params;
            const datos = req.body;
            const superheroeActualizado = await actualizarSuperheroe(id, datos);
            if (!superheroeActualizado){
                return res.status(404).json({mensaje: 'Superheroe no encontrado'});
            }
            // return res.status(200).json(renderizarSuperheroe(superheroeActualizado));
            // return res.status(200).render('dashboard');
            return res.redirect('/api/heroes/obtener');
        } catch(error) {
            return res.status(500).json({
                mensaje: 'Error al actualizar el superheroe',
                error: error.message
            });
        }
    }
    return res.status(405).send('No se como llegamos aca');
}

// Eliminar un superheroe por id
export async function eliminarSuperheroePorIdController(req, res){
    try {
        const { id } = req.params;
        const superheroeEliminado = await eliminarSuperheroe(id);
        if (!superheroeEliminado){
            return res.status(404).json({mensaje: 'Superheroe no encontrado'});
        }
        // res.status(200).json({mensaje: 'Superheroe eliminado correctamente'});
        // return res.status(200).render('dashboard');
        return res.redirect('/api/heroes/obtener');
    } catch(error) {
        return res.status(500).json({
            mensaje: 'Error al eliminar el superheroe',
            error: error.message
        });
    }
}

// Eliminar un superheroe por nombre
export async function eliminarSuperheroePorNombreController(req, res){
    try {
        const { nombre } = req.params;
        const superheroeEliminado = await eliminarSuperheroePorNombre(nombre);
        if (!superheroeEliminado){
            return res.status(404).json({mensaje: 'Superheroe no encontrado'});
        }
        return res.status(200).json({mensaje: 'Superheroe eliminado correctamente'});
    } catch(error) {
        return res.status(500).json({
            mensaje: 'Error al eliminar el superheroe',
            error: error.message
        });
    }
}