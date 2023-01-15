'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('users', {
      userID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull:false,
        validate:{
          notNull:{msg:'User  must have a ID'},
          notEmpty:{msg:'ID must not be empty'}
        }
      },
      name: {
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
          notNull:{msg:'User  must have a Name'},
          notEmpty:{msg:'Name must not be empty'}
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
    await queryInterface.dropTable('users');
  }
};