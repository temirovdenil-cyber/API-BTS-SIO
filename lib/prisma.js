const { neonConfig, Pool } = require('@neondatabase/serverless')
const { PrismaNeon } = require('@prisma/adapter-neon')
const { PrismaClient } = require('@prisma/client')
const ws = require('ws')

neonConfig.webSocketConstructor = ws

const DATABASE_URL = "postgresql://neondb_owner:npg_UmeLkYh8I3FM@ep-little-glitter-abwcjh3b-pooler.eu-west-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require"

const adapter = new PrismaNeon({ connectionString: DATABASE_URL })
const prisma = new PrismaClient({ adapter })

module.exports = prisma