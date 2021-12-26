const express = require('express')
require('dotenv').config()
const cors = require('cors')
const sequelize = require('./db')
const router = require('./routes/routes')

const PORT = process.env.PORT

const app = express()
app.use(cors({
    origin: process.env.CLIENT_URL
}))
app.use(express.json())

app.use('/api', router)
app.use('/test', (req, res) => res.status(200).json({message: 'Work'}))
const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Start ${PORT}`))
    } catch (error) {
        console.log(error);
    }
}

start()