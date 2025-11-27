class IRepository {
    obtenerPorId(id){
        throw new Error("Metodo 'obtenerPorId()' no implementado");
    }
    obtenerTodos(){
        throw new Error("Metodo 'obtenerTodos()' no implementado");
    }
    buscarPorAtributo(atributo, valor){
        throw new Error("Metodo 'buscarPorAtributo()' no implementado");
    }
    obtenerMayoresDe30(){
        throw new Error("Metodo 'obtenerMayoresDe30()' no implementado");
    }
    crear(){
        throw new Error("Metodo 'crear' no implementado");
    }
    actualizar(id, datos){
        throw new Error("Metodo 'actualizar' no implementado");
    }
    eliminar(id){
        throw new Error("Metodo 'eliminar' no implementado");
    }
}

export default IRepository;