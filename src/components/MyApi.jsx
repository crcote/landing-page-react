import React, { useRef } from 'react'
import { useEffect } from 'react';
import MyPokeCard from './MyPokeCard';
import { Alert } from 'react-bootstrap';

export const MyApi = ({search,filter,setPokemones,pokemones,spinnerRef}) => {
    
    let datos = () => {
        if (filter.length === 0) {
            if (search!="") {
                return filter;
            }else{
                return pokemones;
            }
        } else {
            return filter;
        }
    
    }

    const alertRef = useRef();

    useEffect(() => {
        consultarApi();
    }, []);
    
    const consultarApi = async () => {
        try{
            const url = "https://pokeapi.co/api/v2/pokemon?limit=151";
            const fullPokemon = [];
            //Mostramos el spinner al llamar a la api
            spinnerRef.current.style.display = 'block';
            //Obtenemos los primeros 151 pokemones
            const response = await fetch(url);
            const data = await response.json();
            const allPokemon = data.results;

            //Para cada pokemon, consultamos su información extendida a la misma Api
            //Luego creamos el arreglo de pokemones donde filtraremos en el buscador
            for(let pokemon of allPokemon){
            const responsePokemon = await fetch(pokemon.url);
            const dataPokemon = await responsePokemon.json();

            fullPokemon.push( {
                                name: dataPokemon.name[0].toUpperCase()+ dataPokemon.name.slice(1) , //Trasnformarmos la primera letra a mayuscula
                                number: dataPokemon.id.toString(),
                                type1: dataPokemon.types[0].type.name[0].toUpperCase() +  dataPokemon.types[0].type.name.slice(1),
                                type2: dataPokemon.types[1] ?  dataPokemon.types[1].type.name[0].toUpperCase() + dataPokemon.types[1].type.name.slice(1) : null,
                                //consideraremos solo 2 habilidades por pokemon
                                ability1: dataPokemon.abilities[0].ability.name[0].toUpperCase()+ dataPokemon.abilities[0].ability.name.slice(1),
                                ability2: dataPokemon.abilities[1] ? dataPokemon.abilities[1].ability.name[0].toUpperCase() + dataPokemon.abilities[1].ability.name.slice(1)  : null,                  
                                image : dataPokemon.sprites.front_default
                            });
            }
            setPokemones(fullPokemon);
            //Escondemos el spinner cuando terminan las peticiones a la api
            spinnerRef.current.style.display = 'none';
            alertRef.current.style.display = 'none';
        }catch (e){
            console.log("error al consultar api pokemon:",e);
            alertRef.current.style.display = 'block';
            spinnerRef.current.style.display = 'none';
        }
        
    }
    
    return (
        <>
            <MyPokeCard pokemones={datos()}/>
            <Alert variant='danger' style={{display:'none'}} ref={alertRef}>Ha ocurrido un error al consumir la Api de Pokemones</Alert>
        </>
        
    )
}
