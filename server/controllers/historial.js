const { response } = require('express');
const bcrypt = require('bcryptjs');
const Historial = require('../models/Historial');


const crearHistorial = async(req, res = response) => {


    let { description } = req.body;
    let uid = req.uid;
    let mid = req.params.mid;

    const body = {
        ...req.body,
        usuarioId: uid,
        modeloId: mid
    }


    try {
        let historial = await Historial.findOne({ description });

        if (historial) {
            return res.status(400).json({
                ok: false,
                msg: 'El Historial ya existe'
            });
        }

        historial = new Historial(body);


        await historial.save();

        res.status(201).json({
            ok: true,
            historial

        })

    } catch (err) {
        console.log(err);
        error(res, err);

    }
}

const obtenerHistorials = async(req, res = response) => {

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 0;
    limite = Number(limite);



    try {
        const historials = await Historial.find({ state: true }, " usuarioId modeloId description creationDate state")
            .sort('name')
            .populate('usuarioId', 'name email')
            .populate('modeloId', 'name description fileModel')
            .skip(desde)
            .limit(limite);


        const totalHistorials = await Historial.countDocuments({ state: true });

        res.json({
            ok: true,
            historials,
            cuantos: totalHistorials
        })

    } catch (err) {
        console.log(err);
        error(res, err);

    }

}

const obtenerHistorial = async(req, res = response) => {


    let id = req.params.id;

    try {
        const historial = await Historial.findById(id)
            .populate('usuarioId', 'name email')
            .populate('modeloId', 'name description fileModel');


        res.json({
            ok: true,
            historial
        })

    } catch (err) {
        console.log(err);
        error(res, err);

    }

}

const updateHistorial = async(req, res = response) => {

    let body = req.body;
    let id = req.params.id;

    try {
        const historial = await Historial.findByIdAndUpdate(id, body, { new: true, runValidators: true })
            .populate('usuarioId', 'name email')
            .populate('modeloId', 'name description fileModel');

        res.json({
            ok: true,
            historial
        })

    } catch (err) {
        console.log(err);
        error(res, err);

    }

}

const deleteHistorial = async(req, res = response) => {

    let id = req.params.id;
    let changeState = {
        state: false
    }

    try {
        const historial = await Historial.findByIdAndUpdate(id, changeState, { new: true, runValidators: true })
            .populate('usuarioId', 'name email')
            .populate('modeloId', 'name description fileModel');

        res.json({
            ok: true,
            historial
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
    crearHistorial,
    obtenerHistorials,
    obtenerHistorial,
    updateHistorial,
    deleteHistorial
}