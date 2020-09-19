require('dotenv').config()

const express = require('express')
const cors = require('cors')
const services = require('./services')

const app = express()
const PORT = process.env.PORT || 80

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', services)

app.listen(PORT, () => console.log('Server run at port', PORT))
