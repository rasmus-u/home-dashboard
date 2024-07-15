const cors = require('cors')
const express = require('express')
const bikeRouter = require('./controllers/bikes')
const stopRouter = require('./controllers/stops')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/bikeStations', bikeRouter)
app.use('/api/stops', stopRouter)

module.exports = app
