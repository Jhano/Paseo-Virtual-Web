const { Router } = require("express");
const { check } = require("express-validator");


const {
    crearModelo,
    obtenerModelos,
    obtenerModelo,
    updateModelo,
    deleteModelo,
    searchModelo
} = require('../controllers/modelo');
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require('../middlewares/validar-jwt');



const router = Router();

router.get("/", validarJWT, obtenerModelos);

router.get("/:id", validarJWT, obtenerModelo);

router.get("/buscar/:termino", validarJWT, searchModelo);

router.post(
    '/new', validarJWT, [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('fileModel', 'El fileModel es obligatorio').not().isEmpty(),
        check('texture', 'El texture es obligatorio').not().isEmpty(),
        check('shadow', 'El shadow es obligatorio').not().isEmpty(),
        validarCampos
    ],
    crearModelo

);


router.put('/:id', validarJWT, updateModelo);

router.delete('/:id', validarJWT, deleteModelo);


module.exports = router;