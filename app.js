const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const dotenv = require('dotenv')
const path = require('path')
const app = express()
const CONNECTDB = require('./src/config/db')
// const path = require('path')
const expressUpload = require('express-fileupload')

// Load Config
dotenv.config()

CONNECTDB()

app.use(express.json())
// parse urlencoded request body
app.use(express.urlencoded({ extended: true }))

// enable cors
app.use(cors())
app.options('*', cors())
app.use(morgan('tiny'))
app.use(expressUpload())

app.use('/v1', require('./src/routes/v1'))

app.use(express.static(path.join(__dirname, 'public')))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log('connected to Localhost'))
