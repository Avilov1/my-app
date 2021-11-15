const cors = require('cors')
const morgan = require('morgan')
const express = require('express')
const authRoutes = require('./routes/auth')
const warehouseRoutes = require('./routes/warehouse')
const productRoutes = require('./routes/product')
const bodyParser = require('body-parser')
const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())


app.use('/api/auth', authRoutes)
app.use('/api/warehouse', warehouseRoutes)
app.use('/api/product', productRoutes)

module.exports = app
