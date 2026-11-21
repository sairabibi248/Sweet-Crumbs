import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getDesserts } from "../api/recipes";
import RecipeCard from "../components/recipes/RecipeCard";
import RecipeDetails from "../components/recipes/RecipeDetails";

/**
 * Recipes page that shows dessert recipes from TheMealDB public API.
 * Lets the user search desserts by name and open a recipe in a popup.
 */

const Recipes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const {
    data: recipes = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["desserts"],
    queryFn: getDesserts,
  });

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.strMeal.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (isLoading) {
    return <p className="mt-10 text-center">Loading recipes...</p>;
  }

  if (isError) {
    return (
      <p className="mt-10 text-center text-red-500">Something went wrong.</p>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-lg font-semibold">
          {filteredRecipes.length} recipes
        </p>
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search desserts..."
          className="w-72 rounded-lg border border-[#fbcfe8] bg-white px-4 py-2 text-sm text-[#111827] outline-none focus:border-[#C2416C]"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {filteredRecipes.map((recipe) => (
          <RecipeCard
            key={recipe.idMeal}
            recipe={recipe}
            onView={() => setSelectedId(recipe.idMeal)}
          />
        ))}
      </div>

      {filteredRecipes.length === 0 && (
        <p className="text-center text-sm text-[#6b7280]">No recipes found.</p>
      )}

      {selectedId && (
        <RecipeDetails id={selectedId} onClose={() => setSelectedId(null)} />
      )}
    </div>
  );
};

export default Recipes;
