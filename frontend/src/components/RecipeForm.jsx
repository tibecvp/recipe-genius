function RecipeForm({ ingredients, setIngredients, onGenerate, loading, error }) {
    return (
        <>
            <div className="mb-6">
                <label htmlFor="ingredients" className="block text-gray-400 text-lg font-semibold mb-2">
                    Enter your ingredients
                </label>
                <textarea
                    id="ingredients"
                    className="
                        w-full
                        p-3
                        border
                        border-gray-300
                        rounded-lg
                        focus:border-indigo-500
                        transition-colors
                        duration-200
                        text-gray-300
                        resize-y
                        field-sizing-content
                    "
                    rows="2"
                    placeholder="e.g., chicken, broccoli, rice, soy sauce"
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                ></textarea>
            </div>

            <button
                onClick={onGenerate}
                className={`
                    w-full
                    py-3
                    px-6
                    rounded-lg
                    text-white
                    font-blod
                    text-lg
                    transition-all
                    duration-300
                    ease-in-out
                    ${loading || !ingredients
                        ? 'bg-red-400'
                        : 'bg-red-500 hover:bg-red-700 hover:font-semibold active:bg-purple-600 focus:outline-none focus:ring-4 focus:ring-red-300 cursor-pointer'
                    }
                `}
                disabled={loading || !ingredients}
            >
                {loading ? 'Generating Recipe...' : 'Generate Recipe'}
            </button>

            {error && (
                <div
                    className="
                        mt-6
                        p-4
                        border
                        border-red-500
                        text-red-500
                        rounded-lg
                        border
                        border-red-200
                    "
                    role="alert"
                >
                    <p className="font-semibold">Error:</p>
                    <p>{error}</p>
                </div>
            )}
        </>
    )
}

export default RecipeForm