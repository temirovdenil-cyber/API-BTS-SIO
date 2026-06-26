const { neonConfig, Pool } = require('@neondatabase/serverless')
const ws = require('ws')

neonConfig.webSocketConstructor = ws

const pool = new Pool({ 
  connectionString: 'postgresql://neondb_owner:npg_UmeLkYh8I3FM@ep-little-glitter-abwcjh3b-pooler.eu-west-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require'
})

pool.query('SELECT 1')
  .then(r => console.log('Connexion OK !', r.rows))
  .catch(e => console.error('Erreur:', e.message))