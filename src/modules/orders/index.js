const { getOrdersCTRL, postOrdersCTRL } = require('./ctrl')

const express = require('express').Router()

express.post('/orders/get', getOrdersCTRL)
express.post('/orders/post', postOrdersCTRL)

module.exports = express