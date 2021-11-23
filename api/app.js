const cors = require('cors')
const morgan = require('morgan')
const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')
const authRoutes = require('./routes/auth')
const warehouseRoutes = require('./routes/warehouse')

const app = express()

app.use(passport.initialize())
require('./middleware/passport')(passport)

app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())


app.use('/api/auth', authRoutes)
app.use('/api/warehouse', warehouseRoutes)

module.exports = app
