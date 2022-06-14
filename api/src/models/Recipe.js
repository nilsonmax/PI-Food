const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.TEXT,
    },
    summary: {
      type: DataTypes.STRING,
      allowNull: false
    },
    healthyScore: {
      type: DataTypes.INTEGER
    },
    steps: {
      type: DataTypes.STRING
    },
    dishTypes: {
      type: DataTypes.STRING
    },
    createdInDb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  }, {
    timestamps: false
  })
}
