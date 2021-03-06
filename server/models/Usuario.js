const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

let rolesValidos = {
    values: ["ADMIN_ROLE", "USER_ROLE"],
    message: "{VALUE} no es un rol valido ", //mensaje si es que se ingresa con otro rol
}

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
    role: {
        type: String,
        default: "USER_ROLE",
        enum: rolesValidos //compara si el role es uno de los de rolesValidos
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