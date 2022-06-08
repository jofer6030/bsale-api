import mysql from "mysql2";

const pool = mysql.createPool({
  host: process.env.MY_SQL_HOST,
  user: process.env.MY_SQL_USER,
  database: process.env.MY_SQL_PASSWORD,
  password: process.env.MY_SQL_DB,
  connectionLimit: 10,
});

pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === "ENOTFOUND") {
      console.error("Error de conexion con la base de datos");
    }
    if (err.code === "ER_ACCESS_DENIED_ERROR") {
      console.error("Usuario o contraseña incorrectos");
    }
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      console.error("Base de datos desconectada");
    }
    if (err.code === "ER_CON_COUNT_ERROR") {
      console.error("Base de datos con muchas conexiones");
    }
    if (err.code === "ECONNREFUSED") {
      console.error("Conexion rechazada");
    }
    if (err.code === "ER_BAD_DB_ERROR") {
      console.error("Base de datos no existe");
    }
  }

  if (connection) {
    connection.release();
    console.log("Conexión a la base de datos establecida");
  }
});

export const promisePool = pool.promise();
