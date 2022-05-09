const { postProductCtrl, deleteProductCtrl, putProductCtrl } = require('./ctrl')

const express = require('express').Router()

express.post('/products/create', postProductCtrl)
express.delete('/products/delete', deleteProductCtrl)
express.put('/products/put', putProductCtrl)

module.exports = express