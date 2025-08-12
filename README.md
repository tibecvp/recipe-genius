# Recipe Genius
A full-stack application that uses the Google Gemini API to generate recipes based on user-provided ingredients. The project consists of a Node.js/Express.js backend and a React.js frontend. It will be deployed to an AWS EC2 instance. This is a learning project to explore modern web development, API integration, and fundamental cloud infrastructure practices.

## Table of Contents
[Prerequisites](#prerequisites)
[Getting Started](#getting-started)
[Backend API Documentation](#backend-api-documentation)
[Frontend Setup](#frontend-setup)
[Deployment](#deployment)

## Prerequisites
Before you begin, ensure you have the following software installed on your machine:
- Node.js: https://nodejs.org/
- npm: (Comes with Node.js)
- Git: https://git-scm.com/
You will also need a Google API key for the Gemini API, which you can obtain from the Google AI Studio.

## Getting Started
1. Clone the repository:
    ```
    git clone https://github.com/your-username/recipe-genius.git
    cd recipe-genius
    ```
2. Set up the environment variables:
    - Navigate to the ``backend`` directory: ``cd backend``
    - Create a ``.env`` file in the ``backend`` directory.
    - Add your Google API key to the file:
        ```
        GEMINI_API_KEY=<YOUR_GOOGLE_API_KEY>
        ```
    - Add ``.env`` to your ``.gitignore`` file to prevent it from being committed.
3. Install backend dependencies:
    - From the backend directory, run:
        ```
        npm install
         ```
4. Run the backend server:
    ```
    node server.js
    ```
    The server will start on http://localhost:3000.

## Backend API Documentation
``POST /generate-recipe``
This endpoint generates a recipe using the Gemini API based on a list of ingredients.
- URL: ``http://localhost:3000/generate-recipe``
- Method: ``POST``
- Request Body: A JSON object with a single key ingredients, which is an array of strings.
    Example:
    ```
    {
    "ingredients": ["chicken breast", "rice", "broccoli", "soy sauce"]
    }
    ```
- Success Response: Returns a JSON object containing the generated recipe.
    Example:
    ```
    {
    "title": "Soy Garlic Chicken & Broccoli Rice Bowl",
    "yields": "2-3 servings",
    "prepTime": "20 minutes",
    "cookTime": "15-20 minutes",
    "ingredients": [
        "2 boneless, skinless chicken breasts (about 1 lb / 450g), cut into 1-inch pieces",
        "1 cup uncooked white rice (or brown rice)",
        "1 head broccoli (about 4 cups florets), cut into bite-sized pieces",
        "1/4 cup low-sodium soy sauce",
        "2 cloves garlic, minced",
        "1 inch fresh ginger, grated or minced (about 1 tablespoon)",
        "1 tablespoon cornstarch",
        "1/2 cup water (for the sauce)",
        "2 tablespoons cooking oil (e.g., vegetable, canola)"
    ],
    "instructions": [
        {
        "title": "Prepare the Rice",
        "description": "Cook the rice according to package directions. This usually takes about 15-20 minutes, so it can cook while you prepare the rest of the meal."
        },
        {
        "title": "Prep Ingredients",
        "description": "Cut the chicken breasts into bite-sized 1-inch pieces. Cut the broccoli head into small, bite-sized florets. Mince the garlic and grate or finely mince the fresh ginger."
        }
    ]
    }
    ```
- Error Response:
    - Status 400 Bad Request: If the ``ingredients`` array is missing.
    - Status 500 Internal Server Error: If there is an issue with the API or parsing the response.

**CORS Configuration:** 
The backend is configured to handle Cross-Origin Resource Sharing (CORS) requests. In development, it allows all origins. For production, it's recommended to restrict this to your frontend's specific domain for security.

## Frontend Setup
1. Navigate to the ``frontend`` directory: 
    ```
    cd ../frontend
    ```
2. Install dependencies:
    ```
    npm install
    ```
    This will install React, Vite, and other necessary packages, including ``axios`` (or ``fetch`` is used natively in ``App.jsx``).
3. Set up frontend environment variables:
    - Create a ``.env`` file in the ``frontend`` directory.
    - Add your backend server's URL. If your backend is running locally, it will look like this:
    ````
    VITE_BACKEND_URL=http://localhost:3000
    ```
    - When deployed, this should be the public URL of your backend.
4. Run the frontend development server:
    ````
    npm run dev
    ```
    The frontend will typically start on ``http://localhost:5173``.

## Deployment
The application is deployed manually to an Amazon EC2 instance. The process involves SSHing into the instance, cloning the repository, installing dependencies, and running the backend server and a web server (like Nginx) to serve the frontend.