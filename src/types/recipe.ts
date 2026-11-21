export type RecipeSummary = {
  /** Unique recipe id from TheMealDB */
  idMeal: string;
  /** Recipe name */
  strMeal: string;
  /** Recipe image URL */
  strMealThumb: string;
};

export type RecipeDetail = {
  /** Unique recipe id from TheMealDB */
  idMeal: string;
  /** Recipe name */
  strMeal: string;
  /** Recipe image URL */
  strMealThumb: string;
  /** Country or region of the recipe */
  strArea: string;
  /** Cooking steps as one long text */
  strInstructions: string;
  [key: string]: string | null;
};
