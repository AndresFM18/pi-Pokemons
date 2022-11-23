const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id:{
      type:DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true
    },
    name: {
      type: DataTypes.STRING,
      unique:true,
      allowNull: false
    },
    hp:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    attack:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    defense:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    speed:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    height:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    weight:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    image:{
      type:DataTypes.TEXT,
      allowNull:true
    }
  }, {timestamps:false} );
};

// ID (Número de Pokemon) * : No puede ser un ID de un pokemon ya existente en la API pokeapi
// Nombre STRING  *
// Vida INTEGER
// Ataque INTEGER
// Defensa INTEGER
// Velocidad INTEGER
// Altura INTEGER
// Peso INTEGER