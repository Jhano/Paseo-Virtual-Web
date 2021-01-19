const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');

const { generarJWT } = require('../helpers/jwt');


const loginUsuario = async(req, res = response) => {

    const { email, password } = req.body;

    try {
        const usuario = await Usuario.findOne({ email });

        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con ese email'
            });
        }

        //comparar contraseñas
        const validPassword = bcrypt.compareSync(password, usuario.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            })
        }

        const token = await generarJWT(usuario.id, usuario.name, usuario.role);

        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            role: usuario.role,
            token

        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}


const revalidarToken = async(req, res = response) => {

    const { uid, name, role } = req;

    // Generar JWT
    try {
        const token = await generarJWT(uid, name, role);

        res.json({
            ok: true,
            uid,
            name,
            role,
            token
        })

    } catch (err) {
        res.status(500).json({
            ok: false,
            msg: err
        });
    }

}


module.exports = {
    loginUsuario,
    revalidarToken
}