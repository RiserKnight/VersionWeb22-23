'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('teams', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
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
    await queryInterface.dropTable('teams');
  }
};