const mysql = require('mysql');

// Create a MySQL connection
const mysql_MBS = mysql.createConnection({
    host: process.env.DB_LOCALHOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});


module.exports = mysql_MBS