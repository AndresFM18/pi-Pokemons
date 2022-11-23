import React from 'react';
import './Missing.css'
import pikachu from './triste.png'




const Missing = () => {
    return (

        <div className='missing'>
            <h1 >NOT A POKEMON</h1>
            <img className='imaagen' src={pikachu} alt="Noimg" />

            <button onClick={()=>{window.location.replace(`http://localhost:3000/home`);}} className='boton'>HOME</button>
        </div>
    )
}

export default Missing;