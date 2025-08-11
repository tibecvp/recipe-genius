// server.js
const express = require('express')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 3000

// Middleware to parse JSON bodies
app.use(express.json())

// Test route to check if the server is running
app.get('/', (req, res) => {
    res.send('RecipeGnius Backend is up and running!')
})

// Start the server
app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`)
})