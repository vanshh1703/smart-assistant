const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: 'postgres', // Try connecting to the default database
  password: process.env.DB_PASSWORD,
  port: 5432,
});

client.connect()
  .then(() => {
    console.log('Connected to PostgreSQL successfully');
    return client.query('CREATE DATABASE spai_db');
  })
  .then(() => {
    console.log('Database spai_db created successfully');
    client.end();
  })
  .catch(err => {
    if (err.code === '42P04') {
      console.log('Database spai_db already exists');
    } else {
      console.error('Operation error', err.stack);
    }
    client.end();
  });
