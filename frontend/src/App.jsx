import { useState } from 'react'
import './App.css'
import RecipeForm from './components/RecipeForm'
import RecipeDisplay from './components/RecipeDisplay'
import Logo from './components/Logo'

function App() {
  const [ingredients, setIngredients] = useState('')
  const [recipe, setRecipe] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

  const handleGenerateRecipe = async () => {
    setLoading(true)
    setError(null)
    setRecipe(null) // Clear previous recipe

    try {
      const ingredientsArray = ingredients.split(',').map(item => item.trim()).filter(item => item !== '')

      if (ingredientsArray.length === 0) {
        setError('Please enter at least one ingredient.')
        setLoading(false)
        return
      }

      const response = await fetch(`${BACKEND_URL}/generate-recipe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ingredients: ingredientsArray })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(`Server error: ${response.status} - ${errorData.error || 'Something went wrong!'}`)
      }

      const data = await response.json()
      setRecipe(data)
    } catch (error) {
      console.error('Error fetching recipe:', error)
      setError(error.message || 'Failed to connect to the backend. Verify the backend server is running.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className='
        min-h-screen
        bg-gradient-to-r
        from-red-500
        to-indigo-500
        flex
        flex-col
        items-center
        justify-center
        p-12
      '
    >
      <div
        className='
          bg-gray-800
          p-8
          rounded-lg
          shadow-xl
          w-full
          max-w-2xl
          transform
          transition-transform
          duration-300
          hover:scale-[1.01]
        '
      >
        <h1
          className='
            flex
            justify-center
            gap-2
            text-4xl
            font-extrabold
            text-center
            text-white
            mb-8
            tracking-tight
          '
        >
          <Logo className="w-4" />
          RecipeGenius
        </h1>

        <RecipeForm
          ingredients={ingredients}
          setIngredients={setIngredients}
          onGenerate={handleGenerateRecipe}
          loading={loading}
          error={error}
        />

        {recipe && <RecipeDisplay recipe={recipe} />}
      </div>
    </div>
  )
}

export default App
