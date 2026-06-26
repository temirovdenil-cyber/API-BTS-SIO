const prisma = require('../lib/prisma')

module.exports = async (req, res) => {
  console.log('prisma:', prisma) 
  try {
    const { name, date, rating, description } = req.body

    const review = await prisma.review.create({
      data: {
        name,
        date: new Date(date),
        rating: parseInt(rating),
        description
      }
    })

    return res.json({ message: "Avis ajouté avec succès", review })
  } catch (error) {
    console.error("Erreur complète :", error.message)
    return res.status(500).json({ error: error.message })
  }
}