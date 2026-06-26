module.exports = (req, res) => {
  res.send('/reset-password')
}  
module.exports = (req, res) => {
    res.json({
        message: 'Mot de passe réinitialisé avec succès'
    })
}