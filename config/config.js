require('dotenv').config();
module.exports ={
  "development": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "dialect": "postgres"
  },
  "test": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "dialect": "postgres"
  },
  "production": {
    "dialect": "postgres",
    "dialectOptions": {
      "ssl": {
        "require": true,
        "rejectUnauthorized": false
      }
    },
    "protocol": "postgres",
    "host": process.env.PDB_HOST || "localhost",
    "port": process.env.PDB_PORT,
    "database": process.env.PDB_NAME,
    "username": process.env.PDB_USER,
    "password": process.env.PDB_PASS
  }
}