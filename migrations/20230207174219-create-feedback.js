'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('feedbacks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      userID: {
        type: DataTypes.INTEGER,
        allowNull:false,
        validate:{
          notNull:{msg:'User  must have a ID'},
          notEmpty:{msg:'ID must not be empty'}
        }
      },
      head: {
        type:DataTypes.TEXT,
        allowNull:false,
        validate:{
          notNull:{msg:'Head must have a value'},
          notEmpty:{msg:'Head Value must not be empty'}
        }
      },
      body: {
        type:DataTypes.TEXT,
        allowNull:false,
        validate:{
          notNull:{msg:'Head must have a value'},
          notEmpty:{msg:'Head Value must not be empty'}
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
    await queryInterface.dropTable('feedbacks');
  }
};