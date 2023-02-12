require('dotenv').config();
const fs = require('fs');

module.exports ={
  "development": {
    "username": process.env.PDB_USER,
    "host": process.env.PDB_HOST,
    "database": process.env.PDB_NAME,
    "password": process.env.PDB_PASS,
    "port": process.env.PDB_PORT,
    "dialect": "postgres",
    ssl: {
      sslmode: 'require',
      rejectUnauthorized: false,
    }
  },
  "test": {
    "username": process.env.PDB_USER,
    "host": process.env.PDB_HOST,
    "database": process.env.PDB_NAME,
    "password": process.env.PDB_PASS,
    "port": process.env.PDB_PORT,
    "dialect": "postgres",
    ssl: {
      sslmode: 'require',
      rejectUnauthorized: false,
    }
  },
  "production": {
    "username": process.env.PDB_USER,
    "host": process.env.PDB_HOST,
    "database": process.env.PDB_NAME,
    "password": process.env.PDB_PASS,
    "port": process.env.PDB_PORT,
    "dialect": "postgres",
     ssl: {
      sslmode: 'require',
      rejectUnauthorized: false,
    }
  }
}
