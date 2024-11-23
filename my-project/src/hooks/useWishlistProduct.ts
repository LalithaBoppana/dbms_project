import { useEffect, useState } from "react";
import axios from "axios";

export const useWishlistProduct = () => {
  const [wishlistItems, setWishlistItems] = useState<any[]>([]);
  const [wishlistProductItems, setWishlistProductItems] = useState<any[]>([]);

  useEffect(() => {
    // Fetch wishlist items
    axios
      .get("http://localhost:3001/wishlistItems")
      .then((response) => setWishlistItems(response.data))
      .catch((error) => console.error("Error fetching wishlist items:", error));
  }, []);

  useEffect(() => {
    if (wishlistItems.length > 0) {
      // Fetch product details for each wishlist item
      const fetchProductDetails = async () => {
        try {
          const productPromises = wishlistItems.map((item) =>
            axios.get(`http://localhost:3001/products/${item.productId}`)
          );

          // Wait for all product details to be fetched
          const productResponses = await Promise.all(productPromises);
          const products = productResponses.map((response) => response.data);

          // Set the fetched products data
          setWishlistProductItems(products);
        } catch (error) {
          console.error("Error fetching product details:", error);
        }
      };

      fetchProductDetails();
    }
  }, [wishlistItems]); // Only trigger when wishlistItems changes

  return {
    wishlistItems,
    setWishlistItems,
    wishlistProductItems,
    setWishlistProductItems,
  };
};
