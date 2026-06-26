const { defineConfig, env } = require("prisma/config");

if (typeof process.loadEnvFile === "function") {
  try {
    process.loadEnvFile();
  } catch {
    // Ignore missing .env or load errors.
  }
}

module.exports = defineConfig({
  schema: "prisma/schema.prisma",
  migrations: { path: "prisma/migrations" },
  datasource: {
    provider: "postgresql",
    url: env("DATABASE_URL"),
  },
});  