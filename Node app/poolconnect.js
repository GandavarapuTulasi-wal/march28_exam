const mysql = require('mysql2');
const poolconnect = mysql.createPool({
  host: 'localhost',
  user: 'westside',
  password: 'westside123',
  database: 'westsidenode',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
module.exports = poolconnect;
