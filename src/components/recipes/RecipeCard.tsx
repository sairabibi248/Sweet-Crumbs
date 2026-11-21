import type { RecipeSummary } from "../../types/recipe";

type RecipeCardProps = {
  /** Recipe to show with its name and image */
  recipe: RecipeSummary;
  /** Runs when the user clicks View recipe and opens the details popup */
  onView: () => void;
};

/**
 * Card that shows one dessert with its image and name.
 */

const RecipeCard = ({ recipe, onView }: RecipeCardProps) => {
  return (
    <div className="group flex h-full flex-col rounded-2xl bg-[#fcf8f2] p-4 shadow-sm transition-shadow hover:shadow-md">
      <div className="overflow-hidden rounded-xl">
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="h-40 w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      <h3 className="mt-3 min-h-10 text-sm font-semibold text-[#4a2c11]">
        {recipe.strMeal}
      </h3>

      <button
        onClick={onView}
        className="mt-auto w-full rounded-lg bg-[#efeafa] py-2 text-sm font-medium text-[#5b4691] hover:bg-[#6f58a8] hover:text-white"
      >
        View recipe
      </button>
    </div>
  );
};

export default RecipeCard;
