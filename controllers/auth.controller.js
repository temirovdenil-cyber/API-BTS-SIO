const crypto = require('crypto')
const prisma = require('../lib/prisma')
const { hashMotDePasse, verifierMotDePasse } = require('../lib/lib/password')
const { creerJeton } = require('../lib/lib/jwt')
const { transporter } = require('../lib/nodemailer')

const _inMemoryUsers = []

async function register(req, res) {
  const { email, motDePasse } = req.body
  const hash = await hashMotDePasse(motDePasse)
  let user
  if (!prisma || !prisma.user) {
    user = { id: _inMemoryUsers.length + 1, email, passwordHash: hash }
    _inMemoryUsers.push(user)
  } else {
    user = await prisma.user.create({ data: { email, passwordHash: hash } })
  }
  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: email,
      subject: 'Bienvenue !',
      text: 'Ton compte a bien été créé.',
      html: '<p>Ton compte a bien été créé.</p>'
    })
  } catch (err) {
    console.error('Mail non envoyé :', err)
  }
  res.json({ message: 'Inscription réussie !' })
}

async function login(req, res) {
  const { email, motDePasse } = req.body
  let user
  if (!prisma || !prisma.user) {
    user = _inMemoryUsers.find(u => u.email === email)
  } else {
    user = await prisma.user.findUnique({ where: { email } })
  }
  if (!user) {
    return res.status(401).json({ message: 'Identifiants incorrects.' })
  }
  const valide = await verifierMotDePasse(user.passwordHash, motDePasse)
  if (!valide) {
    return res.status(401).json({ message: 'Identifiants incorrects.' })
  }
  const token = creerJeton(user.id)
  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: email,
      subject: 'Nouvelle connexion à votre compte',
      text: 'Vous venez de vous connecter à votre compte.',
      html: '<p>Vous venez de vous connecter à votre compte.</p>'
    })
  } catch (err) {
    console.error('Mail non envoyé :', err)
  }
  res.json({ token })
}

async function forgotPassword(req, res) {
  const { email } = req.body
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) {
    return res.json({ message: 'Si cet e-mail existe, un lien a été envoyé.' })
  }
  const jeton = crypto.randomBytes(32).toString('hex')
  const jetonHash = crypto.createHash('sha256').update(jeton).digest('hex')
  await prisma.user.update({
    where: { email },
    data: {
      resetTokenHash: jetonHash,
      resetTokenExpiry: new Date(Date.now() + 30 * 60 * 1000)
    }
  })
  const lien = `http://monapp.fr/reset-password?token=${jeton}`
  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: email,
      subject: 'Réinitialisation de mot de passe',
      text: `Clique ici (valable 30 min) : ${lien}`,
      html: `<p>Clique ici (valable 30 min) : <a href="${lien}">Réinitialiser</a></p>`
    })
  } catch (err) {
    console.error('Mail non envoyé :', err)
  }
  res.json({ message: 'Si cet e-mail existe, un lien a été envoyé.' })
}

async function resetPassword(req, res) {
  const { token, nouveauMotDePasse } = req.body
  const tokenHash = crypto.createHash('sha256').update(token).digest('hex')
  const user = await prisma.user.findFirst({
    where: {
      resetTokenHash: tokenHash,
      resetTokenExpiry: { gt: new Date() }
    }
  })
  if (!user) {
    return res.status(400).json({ message: 'Jeton invalide ou expiré.' })
  }
  const nouveauHash = await hashMotDePasse(nouveauMotDePasse)
  await prisma.user.update({
    where: { id: user.id },
    data: {
      passwordHash: nouveauHash,
      resetTokenHash: null,
      resetTokenExpiry: null
    }
  })
  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: user.email,
      subject: 'Mot de passe modifié',
      text: 'Ton mot de passe a bien été changé.',
      html: '<p>Ton mot de passe a bien été changé.</p>'
    })
  } catch (err) {
    console.error('Mail non envoyé :', err)
  }
  res.json({ message: 'Mot de passe réinitialisé avec succès.' })
}

module.exports = { register, login, forgotPassword, resetPassword }