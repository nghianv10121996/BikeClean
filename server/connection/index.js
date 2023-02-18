const config = {
  host: "localhost",
  user: "root",
  password: "",
  database: "bike_clean",
}

// create the connection to database
const mysql = require('mysql2/promise');

async function query(sql, params) {
  const connection = await mysql.createConnection(config);
  const [results] = await connection.execute(sql, params);

  return results;
}

module.exports = {
  query
}