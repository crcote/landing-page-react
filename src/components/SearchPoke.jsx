import React, { useRef } from 'react';
import Form from 'react-bootstrap/Form';

const SearchPoke = ({ pokemones, setFilter, search, setSearch, filter }) => {
  const sortRef = useRef();

  const filterSearch = (search) => {
    if (search.trim()!= "") {
      sortRef.current.style.display = 'block'; 
      let filtrado = pokemones.filter((pokemon) => {
        for (let pokemonSearch in pokemon) {
          //descartamos la url de la imagen para que no haga match en el buscador
          if (pokemonSearch != "image" && pokemon[pokemonSearch] != null){
            if (pokemon[pokemonSearch].toUpperCase().includes(search.toUpperCase())) {
              return pokemon;
            }                      
          }        
        }
      });
      setFilter(filtrado);
      
    }else{
      setFilter(pokemones);
      sortRef.current.style.display = 'none';
    }
    sortRef.current.value = "";
  };

  const onChangeSort = (sortMethod) => {
    if (sortMethod == 'asc') {
      setFilter( [...filter].sort( (a, b) => {
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
        return 0;
      }));
    }else if(sortMethod == 'desc'){
      setFilter( [...filter].sort( (a, b) => {
        if (a.name < b.name) {
          return 1;
        }
        if (a.name > b.name) {
          return -1;
        }
        return 0;
      }));
    }
  };
  return (
    <div className='container-select-input'>
      <div>
        <input 
          className="form-control mb-3"
          type="text"
          placeholder="Busca tu pokemón por nombres, tipos, habilidades "
          value={search}
          onChange={(e) => {
              setSearch(e.target.value)
              filterSearch(e.target.value)
            }
          }
        />
      </div>
      <div>
      <Form.Select  
        aria-label="select" 
        defaultValue="" 
        onChange={e => {
            onChangeSort(e.target.value)
          }
        
      }
        ref={sortRef}
        style={{display:'none'}}
      >
        <option value="">Selecciona una opción para ordenar</option>
        <option value="asc">Nombre A-Z</option>   
        <option value="desc">Nombre Z-A</option>
    </Form.Select>
      </div>
    </div>

  );
};

export default SearchPoke;
