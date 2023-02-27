'use strict';
const bcrypt = require('bcrypt');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tempUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tempUser.init({
    tempID: {
      type: DataTypes.STRING,
      allowNull:false,
      primaryKey: true,
      validate:{
        notNull:{msg:'User  must have a ID'},
        notEmpty:{msg:'ID must not be empty'}
      }
    },
    userName: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{msg:'User  must have a Name'},
        notEmpty:{msg:'Name must not be empty'}
      }
    },
    roll: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{msg:'User  must have a Roll number'},
        notEmpty:{msg:'Roll number must not be empty'}
      }

    },
    email: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{msg:'User  must have a Email'},
        notEmpty:{msg:'Email must not be empty'}
      }
    },
    contact: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{msg:'User  must have a Contact'},
        notEmpty:{msg:'Contact must not be empty'}
      }

    },
    university: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{msg:'User  must have a University'},
        notEmpty:{msg:'University must not be empty'}
      }

    },
    pass: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{msg:'User  must have a password'},
        notEmpty:{msg:'password must not be empty'}
      }

    },
    validTill: {
      type: DataTypes.BIGINT,
      allowNull:false,
      validate:{
        notNull:{msg:'OTP must have a valid time'},
        notEmpty:{msg:'Valid Time must not be empty'}
      }
    }
  }, {
    hooks: {
      beforeCreate: async(tempUser, options) => {

        const salt = await bcrypt.genSalt(10);
        tempUser.pass  = await bcrypt.hash(tempUser.pass, salt);
     
      }
    },
    sequelize,
    modelName: 'tempUser',
  });
  return tempUser;
};