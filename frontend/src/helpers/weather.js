import Metolib from '@fmidev/metolib';

const SERVER_URL = 'https://opendata.fmi.fi/wfs';
const STORED_QUERY_FORECAST =
  'fmi::forecast::harmonie::surface::point::multipointcoverage';

export const getWeatherForecast = async (area, duration, step) => {
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
