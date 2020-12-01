const express = require('express');
const cors = require('cors');
const dbConnection = require('./database/dbConnection');

//Creando el servidor express
const app = express();

dbConnection();

app.use(cors())

// Lectura y parseo del body
app.use(express.json());

//rutas

app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});