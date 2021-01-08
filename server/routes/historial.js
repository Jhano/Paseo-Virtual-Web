const { Router } = require("express");
const { check } = require("express-validator");


const {
    crearHistorial,
    obtenerHistorials,
    obtenerHistorial,
    updateHistorial,
    deleteHistorial
} = require('../controllers/historial');
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require('../middlewares/validar-jwt');



const router = Router();

router.get("/", validarJWT, obtenerHistorials);

router.get("/:id", validarJWT, obtenerHistorial);

router.post(
    '/new/:mid', validarJWT, [
        check('description', 'El description es obligatorio').not().isEmpty(),
        validarCampos
    ],
    crearHistorial

);


router.put('/:id', validarJWT, updateHistorial);

router.delete('/:id', validarJWT, deleteHistorial);


module.exports = router;