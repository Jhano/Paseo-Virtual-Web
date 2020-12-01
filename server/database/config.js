require('dotenv').config(); //para usar las varibles de .env

//==================
//PUERTO
//==================
process.env.PORT = process.env.PORT;


//==================
//Enterno
//==================
process.env.NODE_ENV = process.env.NODE_ENV || "dev";

//==================
//Vencimiento del Token
//==================
process.env.CADUCIDAD_TOKEN = '48h'

//==================
//SEED de autentificacion
//==================
process.env.SEED = process.env.SECRET_JWT_SEED || "secret-seed-desarrollo"

//==================
//Base de datos
//==================
let urlDB;

if (process.env.NODE_ENV === "dev") {
    urlDB = "mongodb://localhost:27017/Jano";
} else {
    urlDB = process.env.MONGODB_URI;
}



process.env.urlDB = urlDB;