'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('eventDetails', {
      eventID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull:false,
        validate:{
          notNull:{msg:'Event must have a ID'},
          notEmpty:{msg:'Event ID must not be empty'}
        }
      },
      eventName: {
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
          notNull:{msg:'Event must have a Name'},
          notEmpty:{msg:'Event Name must not be empty'}
        }
      },
      upTime: {
        type: DataTypes.BIGINT,
        allowNull:false,
        validate:{
          notNull:{msg:'Event must have a UpTime'},
          notEmpty:{msg:'Event UpTime must not be empty'}
        }
      },
      downTime: {
        type: DataTypes.BIGINT,
        allowNull:false,
        validate:{
          notNull:{msg:'Event must have a DownTime'},
          notEmpty:{msg:'Event DownTime must not be empty'}
        }
      },
      schedule: {
        type:DataTypes.TEXT,
        allowNull:false,
        validate:{
          notNull:{msg:'Schedule must have a value'},
          notEmpty:{msg:'Schedule Value must not be empty'}
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
      caption: {
        type:DataTypes.TEXT,
        allowNull:false,
        validate:{
          notNull:{msg:'Caption must have a value'},
          notEmpty:{msg:'Caption Value must not be empty'}
        }
      },
      description: {
        type:DataTypes.TEXT,
        allowNull:false,
        validate:{
          notNull:{msg:'Description must have a value'},
          notEmpty:{msg:'Description Value must not be empty'}
        }
      },
      poster: {
        type:DataTypes.TEXT,
        allowNull:false,
        validate:{
          notNull:{msg:'Poster must have a link'},
          notEmpty:{msg:'Poster link Value must not be empty'}
        }
      },
      logo: {
        type:DataTypes.TEXT,
        allowNull:false,
        validate:{
          notNull:{msg:'Logo must have a link'},
          notEmpty:{msg:'Logo link Value must not be empty'}
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
    await queryInterface.dropTable('eventDetails');
  }
};