const { response } = require('express');
const jwt = require('jsonwebtoken');


const validarJWT = (req, res = response, next) => {

    // token headers
    const token = req.get('token');

    if (!token) {
        return res.json({
            ok: false,
            msg: 'No hay token en la petición'
        });
    }

    try {
        const { uid, name, role } = jwt.verify(
            token,
            process.env.SEED
        );

        req.uid = uid;
        req.name = name;
        req.role = role;
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        });
    }

    next();
}



module.exports = {
    validarJWT
}