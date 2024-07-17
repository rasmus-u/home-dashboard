import axios from 'axios'
const baseUrl = '/api/stops'

const getStop = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

export default { getStop }