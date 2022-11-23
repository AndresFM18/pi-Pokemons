const { Router } = require('express');
const { Pokemon, Poke_Type, Type } = require('../db')
const axios = require('axios')
const { Op } = require('sequelize')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/types', async function (req, res) {
    let limpio = [];

    const existen = await Type.findByPk(1);
    if (existen) {
        await Type.findAll()
            .then((temp) => { return res.send(temp) })
    } else {
        await axios.get(`https://pokeapi.co/api/v2/type`)
            .then((response) => {
                respuesta = response.data.results
                let result = respuesta.map(x => { return x.name })

                try {
                    result.map((string) => { Type.create({ name: string }) })
                } catch (error) {
                    console.log(error.messagge)
                }
                return res.send(result)
            })
    }
})

router.get('/pokemons', async function (req, res) {
    const nombre = req.query.nombre;

    if (nombre) {
        try {
            let todos = [];
            await Pokemon.findAll({ where: { [Op.and]: [{ id: { [Op.gt]: 905 } }, { name: nombre }] }, })
                .then(async (poke) => {
                    if (poke[0] != undefined) {
                        return res.send(poke)
                    } else {
                        try {



                            await axios.get(`https://pokeapi.co/api/v2/pokemon/${nombre}`)
                                .then((response) => {

                                    poke = response.data
                                    if (response.status === 200) {
                                        const obj = {
                                            id: poke.id,
                                            image: poke.sprites.front_default,
                                            name: poke.name,
                                            types: poke.types,
                                            hp: poke.stats[0]['base_stat'],
                                            attack: poke.stats[1]["base_stat"],
                                            defense: poke.stats[2]["base_stat"],
                                            speed: poke.stats[5]["base_stat"],
                                            height: poke.height,
                                            weight: poke.weight
                                        }
                                        return res.send(obj)
                                    } else {
                                        return res.send("Este pokemon no existe ni en la api ni en la base de datos")
                                    }



                                })
                        } catch (error) {
                            return res.send(error.message)
                        }

                        // return res.send('no se encontro en la base')
                    }
                })

            // if (bandera == false) {
            //    
            // }

            return "xd"
            //    if(pokedb){
            //     return res.send(pokedb)
            //    }
            // const busqueda = await axios.get(`https://pokeapi.co/api/v2/pokemon/${nombre}`)
            // return res.send(busqueda.data)
        } catch (error) {
            return console.log(error.message)
        }

    }

    const existen = await Pokemon.findByPk(1);
    if (existen) {
        await Pokemon.findAll({ include: Type })
            .then((temp) => { return res.send(temp) })

        //https://pokeapi.co/api/v2/pokemon/1/
    } else {
        try {
            var arreglopoke = []
            for (let i = 1; i <= 40; i++) {
                const poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`)
                let obj = {
                    id: poke.data.id,
                    name: poke.data.name,
                    hp: poke.data.stats[0]["base_stat"],
                    attack: poke.data.stats[1]["base_stat"],
                    defense: poke.data.stats[2]["base_stat"],
                    speed: poke.data.stats[5]["base_stat"],
                    height: poke.data.height,
                    weight: poke.data.weight,
                    image: poke.data.sprites.front_default,
                    types: poke.data.types
                }
                arreglopoke.push(obj)
            }
            for (let x = 0; x < arreglopoke.length; x++) {
                let newpoke = await Pokemon.create({
                    id: arreglopoke[x].id,
                    name: arreglopoke[x].name,
                    hp: arreglopoke[x].hp,
                    attack: arreglopoke[x].attack,
                    defense: arreglopoke[x].defense,
                    speed: arreglopoke[x].speed,
                    height: arreglopoke[x].height,
                    weight: arreglopoke[x].weight,
                    image: arreglopoke[x].image
                })

                var desorden = arreglopoke[x].types


                var orden = desorden.map((x) => { return x["type"]["name"] })

                let tempi = []
                for (let y = 0; y < orden.length; y++) {
                    await Type.findAll({
                        where: { name: orden[y] }
                    })
                        .then((temp) => { tempi[y] = temp[0]["id"] })
                }
                tempi.map(async (tempid) => {
                    await Poke_Type.create({
                        pokemonId: newpoke.id,
                        typeId: tempid
                    })
                })
            }



            return res.send("Pokemones creados correctamente")
        } catch (error) {
            return res.send(error.message)
        }

    }
})

router.post('/pokemon', async function (req, res) {

    const { name, hp, attack, defense, speed, height, weight, image } = req.body;

    let vida = Number(hp);
    let ataque = Number(attack);
    let defenza = Number(defense);
    let velocidad = Number(speed);
    let altura = Number(height);
    let anchura = Number(weight);

    try {
        if (typeof name != 'string') {
            return res.send('El nombre deber ser una string')
        }
        if (isNaN(vida)) {
            return res.send('La vida debe ser un numero')
        }
        if (isNaN(ataque)) {
            return res.send('El ataque debe ser un numero')
        }
        if (isNaN(defenza)) {
            return res.send('La defenza debe ser un numero')
        }
        if (isNaN(velocidad)) {
            return res.send('La velocidad debe ser un numero')
        }
        if (isNaN(altura)) {
            return res.send('La altura debe ser un numero')
        }
        if (isNaN(anchura)) {
            return res.send('La anchura debe ser un numero')
        }

    } catch (error) {
        return res.send(error.message)
    }

    try {
        await Pokemon.create({
            name: name,
            hp: vida,
            attack: ataque,
            defense: defenza,
            speed: velocidad,
            height: altura,
            weight: anchura,
            image: image
        })
            .then((creacion) => {
                if (creacion) {
                    return res.send('Se ha creado el Pokemon correctamente')
                } else {
                    return res.send('No se ha creado El Pokemon')
                }
            })
    } catch (error) {
        return res.send(error.message)
    }

})

router.post("/pokemon2", async function (req, res) {

    const { types, name, hp, attack, defense, speed, height, weight, image } = req.body;


    let vida = Number(hp);
    let ataque = Number(attack);
    let defensa = Number(defense);
    let velocidad = Number(speed);
    let altura = Number(height);
    let peso = Number(weight);

    try {
        if (typeof name != 'string') {
            return res.send('El nombre deber ser una string')
        }
        if (isNaN(vida)) {
            return res.send('La vida debe ser un numero')
        }
       if(vida>9007199254740991){
        return res.send('vida grande')
       }
        if (isNaN(ataque)) {
            return res.send('El ataque debe ser un numero')
        }
        if (isNaN(defensa)) {
            return res.send('La defensa debe ser un numero')
        }
        if (isNaN(velocidad)) {
            return res.send('La velocidad debe ser un numero')
        }
        if (isNaN(altura)) {
            return res.send('La altura debe ser un numero')
        }
        if (isNaN(peso)) {
            return res.send('El peso debe ser un numero')
        }
    } catch (error) {
        return res.send(error.message)
    }

    try {

        const pokenew = await Pokemon.create({
            name: name,
            hp: vida,
            attack: ataque,
            defense: defensa,
            speed: velocidad,
            height: altura,
            weight: peso,
            image: image
        });

        let tempi = [];

        for (let x = 0; x < types.length; x++) {
            await Type.findAll({
                where: { name: types[x] }
            })
                .then((temp) => { tempi[x] = temp[0]["id"] })
        }


        tempi.map(async (tempid) => {
            await Poke_Type.create({
                pokemonId: pokenew.id,
                typeId: tempid
            })
        })

        //let pipe = await Raza.findAll({ include: Temperamento })
        return res.send('Se ha creado el pokemon correctamente')
    } catch (error) {
        return console.log(error.message)
    }

})

router.get('/pokemon/:id', async function (req, res) {
    const id = req.params.id
    const Number_id = Number(id);

    if (isNaN(Number_id)) {
        try {
            return res.send('el id debe ser un numero')
        } catch (error) {
            return res.send(error.message)
        }
    }
    if (Number_id <= 0) {
        try {
            return res.send('El id debe ser mayor a 0')
        } catch (error) {
            return res.send(error.message)
        }
    }
    if (Number_id % 1 != 0) {
        try {
            return res.send('El id no puede ser decimal ')
        } catch (error) {
            return res.send(error.message)
        }
    }
    try {
        if (id > 905) {
            await Pokemon.findByPk(id)
                .then((encontrado) => { if (encontrado) { return res.send(encontrado) } else { return res.send('No existe en la base') } })
        }
        const poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        const obj = {
            image: poke.data.sprites.front_default,
            id: poke.data.id,
            name: poke.data.name,
            types: poke.data.types,
            hp: poke.data.stats[0]["base_stat"],
            attack: poke.data.stats[1]["base_stat"],
            defense: poke.data.stats[2]["base_stat"],
            speed: poke.data.stats[5]["base_stat"],
            height: poke.data.height,
            weight: poke.data.weight
        }
        return res.send(obj)
    } catch (error) {
        return console.log(error.message)
    }


})

router.get('/debug', async function (req, res) {
    const types = req.body.types;
    let arreglo = types.split(',')
    console.log(arreglo)
    let tempi = []

    for (let x = 0; x < arreglo.length; x++) {
        await Type.findAll({
            where: { name: arreglo[x] }
        })
            .then((temp) => { tempi[x] = temp[0]["id"] })
    }

    return res.send(tempi)
    //    await Type.findOne({where:{name: types[0]}})
    //     .then((resp) =>{console.log(resp)})
})
router.get('/database', async function (req, res) {

    try {
        await Pokemon.findAll({ where: { id: { [Op.gt]: 905 } }, include: Type })
            .then((pokemons) => {
                return res.send(pokemons)
            })
    } catch (error) {
        return res.send(error.message)
    }
})

router.get('/apicall', async function (req, res) {
    try {
        await Pokemon.findAll({ where: { id: { [Op.lt]: 905 } }, include: Type })
            .then((pokemons) => {
                return res.send(pokemons)
            })
    } catch (error) {
        return res.send(error.message)
    }
})

router.get('/nombredb', async function (req, res) {
    const nombre = req.query.nombre;
    if (nombre) {
        try {
            await Pokemon.findAll({ where: { [Op.and]: [{ id: { [Op.gt]: 905 } }, { name: nombre }] }, include: Type })
                .then((respe) => {
                    if (respe[0] != undefined) {
                        return res.send(respe)
                    } else {
                        return res.send("No se encontro en la base")
                    }
                })
        } catch (error) {
            return res.send(error.message)
        }
    }

})

router.get('/searchbar', async function (req, res) {
    const nombre = req.query.nombre
    console.log(nombre)

    if (nombre) {
        try {
            await Pokemon.findAll({ where: { name: nombre }, include: Type })
                .then(async (poke) => {
                    if (poke[0] != undefined) {
                        return res.send(poke)
                    } else {
                        await axios.get(`https://pokeapi.co/api/v2/pokemon/${nombre}`)
                            .then((response) => {
                                var respuesta = response.data
                                if (respuesta !== "Request failed with status code 404") {
                                    return res.send(respuesta)
                                }

                            })
                    }

                })
        } catch (error) {
            return res.send(error.message)
        }
    } else {
        return res.send('Request failed with status code 404')
    }


})
//HACER NUEVA RUTA DONDE PRIMERO SE BUSQUE EN LA DATABASE SI LO ENCUENTRA RETORNALO
//SINO BUSCA EN LA API Y SINO RETORNA "NOT FOUND"
module.exports = router;
