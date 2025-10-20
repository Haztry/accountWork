import mysql from "mysql2/promise";

//Not yet implemented...

const pool = mysql.createPool({
  host: process.env.DB_HOST, // your AWS RDS endpoint
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
