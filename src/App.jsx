import React, { useState} from 'react'
import { MyApi } from './components/MyApi';
import SearchPoke from './components/SearchPoke'
import 'bootstrap/dist/css/bootstrap.min.css';
import MyHeader from './components/MyHeader';
import MyFooter from './components/MyFooter';
import { Alert,Container,Spinner } from 'react-bootstrap';
import { useRef } from 'react';

function App() {
  
  const [pokemones, setPokemones] = useState([]);
  const [filter, setFilter] = useState([]);
  const [search, setSearch] = useState('');
  //usamos hook useRef para mostrar y ocultar spinner
  const spinnerRef = useRef();
  
  
  return (
    <>
    <MyHeader/>
    <Container>     
      <p style={{color:'white', textAlign:'center', fontSize:'25px'}}> Busca tu POKEMÓN por nombre, habilidad, tipo o número del 1 al 151</p>
      <SearchPoke pokemones={pokemones} filter={filter} setFilter={setFilter} search={search} setSearch={setSearch} />
      <MyApi search={search} filter={filter} setPokemones={setPokemones} pokemones={pokemones} spinnerRef={spinnerRef}/>
      <div style={{display:'flex', justifyContent:'center'}}>
        <Spinner animation="border" variant='danger' ref={spinnerRef} />
      </div>      
      {(filter.length == 0 && search != "" )? <Alert variant='danger'>No se han encontrado Pokemones para el filtro ingresado.</Alert> : null } 
    </Container>
    <MyFooter/>

    </>
  )
}

export default App