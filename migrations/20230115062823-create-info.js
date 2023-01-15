'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('infos', {
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
    await queryInterface.dropTable('infos');
  }
};