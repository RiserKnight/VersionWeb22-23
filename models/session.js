'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class session extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  session.init({

    sid: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    expires: {
      type:DataTypes.DATE,
      allowNull:false,
      validate:{
        notNull:{msg:'Session  must have a expirationDAte'},
        notEmpty:{msg:'expirationDate must not be empty'}
      }

    },
    data: {
      type:DataTypes.TEXT,
      allowNull:false,
      validate:{
        notNull:{msg:'User  must have a Name'},
        notEmpty:{msg:'Name must not be empty'}
      }

    }

  }, {
    sequelize,
    modelName: 'session',
  });
  return session;
};