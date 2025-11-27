export function renderizarSuperheroe(superheroe){
    return {
        "id": superheroe.id,
        "Nombre del SuperHeroe": superheroe.nombreSuperHeroe,
        "Nombre real": superheroe.nombreReal,
        "Edad": superheroe.edad,
        "Planeta de origen": superheroe.planetaOrigen,
        "Debilidad": superheroe.debilidad,
        "Poderes": superheroe.poderes,
        "Aliados": superheroe.aliados,
        "Enemigos": superheroe.enemigos
    };
}

export function renderizarListaSuperheroes(superheroes){
    return superheroes.map(superheroe => renderizarSuperheroe(superheroe));
}