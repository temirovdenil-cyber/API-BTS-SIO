const json = require('../mocks/reviews.json')
const prisma = require("../lib/prisma")

module.exports = (req, res) => {
  return res.json(json.reviews)
}
module.exports = async (req, res) => {
  try {
    const reviews = await prisma.review.findMany()
    return res.json(reviews)
  } catch (error) {
    console.error("Erreur GET /avis :", error)
    return res.status(500).json({ error: "Erreur serveur" })
  }
}   