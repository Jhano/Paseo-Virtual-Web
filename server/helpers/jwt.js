const jwt = require('jsonwebtoken');

const generarJWT = (uid, name, img) => {

    return new Promise((resolve, reject) => {

        let payload;
        if (img) {
            payload = { uid, name, img };
        } else {
            payload = { uid, name };
        }



        jwt.sign(payload, process.env.SEED, {
            expiresIn: '2h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('No se pudo generar el token');
            }
            resolve(token);
        })
    })
}

module.exports = {
    generarJWT
}