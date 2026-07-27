const express = require('express');
const cors = require('cors');
require('dotenv').config();

const router = require('./routes/index');

const app = express();

app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://api-bts-sio-8fzm-dfy8oxux3-denil1.vercel.app"
  ],
  credentials: true
}));

app.use(express.json());

app.use("/", router);

module.exports = app;