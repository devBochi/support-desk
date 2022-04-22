const express = require('express')
const path = require('path')
const colors = require('colors')
const connectDB = require('../backend/config/db')
const dotenv = require('dotenv').config()
const { errorHandler } = require('../backend/middleware/errorMiddleware')
const PORT = process.env.PORT || 5000

// Connect to database
connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) => {
    res.status(200).json({message: 'Welcome to Support Desk Website!'})
})

app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/tickets', require('./routes/ticketRoutes'))

// Serve frontend
if(process.env.NODE_ENV === 'production') {
    // Set build folder as static
    app.use(express.static(path.join(__dirname, '../frontend/build')))
    
    // FIX: below code fixes app crashing on refresh in deployment
    app.get('*', (_, res)=> {
        res.sendFile(path.join(__dirname, '../', 'frontend', 'build', 'index.html'))
    }
    )
} else {
    app.get('/', (req, res) => {
        res.status(200).json({message: 'Welcome to Support Desk Website!'})
    })
}

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
