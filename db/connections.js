require('dotenv').config();
const mysql = require('mysql2');
// create connection to our db
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: process.env.DB_USER,
        password: process.env.DB_PW,
        database: process.env.DB_NAME
    },
);
db.connect((err) => {
    if (err) throw err;
    console.log('Connected to the employee tracker database.');
})
module.exports = db;