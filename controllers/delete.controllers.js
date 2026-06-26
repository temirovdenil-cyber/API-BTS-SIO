const prisma = require('../lib/prisma')

module.exports = async (req, res) => {
  try {
    const review = await prisma.review.delete({
      where: {
        id: parseInt(req.params.id)
      }
    })
    return res.json({ message: "Avis supprimé avec succès", review })
  } catch (error) {
    console.error("Erreur DELETE /avis :", error)
    return res.status(500).json({ error: "Erreur serveur" })
  }
}