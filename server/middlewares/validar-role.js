const validarRole = (req, res, next) => {

    const role = req.role;
    if (role === "ADMIN_ROLE") {
        next();
    } else {
        return res.json({
            ok: false,
            message: 'Rol sin autorización'
        })
    }
}


module.exports = {
    validarRole
}