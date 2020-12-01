require("./config");
const mongoose = require('mongoose');



const dbConnection = async() => {

    try {
        console.log("ASDSAD:", process.env.urlDB)
        await mongoose.connect(process.env.urlDB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })

        console.log('DB ONLINE');

    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de inicializar la BD');
    }
}

module.exports = dbConnection;