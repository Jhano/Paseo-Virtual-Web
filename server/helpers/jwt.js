const jwt = require('jsonwebtoken');

const generarJWT = (uid, name, role) => {

    return new Promise((resolve, reject) => {


        let payload = { uid, name, role };

        if (role === 'USER_ROLE') {
            jwt.sign(payload, process.env.SEED, {
                expiresIn: '365d'
            }, (err, token) => {
                if (err) {
                    console.log(err);
                    reject('No se pudo generar el token');
                }
                resolve(token);
            })
        } else {
            jwt.sign(payload, process.env.SEED, {
                expiresIn: '2h'
            }, (err, token) => {
                if (err) {
                    console.log(err);
                    reject('No se pudo generar el token');
                }
                resolve(token);
            })
        }


    })
}

module.exports = {
    generarJWT
}