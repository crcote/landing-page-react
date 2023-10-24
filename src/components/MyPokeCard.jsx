import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

function MyPokeCard({pokemones}) {
  console.log(pokemones);
  return (
    
    <div className='cards-container'>
      { pokemones.map(pokemon => (
        <Card key = {pokemon.number} style={{ width: '300px', backgroundColor:'lemonChiffon', border:'3px solid red', marginBottom:'20px'}}>
          <Card.Img style={{width:"150px"}} variant="top" src={pokemon.image} />
          <Card.Body>
            <Card.Title>#{pokemon.number} - {pokemon.name}</Card.Title>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item className='bg-danger'><b>Tipos:</b> {pokemon.type1} {pokemon.type2 ? ' / '+pokemon.type2 : null }</ListGroup.Item>
            <ListGroup.Item><b>Habilidades:</b> <br/> {pokemon.ability1} {pokemon.ability2 ? ' / '+pokemon.ability2 : null } </ListGroup.Item>
          </ListGroup>
        </Card>
        )) 
      }
    </div>    
    
  );
}

export default MyPokeCard;