require('dotenv').config();
module.exports = {
  "development": {
    "username": process.env.PDB_USER,
    "host": process.env.PDB_HOST,
    "database": process.env.PDB_NAME,
    "password": process.env.PDB_PASS,
    "port": process.env.PDB_PORT,
    "ssl": {
      require: true,
      rejectUnauthorized: false
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
      require: true,
      rejectUnauthorized: false
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
      require: true,
      rejectUnauthorized: false
    },
    "dialect": "postgres"
  }
}