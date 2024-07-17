import axios from 'axios'
const baseUrl = '/api/stops'

const getStop = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const getMultipleStops = async (ids) => {
  const idsPath = ids.join('/')
  const url = `${baseUrl}/multipleStops/${idsPath}`
  const response = await axios.get(url)
  return response.data
}

export default { getStop, getMultipleStops }