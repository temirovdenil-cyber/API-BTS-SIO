const express = require('express');
const cors = require('cors');
require('dotenv').config();

const router = require('./routes/index');

const app = express();

app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://next-bts-mcm1a4uzn-denil1.vercel.app"
  ],
  credentials: true
}));

app.use(express.json());

app.use("/", router);

module.exports = app;