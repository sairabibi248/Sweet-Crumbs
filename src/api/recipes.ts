import type { RecipeSummary, RecipeDetail } from "../types/recipe";

const mealApiUrl = import.meta.env.VITE_MEAL_API_URL;

type RecipesResponse = {
  meals: RecipeSummary[] | null;
};

type RecipeDetailResponse = {
  meals: RecipeDetail[] | null;
};

/**
 * Gets all dessert recipes from TheMealDB.
 * Method GET.
 * Used by useQuery on the Recipes page.
 *
 * @returns The list of desserts or an empty list if nothing is found
 */

export const getDesserts = async (): Promise<RecipeSummary[]> => {
  const response = await fetch(`${mealApiUrl}/filter.php?c=Dessert`);

  if (!response.ok) {
    throw new Error("Failed to fetch desserts");
  }

  const data: RecipesResponse = await response.json();
  return data.meals ?? [];
};

/**
 * Gets the full details of one recipe from TheMealDB.
 * Method GET.
 * Used by useQuery in the RecipeDetails popup.
 *
 * @param id Id of the recipe
 * @returns The full recipe with ingredients and steps
 */

export const getRecipeById = async (id: string): Promise<RecipeDetail> => {
  const response = await fetch(`${mealApiUrl}/lookup.php?i=${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch recipe");
  }

  const data: RecipeDetailResponse = await response.json();

  if (!data.meals) {
    throw new Error("Recipe not found");
  }

  return data.meals[0];
};
