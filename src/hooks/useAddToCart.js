import { useState } from "react";
import { useCart } from "react-use-cart";

import { notifyError, notifySuccess } from "@utils/toast";

const useAddToCart = () => {
  const [item, setItem] = useState(1);
  const { addItem, items, updateItemQuantity } = useCart();
  

  const handleAddItem = (product) => {
    const result = items.find((i) => i.id === product.id);   
    const { variants, categories, description, ...updatedProduct } = product;
    if (result !== undefined) {
      if (  (product.stock === null || product.stock > 0)  ) {
        addItem(updatedProduct, item);
        notifySuccess(`${item} ${product.title} added to cart!`);
      } else {
        notifyError("Insufficient stock!");
      }
    } 
  };
  
  const handleIncreaseQuantity = (product) => {
    const result = items?.find((p) => p.id === product.id);
   
    if (result) {
      // Check if product.stock is null and the increased quantity is greater than 0
      if ((product.stock === null || product.stock > 0) && result.quantity + item > 0) {
        // Check if the increased quantity is less than or equal to the stock
        if (product.stock === null || result.quantity + item <= product.stock) {
          updateItemQuantity(product.id, result.quantity + 1);
          notifySuccess(`item add to cart`); 
        } else {
          notifyError("Insufficient stock!");
        }
      };
    }
  };

  
  return {
    item,
    handleAddItem,
    handleIncreaseQuantity,
    setItem,
  };
};

export default useAddToCart;
