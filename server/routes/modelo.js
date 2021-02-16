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
const { validarRole } = require("../middlewares/validar-role");



const router = Router();

router.get("/", obtenerModelos);

router.get("/:id", obtenerModelo);

router.get("/buscar/:termino", validarJWT, searchModelo);

router.post(
    '/new', validarJWT, validarRole, [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('fileModel', 'El fileModel es obligatorio').not().isEmpty(),
        check('texture', 'El texture es obligatorio').not().isEmpty(),
        check('shadow', 'El shadow es obligatorio').not().isEmpty(),
        validarCampos
    ],
    crearModelo

);


router.put('/:id', [validarJWT, validarRole], updateModelo);

router.delete('/:id', [validarJWT, validarRole], deleteModelo);


module.exports = router;