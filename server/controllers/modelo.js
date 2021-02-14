const { response } = require('express');

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
        const modelos = await Modelo.find({ state: true })
            .sort('name')
            .populate('usuarioId', 'name email')
            .skip(desde)
            .limit(limite);



        const objModelos = objModels(modelos);

        const totalModelos = await Modelo.countDocuments({ state: true });



        res.json({
            ok: true,
            modelos: objModelos,
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

        let objModelo = {
            id: modelo.id,
            location: {
                lat: modelo.lat,
                lng: modelo.lng,
                ejeZ: modelo.ejeZ,
            },
            model: {
                obj: modelo.fileModel,
                texture: modelo.texture,
                shadow: modelo.shadow
            },
            data: {
                name: modelo.name,
                description: modelo.description,
                extraInfo: modelo.extraInfo,
                dateMonument: modelo.dateMonument
            },
            user: modelo.usuarioId
        }

        res.json({
            ok: true,
            modelo: objModelo
        })

    } catch (err) {
        console.log(err);
        error(res, err);

    }

}

const updateModelo = async(req, res = response) => {

    let body = req.body;
    let id = req.params.id;
    let { name } = body;

    try {
        let modelo = await Modelo.findOne({ name });

        if (modelo) {
            return res.status(400).json({
                ok: false,
                err: 'El modelo ya existe'
            });
        }

        modelo = await Modelo.findByIdAndUpdate(id, body, { new: true, runValidators: true })
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

const searchModelo = async(req, res = response) => {

    let termino = req.params.termino;

    let regex = new RegExp(termino, 'i');

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 0;
    limite = Number(limite);


    try {
        const modelosTotal = await Modelo.find({ state: true, name: regex });
        const cuantos = modelosTotal.length;


        const modelos = await Modelo.find({ state: true, name: regex })
            .populate('usuarioId', 'name email')
            .skip(desde)
            .limit(limite);

        const objModelos = objModels(modelos);





        res.json({
            ok: true,
            modelos: objModelos,
            cuantos
        })

    } catch (err) {
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

const objModels = (modelos) => {

    let obj = [];
    modelos.forEach(modelo => obj.push({
        id: modelo.id,
        location: {
            lat: modelo.lat,
            lng: modelo.lng,
            ejeZ: modelo.ejeZ,
        },
        model: {
            obj: modelo.fileModel,
            texture: modelo.texture,
            shadow: modelo.shadow
        },
        data: {
            name: modelo.name,
            description: modelo.description,
            extraInfo: modelo.extraInfo,
            dateMonument: modelo.dateMonument
        },
        user: modelo.usuarioId
    }))

    return obj;

}

module.exports = {
    crearModelo,
    obtenerModelos,
    obtenerModelo,
    updateModelo,
    deleteModelo,
    searchModelo
}