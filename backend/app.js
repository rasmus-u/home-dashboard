const cors = require('cors')
const express = require('express')
const bikeRouter = require('./controllers/bikes')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/bikeStations', bikeRouter)

module.exports = app
