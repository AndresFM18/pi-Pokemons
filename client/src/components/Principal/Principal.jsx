import React, { useEffect, useState } from 'react'
import PokemonCard from '../PokemonCard/PokemonCard.jsx';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from '../NavBar/NavBar';
import './Principal.css';
import { getAllPokemons, getAllTypes, getFirstPage, searchBar, attackFilter, getOriginalPokemons, attackFilterSecond, nameFilter, nameFilterSecond, getDbOnly, getDbOnlySecond, getApiOnly, getApiOnlySecond, soloapifunc, apisub3func, exclusiveFunc, backupdbfunc } from '../../redux/actions/index.js';
import interrogacion from './interrogacion.png'

const Principal = () => {

    const noNumbers = /^([^0-9]*)$/


    function nameValidator(e) {
        setNombre(e.target.value);
        if (noNumbers.test(e.target.value)) {
            setErrors({ ...errors, name: '' })
        }
        else {
            setErrors({ ...errors, name: 'El nombre no puede contener numeros' })
        }
    };
    const [bandera, setBandera] = useState(true)
    const [bandera2, setBandera2] = useState(true)
    const [bandera3, setBandera3] = useState(false)
    const [bandera4, setBandera4] = useState(false)
    const [bandera5, setBandera5] = useState(false)
    const [bandera6, setBandera6] = useState(false)
    const [bandera7, setBandera7] = useState(false)
    const [bandera8, setBandera8] = useState(false)
    const [bandera9, setBandera9] = useState(false)
    const [bandera10, setBandera10] = useState(false)
    const [bandera11, setBandera11] = useState(false)
    const [bandera12, setBandera12] = useState(false)
    const [bandera13, setBandera13] = useState(false)

    const [pokeshow, setPoke] = useState([])
    const [errors, setErrors] = useState({})
    const [nombre, setNombre] = useState("");

    // const dbonly = 'Database'
    // const apionly = 'Api'
    const funcionlimpiadora = function (array) {
        if (bandera10 === true) {
            setBandera(false)
            setBandera2(true)
            setBandera3(false)
            setBandera5(false)
            setBandera7(false)
            setBandera8(false)
            setBandera10(false)
            setBandera12(false)
            setPoke(array)
            return "xd"
        }


        setBandera(false)
        setBandera2(true)
        setBandera3(false)
        setBandera5(false)
        setBandera7(false)
        setBandera12(false)
        setPoke(array)
    }
    const funcionlimpiadora2 = function () {
        if (nombre) {
            dispatch(searchBar(nombre))
            setBandera2(false)
            setBandera5(false)
            setBandera(false)
            setBandera7(false)
            setBandera12(false)
            setBandera8(false)
            setBandera3(true)
            setBandera10(false)


        }


    }
    const funcionlimpiadora3 = function () {

        if (bandera11 === true) {
            if (bandera4 === false) {
                setBandera2(false)
                setBandera(false)
                setBandera3(false)
                setBandera7(false)
                setBandera5(false)
                setBandera8(false)
                setBandera10(false)
                setBandera12(true)
                setBandera13(false)
                dispatch(attackFilter(backup, bandera4))
                dispatch(exclusiveFunc(soloapi, bandera4))
                setBandera4(true)
            } else {
                setBandera2(false)
                setBandera(false)
                setBandera3(false)
                setBandera7(false)
                setBandera5(false)
                setBandera8(false)
                setBandera10(false)
                setBandera(false)
                setBandera12(true)
                setBandera13(false)
                dispatch(attackFilter(backup, bandera4))
                dispatch(exclusiveFunc(backup2, bandera4))
                setBandera4(false)
            }
            // funcion second de ataque pasar fifht array[0] original para que lo suelte en second
            //
            return "xd"

        }
        if (bandera9 === true) {
            if (bandera4 === false) {
                setBandera2(false)
                setBandera(false)
                setBandera3(false)
                setBandera7(false)
                setBandera5(true)
                setBandera8(false)
                dispatch(attackFilter(solodb, bandera4))
                dispatch(attackFilterSecond(solodb, bandera4))
                setBandera4(true)
            } else {
                setBandera2(false)
                setBandera(false)
                setBandera3(false)
                setBandera7(false)
                setBandera8(false)
                setBandera5(true)
                dispatch(attackFilterSecond(solodb, bandera4))
                dispatch(attackFilter(solodb, bandera4))
                setBandera4(false)
            }

            return "xd"

        };

        if (bandera4 === false) {
            setBandera2(false)
            setBandera(false)
            setBandera3(false)
            setBandera7(false)
            setBandera8(false)
            setBandera10(false)
            setBandera5(true)

            dispatch(attackFilter(original, bandera4))
            dispatch(attackFilterSecond(original, bandera4))
            setBandera4(true)
        } else {
            setBandera2(false)
            setBandera(false)
            setBandera3(false)
            setBandera7(false)
            setBandera8(false)
            setBandera10(false)
            setBandera5(true)
            dispatch(attackFilterSecond(original, bandera4))
            dispatch(attackFilter(original, bandera4))
            setBandera4(false)
        }

    }

    const funcionlimpiadora4 = function () {
        if (bandera11 === true) {
            if (bandera6 === false) {
                setBandera2(false)
                setBandera(false)
                setBandera3(false)
                setBandera7(true)
                setBandera5(false)
                setBandera8(false)
                setBandera10(false)
                setBandera(false)
                setBandera12(false)
                setBandera13(false)

                dispatch(nameFilter(backup, bandera6))
                dispatch(nameFilterSecond(soloapi, bandera6))
                setBandera6(true)
            } else {
                setBandera2(false)
                setBandera(false)
                setBandera3(false)
                setBandera7(true)
                setBandera5(false)
                setBandera8(false)
                setBandera10(false)
                setBandera13(false)
                setBandera(false)
                setBandera12(false)
                dispatch(nameFilter(backup, bandera6))
                dispatch(nameFilterSecond(backup2, bandera6))
                setBandera6(false)
            }

            return "xd"
        }

        if (bandera9 === true) {
            if (bandera6 === false) {
                setBandera2(false)
                setBandera(false)
                setBandera3(false)
                setBandera7(true)
                setBandera5(false)
                setBandera8(false)
                setBandera12(false)
                dispatch(nameFilter(solodb, bandera6))
                dispatch(nameFilterSecond(solodb, bandera6))
                setBandera6(true)
            } else {
                setBandera2(false)
                setBandera(false)
                setBandera3(false)
                setBandera5(false)
                setBandera8(false)
                setBandera7(false)
                setBandera12(false)
                setBandera13(true)
                dispatch(nameFilter(backupdb, bandera6))
                dispatch(nameFilterSecond(backupdb, bandera6))
                setBandera6(false)
            }

            return "xd"

        }

        if (bandera6 === false) {
            setBandera2(false)
            setBandera(false)
            setBandera3(false)
            setBandera5(false)
            setBandera7(true)
            dispatch(nameFilter(original, bandera6))
            dispatch(nameFilterSecond(original, bandera6))
            setBandera6(true)
        } else {
            setBandera2(false)
            setBandera(false)
            setBandera3(false)
            setBandera5(false)
            setBandera7(true)
            dispatch(nameFilter(original, bandera6))
            dispatch(nameFilterSecond(original, bandera6))
            setBandera6(false)
        }
    };

    const funcionlimpiadora5 = function () {
        setBandera(false)
        setBandera2(false)
        setBandera3(false)
        setBandera5(false)
        setBandera7(false)
        setBandera11(false)
        setBandera12(false)
        dispatch(getDbOnly())
        dispatch(getDbOnlySecond())
        setBandera8(true)
        setBandera9(true)
    }

    const funcionlimpiadora6 = function () {
        setBandera(false)
        setBandera2(false)
        setBandera3(false)
        setBandera5(false)
        setBandera7(false)
        setBandera8(false)
        setBandera9(false)
        dispatch(getApiOnly())
        dispatch(getApiOnlySecond())
        setBandera10(true)
        setBandera11(true)
    }

    const redirectionfunc = function (e) {
        window.location.replace(`http://localhost:3000/types/${e.target.value}`);
    }

    const dispatch = useDispatch();
    var exclusive = useSelector((state) => state.exclusive)
    var error = useSelector((state) => state.error)
    var backup2 = useSelector((state) => state.backup)
    var backup = useSelector((state) => state.backup)
    var solodb = useSelector((state) => state.fourth)
    var soloapi = useSelector((state) => state.fifth)
    var third = useSelector((state) => state.third)
    var original = useSelector((state) => state.originalPokemons)
    var searchbar = useSelector((state) => state.searchBar)
    const pokemons = useSelector((state) => state.pokemons)
    var first = useSelector((state) => state.first)
    var second = useSelector((state) => state.second)
    const types = useSelector((state) => state.types)
    var backupdb = useSelector((state) => state.dbbackup)



    useEffect(() => {
        dispatch(getAllPokemons())
        dispatch(getAllTypes())
        dispatch(getFirstPage())
        dispatch(getOriginalPokemons())
        dispatch(soloapifunc())
        dispatch(apisub3func())
        dispatch(backupdbfunc())

    }, [])

    return (

        <div className='fondo'>


            <NavBar>

            </NavBar>

            {/* CAMBIAR INDEX A SUGERENCIAS */}

            <div className='modificadores'>

                <select className='select2' onChange={(e) => { redirectionfunc(e) }}>
                    <option value="all">Type Filter</option>
                    {types ? types.map((x) => {
                        return (
                            <option key={x.id} value={x.name}>
                                {x.name}
                            </option>)
                    }) : null}
                </select>

                <input className='search' value={nombre} placeholder='Ingrese un nombre de un pokemon' onChange={(e) => { nameValidator(e) }} type="text" name='SearchBar' />

                <button className='boton2' disabled={errors.name && 'true'} onClick={() => { funcionlimpiadora2() }} name='SearchBar_Button'>Buscar</button>

                <div className="message-error">{errors ? <p>{errors.name}</p> : null} </div>





                <button className='organizador boton2' onClick={() => { funcionlimpiadora3() }}>Ordenar por Ataque</button>

                <button className='boton2' onClick={() => { funcionlimpiadora4() }}>Ordenar por nombre</button>

                <button className='boton2' onClick={() => { funcionlimpiadora5() }}>SOLO DB</button>

                <button className='boton2' onClick={() => { funcionlimpiadora6() }}>SOLO API</button>
            </div>
            <div>
                {pokemons ? pokemons.map((x) => { return <button className='botones' onClick={() => { funcionlimpiadora(x) }}></button> }) : <h1>No funciona</h1>}
            </div>



            {bandera && <div className='contenedordecards'>
                {bandera && first ? first.map((x) => { return <PokemonCard id={x.id} name={x.name} image={x.image} types={x.types} /> }) : null}
            </div>}

            {bandera2 && <div className='contenedordecards'>
                {pokeshow ? pokeshow.map((x) => { return <PokemonCard id={x.id} name={x.name} image={x.image} types={x.types} /> }) : null}
            </div>}
            {bandera12 && <div className='contenedordecards'>
                {exclusive ? exclusive.map((x) => { return <PokemonCard id={x.id} name={x.name} image={x.image} types={x.types} /> }) : null} </div>}
            {bandera3 && <div>
                {searchbar ? <PokemonCard id={searchbar.id || null} name={searchbar.name} image={searchbar.image || interrogacion} types={searchbar.types} /> : null}
            </div>}
            {bandera13 && <div className='contenedordecards'>
                {backupdb ? backupdb.map((x) => { return <PokemonCard id={x.id} name={x.name} image={x.image} types={x.types} /> }) : null} </div>}

            {bandera5 && <div className='contenedordecards'>
                {second ? second.map((x) => { return <PokemonCard id={x.id} name={x.name} image={x.image} types={x.types} /> }) : null}
            </div>}

            {bandera7 && <div className='contenedordecards'>
                {third ? third.map((x) => { return <PokemonCard id={x.id} name={x.name} image={x.image} types={x.types} /> }) : null} </div>}

            {bandera8 && <div className='contenedordecards'>
                {solodb ? solodb.map((x) => { return <PokemonCard id={x.id} name={x.name} image={x.image} types={x.types} /> }) : null} </div>}

            {bandera10 && <div className='contenedordecards'>
                {soloapi ? soloapi.map((x) => { return <PokemonCard id={x.id} name={x.name} image={x.image} types={x.types} /> }) : null} </div>}






            {/* FALTA CUBRIR EL ID DE LOS NOT FOUND, BASTANTE CSS ( cards, botones, searchbar, EN GENERAL CASI TODA LA RUTA PRINCIPAL, FALTAN ORDENAMIENTOS (TOMARTELOS EN SERIO ESTA VEZ (POR ATAQUE Y ALFABETICO
    
    SI SOBRA TIEMPO UN POQUITO DE CSS EN LA RUTA DE DETALLES Y ARREGLAR EL PIKACHU DE LA CREACION ))) */}


        </div >

    )

}

export default Principal;