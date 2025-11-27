import SuperHero from "../models/SuperHero.mjs";
import IRepository from "./IRepository.mjs";

class SuperHeroRepository extends IRepository {
    async obtenerPorId(id){
        return await SuperHero.findById(id);
    }
    async obtenerTodos(){
        return await SuperHero.find({});
    }
    async buscarPorAtributo(atributo, valor){
        return await SuperHero.find({[atributo]: valor});
    }
    async obtenerMayoresDe30(){
        return await SuperHero.find({
            edad: {$gt:30},
            planetaOrigen: 'Tierra',
            $expr: {$gt: [{ $size: "$poderes" }, 2]}
        });
    }
    async crear(datos){
        return await SuperHero.create(datos);
    }
    async actualizar(id, datos){
        return await SuperHero.findByIdAndUpdate(id, datos, {new: true});
    }
    async eliminar(id){
        return await SuperHero.findByIdAndDelete(id);
    }
    async eliminarPorNombre(nombre){
        return await SuperHero.findOneAndDelete({nombreSuperHeroe: nombre});
    }
}

export default new SuperHeroRepository;