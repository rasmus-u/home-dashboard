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
        departure: pattern.realtimeDeparture,
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
            timeRange: 3600
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

stopRouter.get('/multipleStops/*', async (request, response) => {
  // Multiple stops

  const stopIdsPath = request.params[0]
  const stopIds = stopIdsPath.split('/').filter(id => id)

  if (stopIds.length > 5) {
    // too many stops requested
    response.status(400).send('Too many stops in query')
  }

  const stopQuery = (stopId, index) => `
        stop${index}: stop(id: "${stopId}") {
          name
          vehicleMode
          gtfsId
          stoptimesWithoutPatterns(
            timeRange: 3600
            omitCanceled: false 
            numberOfDepartures: 10)
          {
            realtimeDeparture
            realtime
            headsign
            trip {
              route {
                shortName
              }
            }
          }
        }
  `

  const baseQuery = {
    query: `
      query {
        ${stopIds.map((id, index) => stopQuery(id, index))}
      }
    `
  }

  const time = new Date()
  const now = time.getHours() * 3600 + time.getMinutes() * 60 + time.getSeconds()
  const stops = [
    {
      "name": "Hanken",
      "id": "HSL:1130439",
      "vehicleMode": "TRAM",
      "routes": [
        {
          "departure": now,
          "headsign": "Olympiaterm. via Kamppi",
          "routeNumber": "2"
        },
        {
          "departure": now + 30,
          "headsign": "Katajanokka via Lasipalatsi",
          "routeNumber": "4"
        },
        {
          "departure": now + 60,
          "headsign": "Kirurgi via Lasipalatsi",
          "routeNumber": "10"
        },
        {
          "departure": now + 120,
          "headsign": "Olympiaterm. via Kamppi",
          "routeNumber": "2"
        },
        {
          "departure": now + 360,
          "headsign": "Katajanokka via Lasipalatsi",
          "routeNumber": "4"
        },
        {
          "departure": now + 400,
          "headsign": "Kirurgi via Lasipalatsi",
          "routeNumber": "10"
        },
        {
          "departure": now + 600,
          "headsign": "Olympiaterm. via Kamppi",
          "routeNumber": "2"
        },
        {
          "departure": now + 601,
          "headsign": "Katajanokka via Lasipalatsi",
          "routeNumber": "4"
        },
        {
          "departure": now + 602,
          "headsign": "Kirurgi via Lasipalatsi",
          "routeNumber": "10"
        },
        {
          "departure": now + 610,
          "headsign": "Olympiaterm. via Kamppi",
          "routeNumber": "2"
        }
      ]
    },
    {
      "name": "Arkadiankatu",
      "id": "HSL:1130125",
      "vehicleMode": "BUS",
      "routes": [
        {
          "departure": now,
          "headsign": "Jätkäsaari via Ruoholahti (M)",
          "routeNumber": "8X"
        },
        {
          "departure": now + 30,
          "headsign": "Jätkäsaari via Ruoholahti (M)",
          "routeNumber": "8X"
        },
        {
          "departure": now + 60,
          "headsign": "Jätkäsaari via Ruoholahti (M)",
          "routeNumber": "8X"
        },
        {
          "departure": now + 70,
          "headsign": "Jätkäsaari via Ruoholahti (M)",
          "routeNumber": "8X"
        },
        {
          "departure": now + 80,
          "headsign": "Jätkäsaari via Ruoholahti (M)",
          "routeNumber": "8X"
        }
      ]
    }
  ]

  try {
    if (process.env.MODE === 'dev') {
      return response.status(200).json(stops)
    } else {
      const apiResponse = await axios.post(apiUrl, baseQuery, headers)
      const data = Object.values(apiResponse.data.data)
      const stops = data.map(v => toObject(v))
      response.status(200).json(stops)
    }
  } catch (error) {
    console.error(error)
    response.status(500).send('Internal server error.')
  }
})

module.exports = stopRouter