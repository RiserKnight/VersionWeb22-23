require('dotenv').config();

module.exports ={
  "development": {
    "username": process.env.PDB_USER,
    "host": process.env.PDB_HOST,
    "database": process.env.PDB_NAME,
    "password": process.env.PDB_PASS,
    "dialect": "postgres",
  },
  "test": {
    "username": process.env.PDB_USER,
    "host": process.env.PDB_HOST,
    "database": process.env.PDB_NAME,
    "password": process.env.PDB_PASS,
    "dialect": "postgres",
  },
  "production": {
    "username": process.env.PDB_USER,
    "host": process.env.PDB_HOST,
    "database": process.env.PDB_NAME,
    "password": process.env.PDB_PASS,
    "dialect": "postgres",
  }
}
