import React from "react";
import { useCartProduct } from "../hooks/useCartProduct";
import axios from "axios";
import Header from "./Header";
// Define props for Product
interface Product {
  id: string;
  productId: string; // Add the missing productId
  title: string;
  description: string;
  photopath: string;
  actualprice: number;
  discountprice: number;
  quantity: number; // Dynamically added during cart item mapping
}
const Cart: React.FC = () => {
  const { cartProductItems, setCartProductItems } = useCartProduct();

  // Increment product quantity
  const incrementQuantity = (productId: string) => {
    setCartProductItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Decrement product quantity
  const decrementQuantity = (productId: string) => {
    setCartProductItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleUpdateCart = () => {
    // Iterate over each cart item and update it individually
    cartProductItems.forEach((product) => {
      axios
        .put(`http://localhost:3001/cartItems/${product.id}`, {
          customerId: "1", // Assuming customerId is static (you can update it dynamically)
          productId: product.id,
          quantity: product.quantity,
        })
        .then((response) => {
          console.log('Cart item updated successfully:', response.data);
        })
        .catch((error) => {
          console.error('Error updating cart item:', error);
        });
    });
  };
  

  return (
    <>
            <Header myaccount={true} signin={false} signup={false}/>

    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>

      {cartProductItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty. Start adding items!</p>
      ) : (
        <ul className="space-y-6">
          {cartProductItems.map((product: any) => (
            <li
              key={product.id}
              className="p-4 border rounded-lg shadow-md flex flex-col md:flex-row justify-between items-center"
            >
              {/* Product Details */}
              <div>
                <h3 className="text-lg font-bold">{product.title}</h3>
                <p className="text-gray-600">{product.description}</p>
                <p className="mt-2">
                  <span className="text-gray-700 font-medium">Price:</span> $
                  {product.discountprice}
                  <span className="text-sm text-gray-500 line-through ml-2">
                    ${product.actualprice}
                  </span>
                </p>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center space-x-4 mt-4 md:mt-0">
                <button
                  className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm"
                  onClick={() => decrementQuantity(product.i)}
                >
                  -
                </button>
                <span className="px-3 py-2 bg-gray-100 rounded text-sm">
                  {product.quantity}
                </span>
                <button
                  className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm"
                  onClick={() => incrementQuantity(product.id)}
                >
                  +
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Update Cart Button */}
      {cartProductItems.length > 0 && (
        <div className="mt-6 flex   justify-between">
          <button
            onClick={handleUpdateCart}
            className="px-6 py-3 bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition-all"
          >
            Update Cart
          </button>
          <button className="px-6 py-3 bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition-all">Payment</button>
        </div>
      )}
    </div>
    </>
  );
};

export default Cart;
