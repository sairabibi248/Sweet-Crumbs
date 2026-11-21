export type OrderStatus = "Pending" | "Completed" | "Cancelled";

export type Order = {
  /** Unique id created from the current time when the order is added */
  id: string;
  /** Name of the customer who placed the order */
  customer: string;
  /** Name of the ordered product from the inventory */
  product: string;
  /** Number of units ordered */
  quantity: number;
  /** Current state of the order. New orders start as Pending */
  status: OrderStatus;
};
