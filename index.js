const express = require('express')
require('dotenv').config()
const router = require('./routes/index')
const app = express()
app.use(express.json())
app.use('/', router)
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})