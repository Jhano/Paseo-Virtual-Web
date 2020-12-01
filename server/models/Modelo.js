const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");


const Schema = mongoose.Schema;

let modeloSchema = new Schema({
    name: {
        type: String,
        required: [true, "El nombre es necesario"]
    },
    fileModel: {
        type: String,
        required: [true, "El modelo 3D es necesario"]
    },
    usuarioId: {
        type: Schema.Types.ObjectId,
        ref: "Usuario",
    },
    Description: {
        type: String,
        required: false
    },
    creationDate: {
        type: Date,
        default: Date.now
    },
    dateMonument: {
        type: Date,
        required: false
    },
    extraInfo: {
        type: String,
        required: false
    },
    position: {
        type: Object,
        required: false
    },
    state: {
        type: Boolean,
        default: true
    },
})



//verifica si el usuario es unico
modeloSchema.plugin(uniqueValidator, {
    message: "{PATH} debe ser unico"
})

module.exports = mongoose.model("Modelo", modeloSchema);