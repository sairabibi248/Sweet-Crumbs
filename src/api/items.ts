import type { Item } from "../types/item";

/** MockAPI base URL from the .env file */
const apiUrl = import.meta.env.VITE_API_URL;

/**
 * A product without an id.
 * Used when adding a new product because MockAPI creates the id.
 */

export type NewItem = Omit<Item, "id">;

/**
 * Gets all products from MockAPI.
 * Method GET.
 * Used by useQuery in useInventory.
 *
 * @returns The list of all products
 */

export const getItems = async (): Promise<Item[]> => {
  const response = await fetch(`${apiUrl}/items`);

  if (!response.ok) {
    throw new Error("Failed to load items");
  }

  return response.json();
};

/**
 * Deletes one product from MockAPI.
 * Method DELETE.
 *
 * @param id Id of the product to delete
 */

export const deleteItem = async (id: string): Promise<void> => {
  const response = await fetch(`${apiUrl}/items/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete item");
  }
};

/**
 * Replaces one product in MockAPI with new details.
 * Method PUT.
 * Used for the Edit form and the + and - quantity buttons.
 *
 * @param item The product with its id and new details
 * @returns The updated product from MockAPI
 */

export const updateItem = async (item: Item): Promise<Item> => {
  const response = await fetch(`${apiUrl}/items/${item.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });

  if (!response.ok) {
    throw new Error("Failed to update item");
  }

  return response.json();
};

/**
 * Adds a new product to MockAPI.
 * Method POST.
 *
 * @param newItem Product details without an id
 * @returns The new product with the id given by MockAPI
 */

export const createItem = async (newItem: NewItem): Promise<Item> => {
  const response = await fetch(`${apiUrl}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newItem),
  });

  if (!response.ok) {
    throw new Error("Failed to add item");
  }

  return response.json();
};