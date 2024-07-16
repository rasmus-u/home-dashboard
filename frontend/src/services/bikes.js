import axios from 'axios'
const baseUrl = '/api/bikeStations'

const getAllStations = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getStation = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}}`)
  return response.data
}

export default { getStation }