import axios from 'axios';

export const GET_TYPES = 'GET_TYPES'
export const GET_POKEMON_ID = 'GET_POKEMON_ID'
export const GET_POKEMONS = 'GET_POKEMONS'
export const FIRST_RENDER = 'FIRST_RENDER'
export const SEARCH_BAR = 'SEARCH_BAR'
export const ATTACK_FILTER = 'ATTACK_FILTER'
export const GET_ORIGINAL_POKEMONS = 'GET_ORIGINAL_POKEMONS'
export const ATTACK_FILTER_SECOND = 'ATTACK_FILTER_SECOND'
export const NAME_FILTER = 'NAME_FILTER'
export const NAME_FILTER_SECOND = 'NAME_FILTER_SECOND'
export const DB_ONLY_FILTER = 'DB_ONLY_FILTER'
export const DB_ONLY_FILTER_SECOND = 'DB_ONLY_FILTER_SECOND'
export const API_ONLY_FILTER = 'API_ONLY_FILTER'
export const API_ONLY_FILTER_SECOND = 'API_ONLY_FILTER_SECOND'
export const soloapi = 'soloapi'
export const apisub3 = 'apisub3'
export const GET_FILTERED_TYPE = 'GET_FILTERED_TYPE'
export const GET_FIRST_TYPE = 'GET_FIRST_TYPE'
export const ERROR = 'ERROR'
export const EXCLUSIVE_ATTACK_FILTER = 'EXCLUSIVE_ATTACK_FILTER'
export const DB_ORIGINAL = 'DB_ORIGINAL'

export const getAllTypes = () => {
    return async (dispatch) => {
        await axios.get("http://localhost:3001/types")
            .then((res) => {
                var respuesta = res.data
                dispatch({ type: GET_TYPES, payload: respuesta })
            })
    }
};

export const getPokeId = (id) => {
    return async (dispatch) => {
        await axios.get(`http://localhost:3001/pokemon/${id}`)
            .then((response) => {
                var respuesta = response.data
                dispatch({ type: GET_POKEMON_ID, payload: respuesta })
            })
    }
};

export const getAllPokemons = () => {
    return async (dispatch) => {
        var apiarray = [];
        var dbarray = [];

        await axios.get(`http://localhost:3001/database`)
            .then((response) => {
                var respuesta = response.data
                dbarray = respuesta;
            })
        await axios.get(`http://localhost:3001/apicall`)
            .then((responsea) => {
                var respuesta = responsea.data
                apiarray = respuesta;
            })


        let arraydefinitivo = dbarray.concat(apiarray)
        let arreglopaginado = [];
        for (let i = 0; i < arraydefinitivo.length; i += 12) {
            let division = arraydefinitivo.slice(i, i + 12);
            arreglopaginado.push(division);
        }
        dispatch({ type: GET_POKEMONS, payload: arreglopaginado })



    };
};

export const getFirstPage = () => {

    return async (dispatch) => {
        var apiarray = [];
        var dbarray = [];

        await axios.get(`http://localhost:3001/database`)
            .then((response) => {
                var respuesta = response.data
                dbarray = respuesta;
            })
        await axios.get(`http://localhost:3001/apicall`)
            .then((responsea) => {
                var respuesta = responsea.data
                apiarray = respuesta;
            })


        let arraydefinitivo = dbarray.concat(apiarray)
        let arreglopaginado = [];
        for (let i = 0; i < arraydefinitivo.length; i += 12) {
            let division = arraydefinitivo.slice(i, i + 12);
            arreglopaginado.push(division);
        }
        dispatch({ type: FIRST_RENDER, payload: arreglopaginado[0] })



    }
}

export const searchBar = (nombre) => {
    return async (dispatch) => {
        // var bandera = false

        if (!nombre) {
            dispatch({ type: ERROR, payload: [{ error: "NO NAME PROVIDED" }] })
            return "xd"
        }

        // await axios.get(`http://localhost:3001/nombredb?nombre=${nombre}`)
        //     .then((response) => {
        //         var arr = []
        //         if (response.data !== "No se encontro en la base") {
        //             bandera = true
        //             let obj = {
        //                 name: response.data.name,
        //                 image: response.data.image,
        //                 types: response.data.types
        //             }
        //             arr.push(obj)
        //             dispatch({ type: SEARCH_BAR, payload: arr })

        //         }
        //     })
        // if (bandera === false) {
        //     return "xd"
        // }
        await axios.get(`http://localhost:3001/searchbar?nombre=${nombre}`)
            .then((response) => {
                var respuesta = response.data
                if (respuesta === 'Request failed with status code 404') {

                    dispatch({ type: ERROR, payload: [{ error: "NO POKEMONS WITH THIS NAME" }] })
                    return "xd"
                } else {
                    let obj = { id: respuesta[0].id, name: respuesta[0].name, image: respuesta[0].image, types: respuesta[0].types }


                    dispatch({ type: SEARCH_BAR, payload: obj })
                }
                // if (response.status === 404) {
                //     dispatch({ type: SEARCH_BAR, payload: { error: "No funciona" } })
                // }


            })
    };
};

