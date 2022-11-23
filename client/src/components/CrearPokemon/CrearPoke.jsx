import React from 'react';
import { useState, useEffect } from 'react';
import './CrearPoke.css';
import axios from 'axios';
import NavBar from '../NavBar/NavBar.jsx';
import { useDispatch, useSelector } from "react-redux";
import { getAllTypes } from '../../redux/actions';
import pikachu from './pikachu.png'




function CreatePoke() {

    const dispatch = useDispatch();
    const types = useSelector((state) => state.types)
    const [input, setInput] = useState({
        name: '',
        hp: 1,
        attack: 1,
        defense: 1,
        speed: 1,
        height: 1,
        weight: 1,
        image: '',
        types: [],

    })
    const [message, setMessage] = useState("");
    const [errors, setErrors] = useState({});
    const noNumbers = /^([^0-9]*)$/
    const Numbers = /^[0-9]*$/


    useEffect(() => {
        dispatch(getAllTypes());
    }, []);






    function nombreValidator(e) {
        setInput({ ...input, name: e.target.value });
        if (noNumbers.test(e.target.value)) {
            setErrors({ ...errors, name: '' })
        }
        else {
            setErrors({ ...errors, name: 'El nombre no puede contener numeros' })
        }
    };

    function vidaValidator(e) {
        setInput({ ...input, hp: e.target.value });
        if (Numbers.test(e.target.value)) {
            setErrors({ ...errors, hp: '' })
        }
        else {
            setErrors({ ...errors, hp: 'La vida no puede contener letras o ser menor que 1.' })
        };
    }

    function ataqueValidator(e) {
        setInput({ ...input, attack: e.target.value });
        if (Numbers.test(e.target.value)) {
            setErrors({ ...errors, attack: '' })
        }
        else {
            setErrors({ ...errors, attack: 'El ataque no puede contener letras o ser menor que 1.' })
        }

    }
    function defensaValidator(e) {
        setInput({ ...input, defense: e.target.value });
        if (Numbers.test(e.target.value)) {
            setErrors({ ...errors, defense: '' })
        }
        else {
            setErrors({ ...errors, defense: 'La defensa no puede contener letras o ser menor que 1.' })
        }
    }

    function velocidadValidator(e) {
        setInput({ ...input, speed: e.target.value });
        if (Numbers.test(e.target.value)) {
            setErrors({ ...errors, speed: '' })
        }
        else {
            setErrors({ ...errors, speed: 'La velocidad no puede contener letras o ser menor que 1.' })
        }
    }

    function alturaValidator(e) {
        setInput({ ...input, height: e.target.value });
        if (Numbers.test(e.target.value)) {
            setErrors({ ...errors, height: '' })
        }
        else {
            setErrors({ ...errors, height: 'La altura no puede contener letras o ser menor que 1.' })
        }
    }


    function pesoValidator(e) {
        setInput({ ...input, weight: e.target.value });
        if (Numbers.test(e.target.value)) {
            setErrors({ ...errors, weight: '' })
        }
        else {
            setErrors({ ...errors, weight: 'El peso no puede contener letras o ser menor que 1.' })
        }
    }

    function tiposValidator(e) {
        if (e.target.value === "all") {
            return "xd"
        }
        if (!input.types.includes(e.target.value)) {
            setInput({ ...input, types: [...input.types, e.target.value] })
        }
    }

    function borrarType(el) {
        setInput({ ...input, types: input.types.filter((param) => param !== el) })
    }

    function imagenValidator(e) {
        setInput({ ...input, image: e.target.value })
    }



    let verdadAbsoluta = (errors) => {
        if (errors.name || errors.attack || errors.defense || errors.speed || errors.height || errors.weight || errors.hp) {
            return true
        } else { return false }
    }
    let post = async (e) => {
        e.preventDefault();
        try {
            if (input.name === '' && input.attack === 1 && input.defense === 1 && input.speed === 1 && input.height === 1 && input.weight === 1 && input.hp === 1 && input.types === [] && input.image==='') {
                return setMessage('Todos los campos estan por defecto')
            }

            if(input.name===''){
                return setMessage('El nombre es necesario')
            }

            if (input.types[0] !== undefined) {
                let res2 = await axios.post("http://localhost:3001/pokemon2", {
                    name: input.name,
                    hp: input.hp,
                    attack: input.attack,
                    defense: input.defense,
                    speed: input.speed,
                    weight: input.weight,
                    height: input.height,
                    image: input.image,
                    types: input.types
                })
                console.log(res2.data)
                if (res2.data === "llave duplicada viola restricción de unicidad «pokemons_name_key83»") {
                    return setMessage('Este Pokemon ya existe');
                }
                if (res2.data === 'Se ha creado el pokemon correctamente') {
                    setInput({
                        name: '',
                        hp: 1,
                        attack: 1,
                        defense: 1,
                        speed: 1,
                        height: 1,
                        weight: 1,
                        image: '',
                        types: []
                    })
                    return setMessage("Pokemon creado correctamente");

                } else {
                    return setMessage("Error interno...")
                }



            }
            let res = await axios.post("http://localhost:3001/pokemon", {
                name: input.name,
                hp: input.hp,
                attack: input.attack,
                defense: input.defense,
                speed: input.speed,
                weight: input.weight,
                height: input.height,
                image: input.image
            });
            if (res.data === "llave duplicada viola restricción de unicidad «pokemons_name_key83»") {
                return setMessage('Este pokemon ya existe');
            }
            if(res.data=== 'vida grande'){
                return setMessage('Funciona')
            }
            if (res.data === 'Se ha creado el Pokemon correctamente') {
                setInput({
                    name: '',
                    hp: 1,
                    attack: 1,
                    defense: 1,
                    speed: 1,
                    height: 1,
                    weight: 1,
                    types: []
                })
                setMessage("Pokemon creado correctamente");

            } else {
                setMessage("Algo malo ocurrio")
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='prueba'>
            <div>
                <NavBar></NavBar>
            </div>




            {/* <img src="https://www.elblogdelasalud.info/animales/wp-content/uploads/2018/09/Raza-Golden-Retriever.jpg" alt="NOIMG" /> */}



            <img className='pika' src={pikachu} alt="Noimg" />
            <h1 className="creatup">CREA TU POKEMON</h1>




            <form className='formulario' onSubmit={post}>
                <div className='divprueba'>
                    <div className='divunico'>
                        <p>Nombre</p>

                        <input  required className='inputs' type="text"
                            value={input.name}
                            placeholder='Ingrese el nombre de el Pokemon...'
                            onChange={(e) => { nombreValidator(e) }}
                        />
                        <div className="message-error">{errors ? <p>{errors.name}</p> : null} </div>
                    </div>
                    <div className='divunico'>
                        <p> Vida</p>

                        <input required className='inputs' type="number"
                            value={input.hp}
                            placeholder='Ingrese la vida de su pokemon...'
                            onChange={(e) => { vidaValidator(e) }}
                        />
                        <div className="message-error">{errors ? <p>{errors.hp}</p> : null} </div>


                    </div>

                    <div className='divunico'>
                        <p> Ataque</p>

                        <input required className='inputs' type="number"
                            value={input.attack}
                            placeholder='Ingrese el ataque de su pokemon...'
                            onChange={(e) => { ataqueValidator(e) }}
                        />
                        <div className="message-error">{errors ? <p>{errors.attack}</p> : null} </div>

                    </div>
                </div>

                <div className='divprueba'>
                    <div className='divunico'>
                        <p>Defensa</p>

                        <input required className='inputs' type="number"
                            value={input.defense}
                            placeholder='Ingrese la defensa...'
                            onChange={(e) => { defensaValidator(e) }}
                        />
                        <div className="message-error">{errors ? <p>{errors.defense}</p> : null} </div>

                    </div>
                    <div className='divunico'>
                        <p>Velocidad (m)</p>

                        <input required className='inputs' type="number"
                            value={input.speed}
                            placeholder='Ingrese la velocidad...'
                            onChange={(e) => { velocidadValidator(e) }}
                        />
                        <div className="message-error">{errors ? <p>{errors.speed}</p> : null} </div>

                    </div>
                    <div className='divunico'>
                        <p >Altura</p>
                        <input required className='inputs' type="number"
                            value={input.height}
                            placeholder='Ingrese la altura...'
                            onChange={(e) => { alturaValidator(e) }}
                        />
                        <div className="message-error">{errors ? <p>{errors.height}</p> : null} </div>
                    </div>


                </div>

                <div className='divprueba'>

                    <div className='divunico'>
                        <p>Peso</p>

                        <input required className='inputs' type="number"
                            value={input.weight}
                            placeholder='Introduzca el peso...'
                            onChange={(e) => { pesoValidator(e) }}
                        />
                        <div className="message-error">{errors ? <p>{errors.weight}</p> : null} </div>
                    </div>
                    <div className='divunico'>
                        <p >URL de la imagen</p>
                        <input className='inputs' type="text"
                            value={input.image}
                            placeholder='Introduzca la URL de la imagen'
                            onChange={(e) => { imagenValidator(e) }}
                        />

                    </div>

                </div>


                <div className='tipos'>
                    <p className='ptypes'>Types </p>
                    <select required className='select' onChange={(e) => { tiposValidator(e) }}>
                        <option value="all">All</option>
                        {types ? types.map((x) => {
                            return (
                                <option key={x.id} value={x.name}>
                                    {x.name}
                                </option>)
                        }) : null}
                    </select>

                    <div className='tiposxd'>
                        {input.types ? input.types.map((e) => {
                            return <>
                                <div className='untipo'>
                                    {e}
                                </div>
                                <button className='untipoboton' onClick={() => { borrarType(e) }}>X</button>
                            </>
                        }) : null}
                    </div>
                </div>




                <div className="message">{message ? <p className='ri'>{message}</p> : null} </div>



                <button className='btn btn-green' type="submit" disabled={verdadAbsoluta(errors) && 'true'}>Crear Pokemon</button>

            </form>
        </div>



    );
}

export default CreatePoke;