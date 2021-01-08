const { Router } = require("express");
const { check } = require("express-validator");
const { revalidarToken } = require("../controllers/auth");


const {
    crearModelo,
    obtenerModelos,
    obtenerModelo,
    updateModelo,
    deleteModelo
} = require('../controllers/Modelo');
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require('../middlewares/validar-jwt');



const router = Router();

router.get("/", validarJWT, obtenerModelos);

router.get("/:id", validarJWT, obtenerModelo);

router.post(
    '/new', validarJWT, [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        validarCampos
    ],
    crearModelo

);


router.put('/:id', validarJWT, updateModelo);

router.delete('/:id', validarJWT, deleteModelo);


module.exports = router;