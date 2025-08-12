// server.js
const express = require('express')
require('dotenv').config()
const { GoogleGenAI } = require('@google/genai')
const cors = require('cors')

const app = express()
const port = process.env.PORT || 3000

// Access API Key as an environment variable
const genAI = new GoogleGenAI({})

// Configure CORS to allow requests from FE origin
app.use(cors())

// Middleware to parse JSON bodies
app.use(express.json())

// Test route to check if the server is running
app.get('/', (req, res) => {
    res.send('RecipeGenius Backend is up and running!')
})

// Endpoint to generate a recipe
app.post('/generate-recipe', async (req, res) => {
    try {
        const { ingredients } = req.body

        if (!ingredients || ingredients.length === 0) {
            return res.status(400).json({ error: 'Please provide a list of ingredients.' })
        }

        // For text only input, use the gemini-pro model
        const model = 'gemini-2.5-flash'

        const prompt = `Evaluate the following list of items: ${ingredients.join(', ')}.
        If any item is clearly NOT a food ingredient (e.g., "fdsfds", "asdfgh", "123"),
        return a JSON object with a single field "errorType" (string) set to "InvalidIngredients" and
        a "message" (string) explaining which items were invalid.
        Otherwise, if all items are valid food ingredients,
        create a detailed and delicious recipe using ONLY the valid food ingredients.
        Format the recipe response as a JSON object with the following fields:
        "title" (string), "yields" (string), "prepTime" (string), "cookTime" (string),
        "ingredients" (an array of strings), and "instructions" (an array of objects,
        where each object has a "title" key with a string and a "description" key with a string).
        Your response MUST be a valid JSON object following one of these two schemas, with no additional text or markdown outside the JSON.`

        const result = await genAI.models.generateContent({
            model: model,
            contents: prompt
        })

        const text = result.text

        // Clean extra formating from API's response to ensure valid JSON
        const cleanedText = text.replace(/```json\n|```/g, '').trim()

        // Attemp to parse the cleaned text
        const parsedResponse = JSON.parse(cleanedText)

        // Check if the AI resturned an errorType, indicating invalid ingredients
        if (parsedResponse.errorType === "InvalidIngredients") {
            return res.status(400).json({ error: `${parsedResponse.message} Please provide only valid food items.` })
        }

        // Otherwise, send the recipe back to the client
        res.json(parsedResponse)
    } catch (error) {
        console.error('Error generating recipe:', error)
        res.status(500).json({ error: 'Failed to generate recipe.' })
    }
})

// Start the server
app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`)
})