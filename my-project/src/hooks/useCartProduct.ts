import { useEffect, useState } from "react";
import axios from "axios";

// Define types for the data structures
interface CartItem {
  id: string;
  customerId: string;
  productId: string;
  quantity: number;
}

interface Product {
  id: string;
  title: string;
  description: string;
  photopath: string;
  actualprice: number;
  discountprice: number;
  quantity: number; // Dynamically added during cart item mapping
}

export const useCartProduct = () => {
  const [cartlistItems, setCartlistItems] = useState<CartItem[]>([]);
  const [cartProductItems, setCartProductItems] = useState<Product[]>([]);

  useEffect(() => {
    // Fetch cart items
    axios
      .get<CartItem[]>("http://localhost:3001/cartItems")
      .then((response) => setCartlistItems(response.data))
      .catch((error) => console.error("Error fetching cart items:", error));
  }, []);

  useEffect(() => {
    if (cartlistItems.length > 0) {
      const fetchProductDetails = async () => {
        try {
          const productPromises = cartlistItems.map((item) =>
            axios.get<Product>(`http://localhost:3001/products/${item.productId}`)
          );

          const productResponses = await Promise.all(productPromises);
          const products = productResponses.map((response, index) => ({
            ...response.data,
            quantity: cartlistItems[index]?.quantity || 1, // Map quantity from cart items
          }));

          setCartProductItems(products);
        } catch (error) {
          console.error("Error fetching product details:", error);
        }
      };

      fetchProductDetails();
    }
  }, [cartlistItems]);

  return {
    cartlistItems,
    setCartlistItems,
    cartProductItems,
    setCartProductItems,
  };
};
