import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';
import pokedex from './pokedex.png' ;
import pokedexlogo from './pokedexlogo.png'






const Landing = ()=>{
    return(
    <div className='prueba'>
        <img src={pokedexlogo} alt="Noimg" className='pokedexlogo' />
         <img src={pokedex} alt="Noimg" className='imagengrande'/>
         <Link to='/home' > <h1 className='entrar'>Entrar</h1> </Link>
    </div>
       
    )
}

export default Landing;