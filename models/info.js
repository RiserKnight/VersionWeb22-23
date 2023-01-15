'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class info extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  info.init({
    infoID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull:false,
      validate:{
        notNull:{msg:'Info must have a ID'},
        notEmpty:{msg:'ID must not be empty'}
      }
    },
    purpose: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{msg:'Info must have a Purpose'},
        notEmpty:{msg:'Purpose must not be empty'}
      }

    },
    dataT: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{msg:'Info must have a DataType'},
        notEmpty:{msg:'DataType must not be empty'}
      }

    },
    value: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{msg:'Info must have a value'},
        notEmpty:{msg:'Value must not be empty'}
      }

    }
  }, {
    sequelize,
    modelName: 'info',
  });
  return info;
};