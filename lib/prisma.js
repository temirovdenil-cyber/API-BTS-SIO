const { neonConfig } = require('@neondatabase/serverless');
const { PrismaNeon } = require('@prisma/adapter-neon');
const { PrismaClient } = require('@prisma/client');
const ws = require('ws');

neonConfig.webSocketConstructor = ws;

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL n'est pas définie.");
}

const adapter = new PrismaNeon({ connectionString: DATABASE_URL });

const prisma = new PrismaClient({
  adapter,
});

module.exports = prisma;