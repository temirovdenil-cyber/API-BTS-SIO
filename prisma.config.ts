const { defineConfig, env } = require("prisma/config")

process.loadEnvFile()

module.exports = defineConfig({
  schema: "prisma/schema.prisma",
  migrations: { path: "prisma/migrations" },
  datasource: {
    provider: "postgresql",
    url: env("DATABASE_URL"),
  },
})