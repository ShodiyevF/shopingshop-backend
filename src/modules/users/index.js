const { loginCTRL, registerCTRL } = require('./ctrl')

const express = require('express').Router()

express.post('/auth/login', loginCTRL)
express.post('/auth/register', registerCTRL)

module.exports = express