require('dotenv').config()

const PORT = process.env.PORT
const HSL_KEY = process.env.HSL_PRIMARY_KEY

module.exports = {
  PORT,
  HSL_KEY
}