'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('eventRegistartions', {
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
      },
      E111: {
        type: DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue: false,
        validate:{
          notNull:{msg:'Registered User must have ID'},
          notEmpty:{msg:'Registered User  ID must not be empty'}
        }
      },
      
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('eventRegistartions');
  }
};