import { useQuery } from "@tanstack/react-query";
import Modal from "../ui/Modal";
import { getRecipeById } from "../../api/recipes";
import type { RecipeDetail } from "../../types/recipe";

type RecipeDetailsProps = {
  /** Id of the recipe to load from TheMealDB */
  id: string;
  /** Runs when the user clicks Close or clicks outside the popup */
  onClose: () => void;
};
const getIngredients = (recipe: RecipeDetail) => {
  const ingredients: string[] = [];

  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];

    if (ingredient && ingredient.trim() !== "") {
      ingredients.push(`${measure ?? ""} ${ingredient}`.trim());
    }
  }

  return ingredients;
};

/**
 * Popup that shows the full recipe with image and ingredients and steps.
 * Loads the recipe only when the popup opens.
 * Used on the Recipes page.
 */

const RecipeDetails = ({ id, onClose }: RecipeDetailsProps) => {
  const {
    data: recipe,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["recipe", id],
    queryFn: () => getRecipeById(id),
  });

  return (
    <Modal onClose={onClose}>
      <div className="w-150 max-w-full max-h-[85vh] overflow-y-auto rounded-2xl bg-[#fff7fa] p-7">
        {isLoading && (
          <p className="py-10 text-center text-[#7a5c43]">Loading recipe...</p>
        )}

        {isError && (
          <p className="py-10 text-center text-red-500">
            Could not load recipe.
          </p>
        )}

        {recipe && (
          <div className="flex flex-col gap-4">
            <img
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
              className="h-60 w-full rounded-xl object-cover"
            />

            <div>
              <h2 className="text-2xl font-bold text-[#4a2c11]">
                {recipe.strMeal}
              </h2>
              <p className="text-sm text-[#7a5c43]">{recipe.strArea} dessert</p>
            </div>

            <div>
              <h3 className="mb-2 font-semibold text-[#4a2c11]">Ingredients</h3>
              <ul className="list-disc pl-5 text-sm text-[#374151]">
                {getIngredients(recipe).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-2 font-semibold text-[#4a2c11]">
                Instructions
              </h3>
              <p className="whitespace-pre-line text-sm text-[#374151]">
                {recipe.strInstructions}
              </p>
            </div>
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-lg border border-[#d1d5db] bg-[#f3f4f6] px-5 py-2 font-semibold text-[#374151] hover:bg-[#e5e7eb]"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default RecipeDetails;
