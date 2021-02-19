const nodemailer = require('nodemailer');

// email sender function
const sendEmail = async(email, token, res) => {



    try {

        // Definimos el transporter
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'paseosvirtualesubb@gmail.com',
                pass: 'administrarCuentas@'
            }
        });
        // Definimos el email
        const mailOptions = {
            from: 'paseosvirtualesubb@gmail.com',
            to: email,
            subject: 'Confirmación de registro',
            text: 'Por favor presionar en el siguiente link para confirmar registro:',
            html: `<a href='https://af44d8fb70dc.ngrok.io/api/emails/${token}'>Confirmar...</a>`,
        };
        // Enviamos el email
        const correoEnviado = await transporter.sendMail(mailOptions);

        if (correoEnviado) {
            return true;
        } else {
            res.status(500).json({
                ok: false,
                err,
                message: 'No ha podido enviar el correo de confirmación. Porfavor intentar registrarse de nuevo'
            })
        }



    } catch (err) {
        res.status(400).json({
            ok: false,
            err,
            message: 'No ha podido enviar el correo de confirmación. Porfavor intentar registrarse de nuevo'
        })
    }



};

module.exports = sendEmail;