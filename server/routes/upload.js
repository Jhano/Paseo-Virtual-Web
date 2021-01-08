const { Router } = require("express");
const fileUpload = require('express-fileupload');


const {
    uploadFile,
} = require('../controllers/upload');
const { validarJWT } = require('../middlewares/validar-jwt');



const router = Router();

router.use(fileUpload({
    useTempFiles: true
}));


router.post('/:tipo/:id', validarJWT, uploadFile);

module.exports = router;