const argon2 = require('argon2')

async function hashMotDePasse(motDePasse) {
  return await argon2.hash(motDePasse)
}

async function verifierMotDePasse(hashStocke, motDePasseSaisi) {
  return await argon2.verify(hashStocke, motDePasseSaisi)
}
module.exports = { hashMotDePasse, verifierMotDePasse }