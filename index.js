const express = require("express");
const cors = require("cors");
require("dotenv").config();

const router = require("./routes/index");
const app = express();
const allowedOrigins = [
  "http://localhost:3000",
  "https://next-bts-sio.vercel.app",
  "https://next-bts-dc1nkmkdu-denil1.vercel.app",
  "https://next-bts-mcm1a4uzn-denil1.vercel.app"
];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) {
      return callback(null, true);
    }
    if (
      allowedOrigins.includes(origin) ||
      /^https:\/\/next-bts-[a-z0-9-]+-denil1\.vercel\.app$/.test(origin)
    ) {
      return callback(null, true);
    }

    return callback(new Error("Origine refusée par CORS"));
  },
  credentials: true
}));

app.use(express.json());
app.use("/", router);

module.exports = app;