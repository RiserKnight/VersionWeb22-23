'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('sessions', {
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
    await queryInterface.dropTable('sessions');
  }
};