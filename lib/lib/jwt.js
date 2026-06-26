const jwt = require('jsonwebtoken')

function creerJeton(userId) {
  return jwt.sign(
    { userId },                     
    process.env.JWT_SECRET, 
    { expiresIn: '24h' }            
  )
}

function verifierJeton(token) {
  return jwt.verify(token, process.env.JWT_SECRET)
}
module.exports = { creerJeton, verifierJeton }