#!/bin/sh

echo "⌛ Esperando que MySQL esté disponible en mysql:3306..."

# Espera hasta que un script de Node.js pueda conectarse
until node -e "
const mysql = require('mysql2');
const conn = mysql.createConnection({
  host: 'mysql',
  user: 'root',
  password: 'password'
});
conn.connect(err => {
  if (err) {
    process.exit(1);
  } else {
    conn.end();
  }
});
"; do
  echo "⏳ MySQL no disponible todavía. Reintentando en 2s..."
  sleep 2
done

echo "✅ MySQL está listo. Iniciando aplicación Node..."
exec npm start
