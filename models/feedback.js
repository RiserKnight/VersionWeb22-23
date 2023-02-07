'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class feedback extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  feedback.init({
    userID: {
      type: DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notNull:{msg:'User  must have a ID'},
        notEmpty:{msg:'ID must not be empty'}
      }
    },
    head: {
      type:DataTypes.TEXT,
      allowNull:false,
      validate:{
        notNull:{msg:'Head must have a value'},
        notEmpty:{msg:'Head Value must not be empty'}
      }
    },
    body: {
      type:DataTypes.TEXT,
      allowNull:false,
      validate:{
        notNull:{msg:'Head must have a value'},
        notEmpty:{msg:'Head Value must not be empty'}
      }
    }
  }, {
    sequelize,
    modelName: 'feedback',
  });
  return feedback;
};