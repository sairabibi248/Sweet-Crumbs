import { useState } from "react";
import { useInventory } from "../hooks/useInventory";
import ProductCard from "../components/inventory/ProductCard";
import SearchBar from "../components/inventory/SearchBar";
import ItemForm from "../components/inventory/ItemForm";
import ConfirmDialog from "../components/ui/ConfirmDialog";
import type { Item } from "../types/item";
import type { ItemFormFields } from "../schemas/itemSchema";

/**
 * Inventory page that shows all products as cards.
 * Gets products and all functions from useInventory.
 * Lets the user search and filter and add and edit and delete products.
 */

const Inventory = () => {
  const {
    items,
    isLoading,
    isError,
    searchTerm,
    setSearchTerm,
    activeCategory,
    setActiveCategory,
    deleteItem,
    changeQuantity,
    addItem,
    updateItem,
  } = useInventory();

  const [isAdding, setIsAdding] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [deletingItem, setDeletingItem] = useState<Item | null>(null);

  if (isLoading) return <p>Loading....</p>;
  if (isError) return <p>Something went wrong</p>;

    /**
   * Saves a new product and closes the Add Item form.
   * Called when the user submits the Add Item form.
   *
   * @param data Product details from the form
   */


  const handleAdd = (data: ItemFormFields) => {
    addItem(data);
    setIsAdding(false);
  };

   /**
   * Saves the edited product and closes the Edit form.
   * Keeps the same id and replaces the other details.
   *
   * @param data New product details from the form
   */

  const handleEdit = (data: ItemFormFields) => {
    if (!editingItem) return;
    updateItem({ ...data, id: editingItem.id });
    setEditingItem(null);
  };

   /**
   * Deletes the selected product and closes the dialog.
   * Called when the user clicks Delete in the confirm dialog.
   */
  
  const handleDelete = () => {
    if (!deletingItem) return;
    deleteItem(deletingItem.id);
    setDeletingItem(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <p className="text-lg font-semibold text-[#111827] dark:text-[#F4F4F5]">
          {items.length} items
        </p>
        <button
          onClick={() => setIsAdding(true)}
          className="px-4 py-2 rounded-lg bg-[#C2416C] text-white text-sm font-medium cursor-pointer hover:bg-[#A8345B]"
        >
          + Add Item
        </button>
      </div>

      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      <div className="grid grid-cols-4 gap-6">
        {items.map((item) => (
          <ProductCard
            key={item.id}
            item={item}
            onDelete={() => setDeletingItem(item)}
            onIncrease={() => changeQuantity(item, 1)}
            onDecrease={() => changeQuantity(item, -1)}
            onEdit={() => setEditingItem(item)}
          />
        ))}
      </div>

      {isAdding && (
        <ItemForm
          title="Add new item"
          submitLabel="Add item"
          onSave={handleAdd}
          onClose={() => setIsAdding(false)}
        />
      )}

      {editingItem && (
        <ItemForm
          title="Edit item"
          submitLabel="Save changes"
          defaultValues={{
            title: editingItem.title,
            category: editingItem.category as ItemFormFields["category"],
            price: editingItem.price,
            quantity: editingItem.quantity,
            image: editingItem.image,
          }}
          onSave={handleEdit}
          onClose={() => setEditingItem(null)}
        />
      )}

      {deletingItem && (
        <ConfirmDialog
          title="Delete item?"
          message={`"${deletingItem.title}" will be removed permanently.`}
          onConfirm={handleDelete}
          onCancel={() => setDeletingItem(null)}
        />
      )}
    </div>
  );
};

export default Inventory;