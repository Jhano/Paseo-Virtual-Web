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

const fileModelo = async(id, req, res, nombreArchivo, extension) => {

    let role = req.role;

    try {
        if (role === 'USER_ROLE') {
            return res.status(500).json({
                ok: false,
                err: {
                    message: 'No tienes permisos para agregar un Modelo'
                }
            })
        }

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
        if (extension === 'bin') {
            deleteFile(modelo.fileModel, 'modelo', extension);
            modelo.fileFormat = nombreArchivo;
        } else {
            deleteFile(modelo.fileFormat, 'modelo');
            modelo.fileModel = nombreArchivo;
        }

        const modeloSave = await modelo.save();

        res.json({
            ok: true,
            modelo: modeloSave,
            upload: nombreArchivo
        })


    } catch (err) {
        deleteFile(nombreArchivo, 'modelo');
        return res.status(500).json({
            ok: false,
            err
        })
    }
}

const deleteFile = (nombreImagen, tipo, extension = 'gltf') => {
    let pathImage = path.resolve(__dirname, `../../public/uploads/${tipo}/${nombreImagen}`) //creando un path
    if (fs.existsSync(pathImage && extension !== 'bin')) {
        fs.unlinkSync(pathImage);
    }
}

module.exports = {
    fileUsuario,
    fileModelo,
    deleteFile
}