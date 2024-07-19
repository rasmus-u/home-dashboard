import Metolib from '@fmidev/metolib';

const SERVER_URL = 'https://opendata.fmi.fi/wfs';
const STORED_QUERY_FORECAST =
  'fmi::forecast::harmonie::surface::point::multipointcoverage';

const getWeatherForecast = async (area, duration, step) => {
  const connection = new Metolib.WfsConnection();
  return new Promise((resolve, reject) => {
    if (connection.connect(SERVER_URL, STORED_QUERY_FORECAST)) {
      // Connection was properly initialized. So, get the data.
      connection.getData({
        requestParameter: "temperature,windspeedms,totalcloudcover,precipitationamount",
        begin: new Date(),
        end: new Date((new Date()).getTime() + duration),
        timestep: step,
        sites: area,
        callback: (data, errors) => {
          if (errors.length > 0) {
            console.error(errors);
            reject(errors); // Reject the promise on error
          } else {
            resolve(data); // Resolve the promise with data
          }
          connection.disconnect(); // Ensure disconnection in both cases
        }
      });
    }
  }
  )
}

const getWeatherType = (weather) => {
  const temperature = weather.temperature.value;
  const windspeed = weather.windspeedms.value;
  const cloudcover = weather.totalcloudcover.value;
  const precipitation = weather.precipitationamount.value;

  if (precipitation > 1) {
    if (temperature < 0) {
      return "SNOWING"
    } else if (precipitation >= 3.5) {
      return "POURING RAIN";
    } else {
      return "RAINING";
    }
  } else {
    if (windspeed >= 10) {
      return "WINDY"
    } else if (cloudcover >= 80) {
      return "CLOUDY";
    } else {
      return "SUNNY";
    }
  }
}

export { getWeatherForecast, getWeatherType }
