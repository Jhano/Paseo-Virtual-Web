const { response } = require('express');

const { fileUsuario, fileModelo } = require('../helpers/uploadsFiles');

const uploadFile = async(req, res = response) => {

    let tipo = req.params.tipo;
    let id = req.params.id;

    try {

        if (!req.files || Object.keys(req.files).length === 0) {

            error(res, err = {
                message: 'No se ha seleccionado ningun archivo'
            });
        }

        //validar tipos
        let tiposValidos = ['modelo', 'usuario'];
        if (tiposValidos.indexOf(tipo) < 0) {
            error(res, err = {
                message: 'Los tipos permitidos son ' + tiposValidos.join(', ')
            });
        }

        //extensiones de archivos
        let archivo = req.files.archivo;
        let nombreCortado = archivo.name.split('.');
        let extension = nombreCortado[nombreCortado.length - 1];


        let extensionesValidas = ['png', 'jpg', 'jpeg', 'bin', 'gltf'];

        if (extensionesValidas.indexOf(extension) < 0) {
            error(res, err = {
                message: 'Las extensiones permitidas son ' + extensionesValidas.join(', '),
                ext: extension
            });
        }

        //cambio nombre archivo
        let nombreArchivo;
        if (extension === 'bin') {
            nombreArchivo = archivo.name;
        } else {
            nombreArchivo = `${id}-${new Date().getMilliseconds()}.${extension}`;
        }



        await archivo.mv(`public/uploads/${tipo}/${nombreArchivo}`);


        switch (tipo) {
            case 'modelo':
                fileModelo(id, req, res, nombreArchivo, extension);
                break;

            case 'usuario':
                fileUsuario(id, res, nombreArchivo);
                break;
        }

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



module.exports = {
    uploadFile,
}