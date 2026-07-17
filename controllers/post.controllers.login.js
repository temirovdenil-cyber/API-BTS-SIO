const prisma = require('../lib/prisma')
const { verifierMotDePasse } = require('../lib/lib/password')
const { creerJeton } = require('../lib/lib/jwt')
const transporter = require('../lib/mailer')

module.exports = async (req, res) => {
  const { email, motDePasse } = req.body

  try {
    const user = await prisma.user.findUnique({ where: { email } })

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
  } catch (error) {
    console.error('Erreur login :', error)
    res.status(500).json({ error: 'Erreur serveur' })
  }
}