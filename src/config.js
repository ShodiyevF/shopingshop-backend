const env = require('dotenv')
const path = require('path')

env.config({path: path.join(__dirname, '.env')})

const jwt_password = process.env.jwt_password

module.exports = {
    jwt_password
}