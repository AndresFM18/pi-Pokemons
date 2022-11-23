import React, { useEffect } from 'react';
import { getPokeId } from '../../redux/actions';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './PokemonDetail.css';
import NavBar from '../NavBar/NavBar';
import stats from './stats.png';
import pokeball from './pokeball.png'




const PokemonDetail = () => {
        const dispatch = useDispatch();
        const { id } = useParams();
        const poke = useSelector((state) => state.pokemonsDetail)
        useEffect(() => {
            dispatch(getPokeId(id))
        }, [])

    return (
        <div className='prueba'>
            <div>
                <NavBar></NavBar>
            </div>


            {poke ? <div className='containerxd'>
                <div className='aleja'>
                    {poke.name ? <h1 className='nombre'>{poke.name}</h1> : null}
                    {poke.image ? <img className='imagenpokemon' src={poke.image} alt="NoIMG" /> : <img className='imagenpokemonalt' src={pokeball} alt='Noimg' />}


                    {poke.id === undefined && <h1 className='Prueba2'>NO EXISTE ESTE POKEMON</h1>}
                    {poke.types === undefined && null}
                    {/* {poke.types ? <h3>Tipos:</h3> : null} */}
                    <div className='tiposbox'>
                        {poke.types ? poke.types.map((x) => { return <span className='tipou'>{x.type.name}</span> }) : null}
                    </div>



                </div>
                <div className='aleja2'>

                    {poke.id ? <h3>Pokedex id: {poke.id}</h3> : null}

                    {/* {poke.hp ? <h2 className='stats'>Stats</h2> : null} */}
                    {poke.hp ? <img src={stats} alt="Noimg" /> : null}


                    <div className='tiposdiv'>
                        {poke.hp ? <h4 className='vida '>HP: {poke.hp}</h4> : null}
                        {poke.attack ? <h4 className='ataque'>ATAQUE: {poke.attack}</h4> : null}
                        {poke.defense ? <h4 className='defensa'>DEFENSA: {poke.defense}</h4> : null}
                        {poke.speed ? <h4 className='velocidad'>VELOCIDAD: {poke.speed}</h4> : null}
                        {poke.weight ? <h4 className='peso'>PESO: {poke.weight / 10} (Kg)</h4> : null}
                        {poke.height ? <h4 className='altura'>ALTURA: {poke.height / 10}(M)</h4> : null}
                    </div>

                </div>





            </div> : <h1>No existe</h1>}
        </div>


    )

}

export default PokemonDetail;