const Modelo = require('../models/Modelo');
const Usuario = require('../models/Usuario');


const fs = require('fs'); //file system
const path = require('path');

const fileUsuario = async(id, res, nombreArchivo) => {

    try {
        const usuario = await Usuario.findById(id);

        if (!usuario) {
            deleteFile(nombreArchivo, 'usuario');
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no existe'
                }
            })
        }

        deleteFile(usuario.img, 'usuario');

        usuario.img = nombreArchivo;

        const usuarioSave = await usuario.save();

        res.json({
            ok: true,
            usuario: usuarioSave,
            img: nombreArchivo
        })


    } catch (err) {
        deleteFile(nombreArchivo, 'usuario');
        return res.status(500).json({
            ok: false,
            err
        })
    }
}

const fileModelo = async(id, res, nombreArchivo) => {

    try {
        const modelo = await Modelo.findById(id);

        if (!modelo) {
            deleteFile(nombreArchivo, 'modelo');
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Modelo no existe'
                }
            })
        }

        deleteFile(modelo.fileModel, 'modelo');

        modelo.fileModel = nombreArchivo;

        const modeloSave = await modelo.save();

        res.json({
            ok: true,
            modelo: modeloSave,
            fileModel: nombreArchivo
        })


    } catch (err) {
        deleteFile(nombreArchivo, 'modelo');
        return res.status(500).json({
            ok: false,
            err
        })
    }
}

const deleteFile = (nombreImagen, tipo) => {
    let pathImage = path.resolve(__dirname, `../../uploads/${tipo}/${nombreImagen}`) //creando un path
    if (fs.existsSync(pathImage)) {
        fs.unlinkSync(pathImage);
    }
}

module.exports = {
    fileUsuario,
    fileModelo,
    deleteFile
}