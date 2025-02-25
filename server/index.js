require('dotenv').config()

const express = require('express')
const cors = require('cors')
const services = require('./services')
require('./db')

const app = express()
const PORT = process.env.SERVICE_PORT || 80

app.use(cors())
app.use(express.json({ type: 'application/vnd.api+json' }))
app.use(express.urlencoded({ extended: false }))
app.use('/', services)

app.listen(PORT, () => console.log('Server run at port', PORT))
