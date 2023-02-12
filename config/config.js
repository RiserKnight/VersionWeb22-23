require('dotenv').config();
const fs = require('fs');

module.exports ={
  "development": {
    "username": process.env.PDB_USER,
    "host": process.env.PDB_HOST,
    "database": process.env.PDB_NAME,
    "password": process.env.PDB_PASS,
    "port": process.env.PDB_PORT,
    "ssl": {
      "ca": fs.readFileSync(__dirname + '/ssl/ca-certificate.crt'),
      "rejectUnauthorized": true
    },
    "dialect": "postgres"
  },
  "test": {
    "username": process.env.PDB_USER,
    "host": process.env.PDB_HOST,
    "database": process.env.PDB_NAME,
    "password": process.env.PDB_PASS,
    "port": process.env.PDB_PORT,
    "ssl": {
      "ca": fs.readFileSync(__dirname + '/ssl/ca-certificate.crt'),
      "rejectUnauthorized": true
    },
    "dialect": "postgres"
  },
  "production": {
    "username": process.env.PDB_USER,
    "host": process.env.PDB_HOST,
    "database": process.env.PDB_NAME,
    "password": process.env.PDB_PASS,
    "port": process.env.PDB_PORT,
    "ssl": {
      "ca": fs.readFileSync(__dirname + '/ssl/ca-certificate.crt'),
      "rejectUnauthorized": true
    },
    "dialect": "postgres"
  }
}