export const typeFilter = (type) => {
    return async (dispatch) => {
        var apiarray = [];
        var dbarray = [];

        await axios.get(`http://localhost:3001/database`)
            .then((response) => {
                var respuesta = response.data
                dbarray = respuesta;
            })
        await axios.get(`http://localhost:3001/apicall`)
            .then((responsea) => {
                var respuesta = responsea.data
                apiarray = respuesta;
            })
        let all = dbarray.concat(apiarray)
        let filteredarray = []

        for (let i = 0; i < all.length; i++) {

            for (let x = 0; x < all[i].types.length; x++) {
                if (all[i]["types"][x]["name"] === type) {
                    filteredarray.push(all[i])
                }
            }
        }
        let arreglopaginado = [];
        for (let i = 0; i < filteredarray.length; i += 12) {
            let division = filteredarray.slice(i, i + 12);
            arreglopaginado.push(division);
        }

        if (arreglopaginado[0] === undefined) {
            dispatch({ type: ERROR, payload: [{ error: "NO POKEMONS WITH THIS TYPE" }] })
            return "xd"
        }



        dispatch({ type: GET_FILTERED_TYPE, payload: arreglopaginado })


    }
};

export const firstypefunc = (type) => {
    return async (dispatch) => {
        var apiarray = [];
        var dbarray = [];

        await axios.get(`http://localhost:3001/database`)
            .then((response) => {
                var respuesta = response.data
                dbarray = respuesta;
            })
        await axios.get(`http://localhost:3001/apicall`)
            .then((responsea) => {
                var respuesta = responsea.data
                apiarray = respuesta;
            })
        let all = dbarray.concat(apiarray)
        let filteredarray = []

        for (let i = 0; i < all.length; i++) {

            for (let x = 0; x < all[i].types.length; x++) {
                if (all[i]["types"][x]["name"] === type) {
                    filteredarray.push(all[i])
                }
            }
        }
        let arreglopaginado = [];
        for (let i = 0; i < filteredarray.length; i += 12) {
            let division = filteredarray.slice(i, i + 12);
            arreglopaginado.push(division);
        }

        if (arreglopaginado[0] === undefined) {
            dispatch({ type: ERROR, payload: [{ error: "NO POKEMONS WITH THIS TYPE" }] })
            return "xd"
        }

        dispatch({ type: GET_FIRST_TYPE, payload: arreglopaginado[0] })


    }
}

export const attackFilter = (array, boolean) => {
    return async (dispatch) => {
        if (boolean === false) {
            let ascendente = array.sort(function (a, b) {
                if (a.attack > b.attack) {
                    return 1;
                }
                if (a.attack < b.attack) {
                    return -1;
                }
                // a must be equal to b
                return 0;
            });

            let arreglopaginado = [];
            for (let i = 0; i < ascendente.length; i += 12) {
                let division = ascendente.slice(i, i + 12);
                arreglopaginado.push(division);
            }

            dispatch({ type: ATTACK_FILTER, payload: arreglopaginado })
        }
        if (boolean === true) {
            let descendente = array.sort(function (a, b) {
                if (a.attack < b.attack) {
                    return 1;
                }
                if (a.attack > b.attack) {
                    return -1;
                }
                // a must be equal to b
                return 0;
            });
            let arreglopaginado = [];
            for (let i = 0; i < descendente.length; i += 12) {
                let division = descendente.slice(i, i + 12);
                arreglopaginado.push(division);
            }

            dispatch({ type: ATTACK_FILTER, payload: arreglopaginado })

        }
    }

};

