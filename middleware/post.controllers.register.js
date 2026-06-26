const sendEmail = require('../lib/email')
const argon2 = require('../lib/password')
const prisma = require('../lib/prisma')

module.exports = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  try {
    const hash = argon2.hashMotDePasse(password)
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hash
      }
    })
    return res.status(201).json({
      error: false,
      user
    })
  } catch (error) {
    console.error("Error hashing password ", error)
    return res.status(500).json({
      error: true,
      message: "erreur lors du hashage du mot de passe"
    })
  }
  const to = email
  const subject = "Bienvenue sur notre site !"
  const text = `Bonjour ${name},\n\nMerci de vous être inscrit sur notre site. Nous sommes ravis de vous compter parmi nos utilisateurs.\n\nCordialement`
  try {
    await sendEmail(to, subject, text)
  } catch (error) {
    console.error("Error sending email ", error)
    } 
    return res.status( 201).json({
        error: false,
        message: "Utilisateur créé avec succès et email de bienvenue envoyé"
    })
}
    