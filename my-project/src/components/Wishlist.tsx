import React, { useEffect } from "react";
import { useWishlistProduct } from "../hooks/useWishlistProduct";
import axios from "axios";
import Header from "./Header";
const Wishlist: React.FC = () => {
  const { wishlistProductItems, setWishlistItems } = useWishlistProduct();

  // This effect could be used to refresh wishlist data if necessary, based on user actions or component lifecycle
  useEffect(() => {
    // Optionally, you can refresh wishlist items here if needed, e.g., after adding to cart
    // setWishlistItems(updatedWishlistItems); // For example, to fetch updated wishlist items
  }, [wishlistProductItems]);

  const handleAddToCart = async (productId: number) => {
    const customerId = 1; // Replace with the actual customerId, as needed
  
    try {
      // Step 1: Add product to the cart
      await axios.patch(`http://localhost:3001/products/${productId}`, {
        cartStatus: true,
      });
  
      const cartResponse = await axios.post('http://localhost:3001/cartItems', {
        productId,   // ID of the product
        customerId,  // Customer ID for the cart
        quantity: 1, // Default quantity
      });
  
      console.log("Product added to cart:", cartResponse.data);
  
      // Step 2: Remove the product from the wishlist
      await axios.delete(`http://localhost:3001/wishlistItems/${productId}`);
  
      console.log(`Product ${productId} removed from wishlist`);
  
      // Optionally, you can update the local state of wishlist items
      // If you're using a state hook to manage wishlist items:
      // setWishlistItems(prevItems => prevItems.filter(item => item.productId !== productId));
  
    } catch (error) {
      console.error("Error handling cart update:", error);
    }
  };
  

  if (wishlistProductItems.length === 0) {
    return <p>No items in the wishlist.</p>;
  }

  return (
    <>
        <Header myaccount={true} signin={false} signup={false}/>

    <div>
      <h2 className="text-2xl font-bold mb-4">Wishlist</h2>
      <ul>
        {wishlistProductItems.map((product) => (
          <li
            key={product.productId}
            className="p-4 border rounded shadow mb-4 flex flex-col md:flex-row justify-between items-start"
          >
            <div>
              <h3 className="text-lg font-bold">{product.title}</h3>
              <p className="text-gray-600">{product.description}</p>
              <p className="mt-2 text-sm text-gray-700">
                Price: <span className="text-xl font-semibold">${product.discountprice}</span>{" "}
                <span className="text-sm text-gray-500 line-through ml-2">
                  ${product.actualprice}
                </span>
              </p>
            </div>
            <button
              onClick={() => handleAddToCart(product.productId)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mt-4 md:mt-0"
            >
              Add to Cart
            </button>
          </li>
        ))}
      </ul>
    </div>
    </>
  );
};

export default Wishlist;
