const { verifierJeton } = require('../lib/lib/jwt')

function authMiddleware(req, res, next) {
 
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Jeton manquant.' })
  }

  const token = authHeader.split(' ')[1] 

  try {
    const payload = verifierJeton(token)
    req.user = payload 
    next()            
  } catch (err) {
    return res.status(401).json({ message: 'Jeton invalide ou expiré.' })
  }
}

module.exports = authMiddleware
