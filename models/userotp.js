'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userOTP extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  userOTP.init({
    userID: {
      type: DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notNull:{msg:'User must have a ID'},
        notEmpty:{msg:'ID must not be empty'}
      }
    },
    otpHash: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{msg:'OTP must have a code'},
        notEmpty:{msg:'Code must not be empty'}
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
    sequelize,
    modelName: 'userOTP',
  });
  return userOTP;
};