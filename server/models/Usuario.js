const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");


const Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    name: {
        type: String,
        required: [true, "El nombre es necesario"]
    },
    email: {
        type: String,
        required: [true, "El email es necesario"]
    },
    password: {
        type: String,
        required: [true, "La contraseña es obligatoria"]
    },
    img: {
        type: String,
        required: false
    },
    creationDate: {
        type: Date,
        default: Date.now
    },
    state: {
        type: Boolean,
        default: true
    },
})


//transformar usuarioSchema a un objeto para su manipulacion
usuarioSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
}

//verifica si el usuario es unico
usuarioSchema.plugin(uniqueValidator, {
    message: "{PATH} debe ser unico"
})

module.exports = mongoose.model("Usuario", usuarioSchema);