export const attackFilterSecond = (array, boolean) => {
    return async (dispatch) => {

        let arraycopy = array;
        if (boolean === false) {
            let ascendente = array.sort(function (a, b) {
                if (a.attack > b.attack) {
                    return 1;
                }
                if (a.attack < b.attack) {
                    return -1;
                }
                // a must be equal to b
                return 0;
            });

            let arreglopaginado = [];
            for (let i = 0; i < ascendente.length; i += 12) {
                let division = ascendente.slice(i, i + 12);
                arreglopaginado.push(division);
            }

            dispatch({ type: ATTACK_FILTER_SECOND, payload: arreglopaginado[0] })
        }
        if (boolean === true) {
            let descendente = arraycopy.sort(function (a, b) {
                if (a.attack < b.attack) {
                    return 1;
                }
                if (a.attack > b.attack) {
                    return -1;
                }
                // a must be equal to b
                return 0;
            });
            let arreglopaginado = [];
            for (let i = 0; i < descendente.length; i += 12) {
                let division = descendente.slice(i, i + 12);
                arreglopaginado.push(division);
            }

            dispatch({ type: ATTACK_FILTER_SECOND, payload: arreglopaginado[3] })

        }
    }

}

export const nameFilter = (array, boolean) => {
    return async (dispatch) => {
        if (boolean === false) {
            let ascendente = array.sort(function (a, b) {
                if (a.name > b.name) {
                    return 1;
                }
                if (a.name < b.name) {
                    return -1;
                }
                // a must be equal to b
                return 0;
            });

            let arreglopaginado = [];
            for (let i = 0; i < ascendente.length; i += 12) {
                let division = ascendente.slice(i, i + 12);
                arreglopaginado.push(division);
            }

            dispatch({ type: NAME_FILTER, payload: arreglopaginado })
        }
        if (boolean === true) {
            let descendente = array.sort(function (a, b) {
                if (a.name < b.name) {
                    return 1;
                }
                if (a.name > b.name) {
                    return -1;
                }
                // a must be equal to b
                return 0;
            });
            let arreglopaginado = [];
            for (let i = 0; i < descendente.length; i += 12) {
                let division = descendente.slice(i, i + 12);
                arreglopaginado.push(division);
            }

            dispatch({ type: NAME_FILTER, payload: arreglopaginado })

        }
    }
};

export const nameFilterSecond = (array, boolean) => {
    return async (dispatch) => {
        if (boolean === false) {
            let ascendente = array.sort(function (a, b) {
                if (a.name > b.name) {
                    return 1;
                }
                if (a.name < b.name) {
                    return -1;
                }
                // a must be equal to b
                return 0;
            });

            let arreglopaginado = [];
            for (let i = 0; i < ascendente.length; i += 12) {
                let division = ascendente.slice(i, i + 12);
                arreglopaginado.push(division);
            }

            dispatch({ type: NAME_FILTER_SECOND, payload: arreglopaginado[0] })
        }
        if (boolean === true) {
            let descendente = array.sort(function (a, b) {
                if (a.name < b.name) {
                    return 1;
                }
                if (a.name > b.name) {
                    return -1;
                }
                // a must be equal to b
                return 0;
            });
            let arreglopaginado = [];
            for (let i = 0; i < descendente.length; i += 12) {
                let division = descendente.slice(i, i + 12);
                arreglopaginado.push(division);
            }

            dispatch({ type: NAME_FILTER_SECOND, payload: arreglopaginado[0] })

        }
    }
}

export const getOriginalPokemons = () => {
    return async (dispatch) => {
        var apiarray = [];
        var dbarray = [];

        await axios.get(`http://localhost:3001/database`)
            .then((response) => {
                var respuesta = response.data
                dbarray = respuesta;
            })
        await axios.get(`http://localhost:3001/apicall`)
            .then((responsea) => {
                var respuesta = responsea.data
                apiarray = respuesta;
            })


        let arraydefinitivo = dbarray.concat(apiarray)

        dispatch({ type: GET_ORIGINAL_POKEMONS, payload: arraydefinitivo })



    };
};

export const getDbOnly = () => {
    return async (dispatch) => {
        await axios.get(`http://localhost:3001/database`)
            .then((response) => {
                var respuesta = response.data

                let arreglopaginado = [];
                for (let i = 0; i < respuesta.length; i += 12) {
                    let division = respuesta.slice(i, i + 12);
                    arreglopaginado.push(division);
                }

                dispatch({ type: DB_ONLY_FILTER, payload: arreglopaginado })
            })
    }
};
export const getDbOnlySecond = () => {
    return async (dispatch) => {
        await axios.get(`http://localhost:3001/database`)
            .then((response) => {
                var respuesta = response.data

                let arreglopaginado = [];
                for (let i = 0; i < respuesta.length; i += 12) {
                    let division = respuesta.slice(i, i + 12);
                    arreglopaginado.push(division);
                }

                dispatch({ type: DB_ONLY_FILTER_SECOND, payload: arreglopaginado[0] })
            })
    }
};

