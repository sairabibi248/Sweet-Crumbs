/**
 * Comes from MockAPI and is used across the Inventory and Overview pages.
 */

export type Item = {
  /** Unique id given by MockAPI */
  id: string;
  /** Product name */
  title: string;
  /** One of Cakes/Donuts/Macarons/Cupcakes/Cookies */
  category: string;
  /** Price in rupees */
  price: number;
  /** Units in stock. 0 means sold out */
  quantity: number;
  /** Path of the product image from the public images folder */
  image: string;
};
