const { response } = require('express');
const bcrypt = require('bcryptjs');
const Modelo = require('../models/Modelo');


const crearModelo = async(req, res = response) => {


    const { name } = req.body;
    let uid = req.uid;

    const body = {
        ...req.body,
        usuarioId: uid
    }


    try {
        let modelo = await Modelo.findOne({ name });

        if (modelo) {
            return res.status(400).json({
                ok: false,
                msg: 'El modelo ya existe'
            });
        }

        modelo = new Modelo(body);


        await modelo.save();

        res.status(201).json({
            ok: true,
            modelo

        })

    } catch (err) {
        console.log(err);
        error(res, err);

    }
}

const obtenerModelos = async(req, res = response) => {

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 0;
    limite = Number(limite);



    try {
        const modelos = await Modelo.find({ state: true }, "name usuarioId description dateMonument extraInfo location state")
            .sort('name')
            .populate('usuarioId', 'name email')
            .skip(desde)
            .limit(limite);


        const totalModelos = await Modelo.countDocuments({ state: true });

        res.json({
            ok: true,
            modelos,
            cuantos: totalModelos
        })

    } catch (err) {
        console.log(err);
        error(res, err);

    }

}

const obtenerModelo = async(req, res = response) => {


    let id = req.params.id;

    try {
        const modelo = await Modelo.findById(id)
            .populate('usuarioId', 'name email');


        res.json({
            ok: true,
            modelo
        })

    } catch (err) {
        console.log(err);
        error(res, err);

    }

}

const updateModelo = async(req, res = response) => {

    let body = req.body;
    let id = req.params.id;

    try {
        const modelo = await Modelo.findByIdAndUpdate(id, body, { new: true, runValidators: true })
            .populate('usuarioId', 'name email');

        res.json({
            ok: true,
            modelo
        })

    } catch (err) {
        console.log(err);
        error(res, err);

    }

}

const deleteModelo = async(req, res = response) => {

    let id = req.params.id;
    let changeState = {
        state: false
    }

    try {
        const modelo = await Modelo.findByIdAndUpdate(id, changeState, { new: true, runValidators: true })
            .populate('usuarioId', 'name email');

        res.json({
            ok: true,
            modelo
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
    crearModelo,
    obtenerModelos,
    obtenerModelo,
    updateModelo,
    deleteModelo
}