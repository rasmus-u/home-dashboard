import Metolib from '@fmidev/metolib';

const SERVER_URL = 'https://opendata.fmi.fi/wfs';
const STORED_QUERY_FORECAST =
  'fmi::forecast::hirlam::surface::point::multipointcoverage';

const getWeatherForecast = async (area, duration, step) => {
  const connection = new Metolib.WfsConnection();
  if (connection.connect(SERVER_URL, STORED_QUERY_FORECAST)) {
    // Connection was properly initialized. So, get the data.
    connection.getData({
      requestParameter: "temperature,windspeedms",
      begin: new Date(),
      end: new Date((new Date()).getTime() + 26 * 60 * 60 * 1000),
      timestep: 60 * 60 * 1000,
      sites: ["Helsinki", "Turku"],
      callback: (data, errors) => {
        connection.disconnect(); // Ensure disconnection in both cases
        if (errors.length > 0) {
          console.error(errors);
          reject(errors); // Reject the promise on error
        } else {
          resolve(data); // Resolve the promise with data
        }
      }
    });
  }
}

export default getWeatherForecast;