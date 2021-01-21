const { response } = require('express');
const Usuario = require('../models/Usuario');
const jwt = require('jsonwebtoken');

const confirmacionEmail = async(req, res = response) => {

    let token = req.params.token;

    const { uid } = jwt.verify(
        token,
        process.env.SEED
    );

    const changeState = {
        state: true,
    }

    try {
        const usuario = await Usuario.findByIdAndUpdate(uid, changeState, { new: true, runValidators: true })
        res.json({
            ok: true,
            usuario,
            message: 'Registro confirmado.'
        })

    } catch (err) {
        console.log(err);
        error(res, err);

    }

}

module.exports = {
    confirmacionEmail
}