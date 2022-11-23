import React from 'react';
import incase from '../PokemonDetail/pokeball.png'
import './PokemonCard.css'
const url = (ids) => { return 'http://localhost:3000/pokemon/' + ids }



const PokemonCard = (props) => {
    return (

        <div className='carta'>
            <h3 className='nombre2'>{props.name || 'NO NAME'}</h3>
            {props.image ? <a className='image' href={url(props.id)}><img className='image' src={props.image} alt='details' /></a> : <a className='noimg' href={url(props.id)}><img className='image' src={incase} alt='details' /></a>}
            {props.types ? props.types.map((x) => { return <p className='tiposlista2'>{x["name"]}</p> }) : null}
            {/* {props.types ? <p className='tiposlista'>{props.types}</p> : null} */}
        </div>
    )
}

export default PokemonCard;