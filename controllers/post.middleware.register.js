const MiddleRegister = (req, res, next) => {
    const { firstName, email, password, confirmPassword } = req.body

    if (!firstName || !email || !password || !confirmPassword) {
        return res.status(409).json({
            error: true,
            message: "[M801] tous les champs sont obligatoires"
        })
    }

    if (password.length < 8) {
        return res.status(409).json({
            error: true,
            message: "[M802] les mots de passe ne correspondent pas"
        })
    }

    next()
}

module.exports = MiddleRegister