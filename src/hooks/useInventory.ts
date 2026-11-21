import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {getItems, deleteItem, createItem, updateItem, type NewItem } from "../api/items";
import type { Item } from "../types/item";

/**
 * A product is marked as Low Stock when its quantity is below this number.
 * Used in stats below to count in stock and low stock products.
 */
const lowStockLimit = 5;

/**
 * Custom hook that holds all inventory data and logic.
 * Loads products from MockAPI with TanStack Query.
 * Gives search and category filter and stats.
 * Gives functions to add and edit and delete and change quantity.
 * Used in Inventory.tsx and Overview.tsx and OrderForm.tsx.
 *
 * @returns Filtered items and stats and loading state and all inventory functions
 */

export const useInventory = () => {
  /**
   * TanStack Query client that controls the cached data.
   * Used to refresh or update the items list after a change.
   */
  const queryClient = useQueryClient();

  /**
   * The full product list from MockAPI.
   * Saved in the cache with the key items so every page shares the same data.
   * Starts as an empty list until the data arrives.
   * Used to build filteredItems and stats.
   */

  const {
    data: items = [], isLoading, isError, } = useQuery({
    queryKey: ["items"],
    queryFn: getItems,
  });

  /**
   * Text typed in the search box. Starts empty.
   * Changed by SearchBar.tsx through setSearchTerm.
   * Used in filteredItems.
   */
  const [searchTerm, setSearchTerm] = useState("");

  /**
   * Category button that is selected. Starts as All.
   * Changed by SearchBar.tsx through setActiveCategory.
   * Used in filteredItems.
   */
  const [activeCategory, setActiveCategory] = useState("All");

  /**
   * Products that match both the search text and the selected category.
   * Recalculated only when items or search text or category change.
   * Returned as items and shown as cards on the Inventory page.
   */
  const filteredItems = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return items.filter((item) => {
      const matchesCategory =
        activeCategory === "All" || item.category === activeCategory;

      const matchesSearch =
        item.title.toLowerCase().includes(term) ||
        item.category.toLowerCase().includes(term);
      return matchesCategory && matchesSearch;
    });
  }, [items, searchTerm, activeCategory]);

  /**
   * Counts shown in the 4 stats cards on the Overview page.
   * Calculated from all products and not only the filtered ones.
   * So the numbers do not change when the user searches.
   * Recalculated only when items change.
   */
  const stats = useMemo(() => {
    return {
      totalProducts: items.length,
      inStock: items.filter((item) => item.quantity >= lowStockLimit).length,
      lowStock: items.filter(
        (item) => item.quantity > 0 && item.quantity < lowStockLimit,
      ).length,
      soldOut: items.filter((item) => item.quantity === 0).length,
    };
  }, [items]);

  /**
   * Deletes a product from MockAPI.
   * After success it refreshes the items list.
   * Called by the Delete button after the user confirms.
   */

  const deleteMutation = useMutation({
    mutationFn: deleteItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });

  /**
   * Adds a new product to MockAPI.
   * After success it refreshes the items list.
   * Called when the user saves the Add Item form.
   */

  const addMutation = useMutation({
    mutationFn: createItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });

  /**
   * Updates a product in MockAPI.
   * Used for the Edit form and the + and - quantity buttons.
   * The screen is updated first so the user does not wait for the API.
   */

  const updateMutation = useMutation({
    mutationKey: ["updateItem"],
    mutationFn: updateItem,

    /**
     * Runs before the API call.
     * Stops any running refresh and puts the new item in the cache at once.
     */

    onMutate: async (updatedItem: Item) => {
      await queryClient.cancelQueries({ queryKey: ["items"] });

      queryClient.setQueryData<Item[]>(["items"], (oldItems) => {
        if (!oldItems) return [];

        return oldItems.map((item) => {
          if (item.id === updatedItem.id) {
            return updatedItem;
          }
          return item;
        });
      });
    },

    /**
     * Runs after the API call finishes.
     * Refreshes the list only after the last update.
     * So fast clicks on + and - do not make the number flicker.
     */

    onSettled: () => {
      if (queryClient.isMutating({ mutationKey: ["updateItem"] }) === 1) {
        queryClient.invalidateQueries({ queryKey: ["items"] });
      }
    },
  });

  /**
   * Increases or decreases the quantity of a product by the given amount.
   * Quantity never goes below 0.
   * Called by the + and - buttons on a product card.
   *
   * @param item The product to change
   * @param amount 1 to increase or -1 to decrease
   */

  const changeQuantity = (item: Item, amount: number) => {
    const newQuantity = Math.max(0, item.quantity + amount);
    updateMutation.mutate({ ...item, quantity: newQuantity });
  };

  return {
    /** Products after search and category filter */
    items: filteredItems,

    /** Counts for total and in stock and low stock and sold out */
    stats,

    /** True while products are loading from the API */
    isLoading,

    /** True if loading products failed */
    isError,

    /** Text typed in the search box */
    searchTerm,

    /** Updates the search text */
    setSearchTerm,

    /** Selected category or All */
    activeCategory,

    /** Changes the selected category */
    setActiveCategory,

    /** Deletes a product by id and refreshes the list */
    deleteItem: (id: string) => deleteMutation.mutate(id),

    /** Adds a new product and refreshes the list */
    addItem: (newItem: NewItem) => addMutation.mutate(newItem),

    /** Saves changes to an existing product */
    updateItem: (item: Item) => updateMutation.mutate(item),

    /** Adds or removes quantity and updates the screen at once */
    changeQuantity,
  };
};
