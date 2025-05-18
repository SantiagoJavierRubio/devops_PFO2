const express = require('express');
const mysql = require('mysql2');

const app = express();

const db = mysql.createConnection({
    host: 'mysql',
    user: 'root',
    password: 'password',
    database: 'db'
})

function connectWithRetry() {
    db.connect(err => {
        if (err) {
            console.error('Error conectando a MySQL:', err);
            setTimeout(connectWithRetry, 3000); // Reintentar en 3 segundos
        } else {
            console.log('Conectado a MySQL!');
        }
    });
}

connectWithRetry();


app.get('/', (req, res) => {
    db.query('SELECT * FROM tareas', (err, result) => {
        if (err) {
            return res.status(500).send('Error al extraer tareas de la base de datos')
        }
        const html = `
            <section>
                <h1>Tareas</h1>
                ${result.length === 0 ? '<p>No hay tareas que mostar</p>' : ''}
                <ul>
                    ${result.map(tarea => `
                        <li>
                            ${tarea.id} - ${tarea.nombre} ${Boolean(tarea.hecha) ? '<span style="font-weight:bold;">✅</span>' : ""}
                        </li>`).join('')}
                </ul>
            </section>
        `
        res.send(html)
    })
})

app.listen(3000, () => {
    console.log('Servidor de express corriendo en el puerto 3000')
})