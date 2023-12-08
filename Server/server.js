const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config()
const port = process.env.port || 5000
const app = express()
const router = require('./router');
const mongoose = require('mongoose')
const errorMiddleware = require('./middlewares/error-middlewares')
const sequelize = require('./db')


app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}))
app.use('/api', router)
app.use(errorMiddleware)

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(port, () => console.log(`Server started on PORT ${port}`))
    } catch (e) {
        console.log(`Database connect error: ${e}!`)
    }
}

start()