'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class teams extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  teams.init({
    teamID: {
      type: DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notNull:{msg:'Team must have a ID'},
        notEmpty:{msg:'Team ID must not be empty'}
      }
    },
    teamName: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{msg:'Team must have a Name'},
        notEmpty:{msg:' Team Name must not be empty'}
      }
    },
    memName: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{msg:'Member must have a Name'},
        notEmpty:{msg:'Member Name must not be empty'}
      }
    },
    por: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{msg:'POR must have a Name'},
        notEmpty:{msg:'POR Name must not be empty'}
      }
    },
    email: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{msg:'Member must have a Email'},
        notEmpty:{msg:'Email must not be empty'}
      }
    },
    image: {
      type:DataTypes.TEXT,
      allowNull:false,
      validate:{
        notNull:{msg:'Image must have a link'},
        notEmpty:{msg:'Image link Value must not be empty'}
      }
    },
    github: {
      type:DataTypes.TEXT,
      allowNull:false,
      validate:{
        notNull:{msg:'Github must have a link'},
        notEmpty:{msg:'Github link Value must not be empty'}
      }
    },
    linkedln: {
      type:DataTypes.TEXT,
      allowNull:false,
      validate:{
        notNull:{msg:'Linkedln must have a link'},
        notEmpty:{msg:'Linkedln link Value must not be empty'}
      }
    }
  }, {
    sequelize,
    modelName: 'teams',
  });
  return teams;
};