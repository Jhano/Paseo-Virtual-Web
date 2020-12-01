const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");


const Schema = mongoose.Schema;

let historialSchema = new Schema({
    usuarioId: {
        type: Schema.Types.ObjectId,
        ref: "Usuario",
    },
    modeloId: {
        type: Schema.Types.ObjectId,
        ref: "Modelo",
    },
    description: {
        type: String,
        required: [true, "La descripción es necesario"]
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


//verifica si el usuario es unico
historialSchema.plugin(uniqueValidator, {
    message: "{PATH} debe ser unico"
})

module.exports = mongoose.model("Historial", historialSchema);