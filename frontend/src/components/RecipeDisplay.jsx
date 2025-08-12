function RecipeDisplay({ recipe }) {
    if (!recipe) return null
    return (
        <div
            className="
                mt-8 
                bg-gray-900
                p-6
                rounded-lg
                shadow-inner
                border-gray-200
            "
        >
            <h2
                className="
                    text-3xl
                    font-bold
                    text-gray-200
                    mb-4
                "
            >{recipe.title}</h2>
            <div
                className="
                    grid
                    grid-cols-1
                    md:grid-gols-3
                    gap-4
                    mb-6
                    text-gray-400
                "
            >
                <p><strong className="font-semibold">Yields:</strong> {recipe.yields}</p>
                <p><strong className="font-semibold">Prep Time:</strong> {recipe.prepTime}</p>
                <p><strong className="font-semibold">Cook Time:</strong> {recipe.cookTime}</p>
            </div>

            <h3
                className="
                    text-2xl
                    font-semibold
                    text-gray-200
                    mb-3
                "
            >Ingredients:</h3>
            <ul
                className="
                    list-disc
                    pl-4
                    space-y-1
                    text-gray-400
                    mb-6
                "
            >
                {recipe.ingredients.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>

            <h3
                className="
                    text-2xl
                    font-semibold
                    text-gray-200
                    mb-3
                "
            >Instructions:</h3>
            <ol
                className="
                    list-decimal
                    pl-4
                    space-y-3
                    text-gray-400
                "
            >
                {recipe.instructions.map((instruction, index) => (
                    <li key={index} className="mb-2">
                        <strong className="font-semibold text-gray-200">
                            {instruction.title}
                        </strong><br />
                        {instruction.description}
                    </li>
                ))}
            </ol>

        </div>
    )
}

export default RecipeDisplay