export const getApiOnly = () => {
    return async (dispatch) => {
        await axios.get(`http://localhost:3001/apicall`)
            .then((response) => {
                var respuesta = response.data

                let arreglopaginado = [];
                for (let i = 0; i < respuesta.length; i += 12) {
                    let division = respuesta.slice(i, i + 12);
                    arreglopaginado.push(division);
                }

                dispatch({ type: API_ONLY_FILTER, payload: arreglopaginado })
            })
    };
};

export const getApiOnlySecond = () => {
    return async (dispatch) => {
        await axios.get(`http://localhost:3001/apicall`)
            .then((response) => {
                var respuesta = response.data

                let arreglopaginado = [];
                for (let i = 0; i < respuesta.length; i += 12) {
                    let division = respuesta.slice(i, i + 12);
                    arreglopaginado.push(division);
                }

                dispatch({ type: API_ONLY_FILTER_SECOND, payload: arreglopaginado[0] })
            })
    };

};
export const soloapifunc = () => {
    return async (dispatch) => {
        await axios.get(`http://localhost:3001/apicall`)
            .then((response) => {
                var respuesta = response.data

                dispatch({ type: soloapi, payload: respuesta })
            })
    };
}

export const apisub3func = () => {
    return async (dispatch) => {
        await axios.get(`http://localhost:3001/apicall`)
            .then((response) => {
                var respuesta = response.data

                let arreglopaginado = [];
                for (let i = 0; i < respuesta.length; i += 12) {
                    let division = respuesta.slice(i, i + 12);
                    arreglopaginado.push(division);
                }

                dispatch({ type: apisub3, payload: arreglopaginado[2] })
            })
    };
}

export const exclusiveFunc = (array, boolean)=>{
    return async (dispatch) => {
        if (boolean === false) {
            let ascendente = array.sort(function (a, b) {
                if (a.attack > b.attack) {
                    return 1;
                }
                if (a.attack < b.attack) {
                    return -1;
                }
                // a must be equal to b
                return 0;
            });

            let arreglopaginado = [];
            for (let i = 0; i < ascendente.length; i += 12) {
                let division = ascendente.slice(i, i + 12);
                arreglopaginado.push(division);
            }

            dispatch({ type: EXCLUSIVE_ATTACK_FILTER, payload: arreglopaginado[0] })
        }
        if (boolean === true) {
            let descendente = array.sort(function (a, b) {
                if (a.attack < b.attack) {
                    return 1;
                }
                if (a.attack > b.attack) {
                    return -1;
                }
                // a must be equal to b
                return 0;
            });
            let arreglopaginado2 = [];
            for (let i = 0; i < descendente.length; i += 12) {
                let division = descendente.slice(i, i + 12);
                arreglopaginado2.push(division);
            }

            dispatch({ type: EXCLUSIVE_ATTACK_FILTER, payload: arreglopaginado2[0] })

        }
    }

}

export const backupdbfunc = (array,boolean)=>{
    return async (dispatch) => {
        await axios.get(`http://localhost:3001/database`)
            .then((response) => {
                var respuesta = response.data

                let arreglopaginado = [];
                for (let i = 0; i < respuesta.length; i += 12) {
                    let division = respuesta.slice(i, i + 12);
                    arreglopaginado.push(division);
                }

                dispatch({ type: DB_ORIGINAL, payload: arreglopaginado[0] })
            })
    }
}
//HACER DOS NUEVAS ACTION CREATOR DONDE RETORNES EL ARREGLO DE
//hacer action que meta en una parte del estado el arreglo de apisolamente para pasarlo a la funcion que organiza el atauqe



//PARA ORDENAR POR ATAQUE
// items.sort(function (a, b) {
//     if (a.attack > b.attack) {
//       return 1;
//     }
//     if (a.attack < b.attack) {
//       return -1;
//     }
//     // a must be equal to b
//     return 0;
//   });

//PARA ORDENAR POR NOMBRE
// items.sort(function (a, b) {
//     if (a.name > b.name) {
//       return 1;
//     }
//     if (a.name < b.name) {
//       return -1;
//     }
//     // a must be equal to b
//     return 0;
//   });