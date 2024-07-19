const bikeRouter = require('express').Router()
const axios = require('axios')
const config = require('../utils/config')

// https://digitransit.fi/en/developers/apis/1-routing-api/bicycling/

const apiUrl = config.HSL_API_URL
const headers = {
  headers: {
    'digitransit-subscription-key': config.HSL_KEY,
    'Content-Type': 'application/json'
  }
}

bikeRouter.get('/', async (request, response) => {
  // All stations

  const query = {
    query: `
      query {
        bikeRentalStations {
          name
          stationId
        }
      }
    `
  }

  try {
    const apiResponse = await axios.post(apiUrl, query, headers)
    console.log(apiResponse)
    response.status(200).json(apiResponse.data)
  } catch (error) {
    console.error(error)
    response.status(500).send('Internal server error.')
  }
})

bikeRouter.get('/:id', async (request, response) => {
  // One station

  // stations of interest:
  // Kauppakorkeakoulu: 033
  // Leppäsuonaukio: 162
  // Sammonpuistikko: 070

  const stationId = request.params.id

  const query = {
    query: `
      query {
        bikeRentalStation(id: "${stationId}") {
          stationId
          name
          bikesAvailable
          spacesAvailable
        }
      }
    `
  }

  try {
    const apiResponse = await axios.post(apiUrl, query, headers)
    response.status(200).json(apiResponse.data.data.bikeRentalStation)
  } catch (error) {
    console.error(error)
    response.status(500).send('Internal server error.')
  }
})

bikeRouter.get('/multipleStations/*', async (request, response) => {
  // Multiple stations

  const stationIdsPath = request.params[0]
  const stationIds = stationIdsPath.split('/').filter(id => id)

  if (stationIds.length > 5) {
    // too many stations for query safety
    response.status(400).send('Too many stations in query')
  }

  const stationQuery = (stationId) => `
        station${stationId}: bikeRentalStation(id: "${stationId}") {
          stationId
          name
          bikesAvailable
          spacesAvailable
        }
    `

  const baseQuery = {
    query: `
      query {
        ${stationIds.map(id => stationQuery(id))}
      }
    `
  }

  const bikes = [
    {
      "stationId": "033",
      "name": "Kauppakorkeakoulu",
      "bikesAvailable": 0,
      "spacesAvailable": 16
    },
    {
      "stationId": "070",
      "name": "Sammonpuistikko",
      "bikesAvailable": 2,
      "spacesAvailable": 13
    },
    {
      "stationId": "162",
      "name": "Leppäsuonaukio",
      "bikesAvailable": 5,
      "spacesAvailable": 24
    }
  ]

  try {
    if (process.env.MODE === 'dev') {
      return response.status(200).json(bikes)
    } else {
      const apiResponse = await axios.post(apiUrl, baseQuery, headers)
      const data = Object.values(apiResponse.data.data)
      response.status(200).json(data)
    }
  } catch (error) {
    console.error(error)
    response.status(500).send('Internal server error.')
  }
})

module.exports = bikeRouter