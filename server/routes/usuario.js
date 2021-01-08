const { Router } = require("express");
const { check } = require("express-validator");
const { revalidarToken } = require("../controllers/auth");


const {
    crearUsuario,
    obtenerUsuarios,
    obtenerUsuario,
    updateUsuario,
    deleteUsuario
} = require('../controllers/usuario');
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require('../middlewares/validar-jwt');



const router = Router();

router.get("/", validarJWT, obtenerUsuarios);

router.get("/:id", validarJWT, obtenerUsuario);

router.post(
    '/new', validarJWT, [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ],
    crearUsuario

);


router.put('/:id', validarJWT, updateUsuario);

router.delete('/:id', validarJWT, deleteUsuario);


module.exports = router;