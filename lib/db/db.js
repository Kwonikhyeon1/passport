let mysql = require('mysql2');
let db = mysql.createConnection({
    host: 'localhost',           
    // host: '192.168.56.101',
    user: 'root',
    password: '1234',
    database: 'db_passport', 
});
db.connect();

module.exports = db;