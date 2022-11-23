import React from 'react';
import './TypesFiltes.css'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import NavBar from '../NavBar/NavBar.jsx'
import { firstypefunc, typeFilter } from '../../redux/actions';
import { useParams } from 'react-router-dom';
import PokemonCard from '../PokemonCard/PokemonCard.jsx'



const TypesFilter = () => {

    const funcionlimpiadora = function (array) {
        setBandera(false)
        setBandera2(true)
        setPoke(array)
    }
    const [pokeshow, setPoke] = useState([])
    const [bandera, setBandera] = useState(true)
    const [bandera2, setBandera2] = useState(false)
    const error = useSelector((state) => state.error)
    const typesx = useSelector((state) => state.typesfilter)
    const firstype = useSelector((state) => state.firstype)
    const { type } = useParams()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(typeFilter(type))
        dispatch(firstypefunc(type))
    }, [])
    return (

        <div className='fondo'>

            <NavBar>

            </NavBar>

            <div>
                {typesx ? typesx.map((x) => { return <button className='botones' onClick={() => { funcionlimpiadora(x) }}></button> }) : <h1>No funciona</h1>}
            </div>

            {bandera && <div className='contenedordecards'>
                {bandera && firstype ? firstype.map((x) => { return <PokemonCard id={x.id} name={x.name} image={x.image} types={x.types} /> }) : null}
            </div>}


            <div>
                {error ? error.map(x => { return <h1 className='error'>{x.error}</h1> }) : null}
            </div>
            {bandera2 && <div className='contenedordecards'>
                {pokeshow ? pokeshow.map((x) => { return <PokemonCard id={x.id} name={x.name} image={x.image} types={x.types} /> }) : null}
            </div>}


        </div>
    )
}

export default TypesFilter;