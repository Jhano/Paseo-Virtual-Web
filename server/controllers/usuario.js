const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');
const { default: validator } = require('validator');


const crearUsuario = async(req, res = response) => {


    const { email, password } = req.body;

    try {
        let usuario = await Usuario.findOne({ email });

        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario ya existe'
            });
        }

        usuario = new Usuario(req.body);

        //encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();

        const token = await generarJWT(usuario.id, usuario.name);

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token

        })

    } catch (err) {
        console.log(err);
        error(res, err);

    }
}

const obtenerUsuarios = async(req, res = response) => {

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 0;
    limite = Number(limite);



    try {
        const usuarios = await Usuario.find({ state: true }, "name email state img")
            .skip(desde)
            .limit(limite);


        const totalUsuarios = await Usuario.countDocuments({ state: true });

        res.json({
            ok: true,
            usuarios,
            cuantos: totalUsuarios
        })

    } catch (err) {
        console.log(err);
        error(res, err);

    }

}

const obtenerUsuario = async(req, res = response) => {


    let id = req.params.id;

    try {
        const usuario = await Usuario.findById(id);


        res.json({
            ok: true,
            usuario
        })

    } catch (err) {
        console.log(err);
        error(res, err);

    }

}

const updateUsuario = async(req, res = response) => {

    const { password, email, role } = req.body;
    let body = req.body;
    let id = req.params.id;
    let roleUsuario = req.role;

    try {
        if (roleUsuario === 'USER_ROLE' && role !== undefined) {
            return res.status(500).json({
                ok: false,
                msg: 'No tienes permisos de administrador para cambiar el Role'
            });
        }

        if (password !== undefined) {
            //encriptar contraseña
            const salt = bcrypt.genSaltSync();
            body.password = bcrypt.hashSync(password, salt);
        }

        if (email !== undefined) {
            const usuario = await Usuario.findOne({ email });
            if (usuario) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                });
            }
        }

        const usuario = await Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true });

        res.json({
            ok: true,
            usuario
        })

    } catch (err) {
        console.log(err);
        error(res, err);

    }

}

const deleteUsuario = async(req, res = response) => {

    let id = req.params.id;
    let changeState = {
        state: false
    }

    try {
        const usuario = await Usuario.findByIdAndUpdate(id, changeState, { new: true, runValidators: true });

        res.json({
            ok: true,
            usuario
        })

    } catch (err) {
        console.log(err);
        error(res, err);

    }

}

const error = (res, err) => {
    if (err) {
        return res.status(400).json({
            ok: false,
            err
        })
    }
}

module.exports = {
    crearUsuario,
    obtenerUsuarios,
    obtenerUsuario,
    updateUsuario,
    deleteUsuario
}