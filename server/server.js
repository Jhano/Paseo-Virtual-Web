const express = require('express');
const cors = require('cors');
const dbConnection = require('./database/dbConnection');
const bodyParser = require("body-parser");

//Creando el servidor express
const app = express();

dbConnection();

app.use(cors())


//enviar datos mediante aplication/x-www-form.urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Lectura y parseo del body
app.use(bodyParser.json());

//rutas
app.use('/api/auth', require('./routes/auth'));

app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});