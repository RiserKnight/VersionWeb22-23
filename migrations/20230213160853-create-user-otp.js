'use strict';
/** @type {import('DataTypes-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('userOTPs', {
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
    await queryInterface.dropTable('userOTPs');
  }
};