const { confirmationEmail } = require('../lib/mailer')
 module.exports = async (req, res) => { 
  const variable = 'test'
  const subject = 'Test Email'
   const text = `This is a test email with variable: ${variable}`
    const hash = await argon2.hash('password123')
console.log('Hashed password:', hash)
const isValid = await argon2.verify(hash, 'password123')
console.log('Password is valid:', isValid)
  try {
   await confirmationEmail('test@example.com', subject, text)
 } catch (error) {
     console.error('Error sending email:', error)
   }
 
   res.json({
     message: 'Bienvenue sur l\'API de gestion des avis de films !',
     endpoints: {
       get: [
         {endpoint: '/avis', description: 'Récupérer tous les avis de films'},
         {endpoint: '/avis/:id', description: 'Récupérer un avis de film par son ID'}
       ],  
      post: [
         {endpoint: '/add/avis', description: 'Ajouter un nouvel avis de film'},
         {endpoint: '/register', description: 'Créer un compte utilisateur'}, 
       ]}
 }) }