require('dotenv').config()

const PORT = process.env.PORT
const HSL_KEY = process.env.HSL_PRIMARY_KEY
const HSL_API_URL = process.env.HSL_API_URL

module.exports = {
  PORT,
  HSL_KEY,
  HSL_API_URL
}