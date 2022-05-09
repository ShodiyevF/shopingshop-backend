const express = require('express')

const app = express()
app.use(express.json())

const auth = require('./modules/users')
const products = require('./modules/products')
const orders = require('./modules/orders')

app.use(auth)
app.use(products)
app.use(orders)

app.listen(4000, () => {
    console.log('server running on http://localhost:4000')
})