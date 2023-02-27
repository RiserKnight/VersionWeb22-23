'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class eventRegistartion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  eventRegistartion.init({
    userID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull:false,
      validate:{
        notNull:{msg:'User  must have a ID'},
        notEmpty:{msg:'ID must not be empty'}
      }
    },
    E101: {
      type: DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue: false,
      validate:{
        notNull:{msg:'Registered User must have ID'},
        notEmpty:{msg:'Registered User  ID must not be empty'}
      }
    },
    E102: {
      type: DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue: false,
      validate:{
        notNull:{msg:'Registered User must have ID'},
        notEmpty:{msg:'Registered User  ID must not be empty'}
      }
    },
    E103: {
      type: DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue: false,
      validate:{
        notNull:{msg:'Registered User must have ID'},
        notEmpty:{msg:'Registered User  ID must not be empty'}
      }
    },
    E104: {
      type: DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue: false,
      validate:{
        notNull:{msg:'Registered User must have ID'},
        notEmpty:{msg:'Registered User  ID must not be empty'}
      }
    },
    E105: {
      type: DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue: false,
      validate:{
        notNull:{msg:'Registered User must have ID'},
        notEmpty:{msg:'Registered User  ID must not be empty'}
      }
    },
    E106: {
      type: DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue: false,
      validate:{
        notNull:{msg:'Registered User must have ID'},
        notEmpty:{msg:'Registered User  ID must not be empty'}
      }
    },
    E107: {
      type: DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue: false,
      validate:{
        notNull:{msg:'Registered User must have ID'},
        notEmpty:{msg:'Registered User  ID must not be empty'}
      }
    },
    E108: {
      type: DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue: false,
      validate:{
        notNull:{msg:'Registered User must have ID'},
        notEmpty:{msg:'Registered User  ID must not be empty'}
      }
    },
    E109: {
      type: DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue: false,
      validate:{
        notNull:{msg:'Registered User must have ID'},
        notEmpty:{msg:'Registered User  ID must not be empty'}
      }
    },
    E110: {
      type: DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue: false,
      validate:{
        notNull:{msg:'Registered User must have ID'},
        notEmpty:{msg:'Registered User  ID must not be empty'}
      }
    }

  }, {
    sequelize,
    modelName: 'eventRegistartion',
  });
  return eventRegistartion;
};