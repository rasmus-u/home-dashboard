const stopRouter = require('express').Router()
const axios = require('axios')
const config = require('../utils/config')

// https://digitransit.fi/en/developers/apis/1-routing-api/stops/

const apiUrl = config.HSL_API_URL
const headers = {
  headers: {
    'digitransit-subscription-key': config.HSL_KEY,
    'Content-Type': 'application/json'
  }
}

const toObject = (stop) => {
  return (
    {
      name: stop.name,
      id: stop.gtfsId,
      vehicleMode: stop.vehicleMode,
      routes: stop.stoptimesWithoutPatterns.map(pattern => ({
        arrival: pattern.realtimeArrival,
        headsign: pattern.headsign,
        routeNumber: pattern.trip.route.shortName
      }))
    }
  )
}

stopRouter.get('/:id', async (request, response) => {
  // One stop

  // stops of interest:
  // Hanken tram east: HSL:1130439
  // Arkadiankatu tram south: HSL:1130125


  const stopId = request.params.id

  const query = {
    query: `
      query {
        stop(id: "${stopId}") {
          name
          vehicleMode
          gtfsId
          stoptimesWithoutPatterns(
            timeRange: 1200 
            omitCanceled: false 
            numberOfDepartures: 10)
          {
            realtimeArrival
            realtime
            headsign
            trip {
              route {
                shortName
              }
            }
          }
        }
      }
    `
  }

  try {
    const apiResponse = await axios.post(apiUrl, query, headers);
    console.log(apiResponse)
    const data = toObject(apiResponse.data.data.stop)
    response.status(200).json(data)
  } catch (error) {
    console.error(error)
    response.status(500).send('Internal server error.')
  }
})

module.exports = stopRouter