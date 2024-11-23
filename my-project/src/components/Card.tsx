import React, { useState } from 'react';
import wishlistIcon from "../assets/wishlist.png";
import heartIcon from "../assets/heartwhite.png";
import laptopImage from "../assets/lap.png";
import { useWishlistItem } from "../hooks/useWishlistItem"
import axios from 'axios';
import { useCartItem } from '../hooks/useCartItem';
import { useCartProduct } from '../hooks/useCartProduct';
interface CardProps {
  title: string;
  description: string;
  productId: number;
  customerId: number; // Customer ID should be passed as a prop
  cartStatus: boolean; // If the product is in the cart
  actualPrice: number;
  discountPrice: number;
  wishlist?: boolean; // Whether the product is in the wishlist
}

const Card = ({
  title,
  description,
  productId,
  customerId,
  cartStatus,
  actualPrice,
  discountPrice,
  wishlist = false,
}: CardProps) => {
  const [isInCart, setIsInCart] = useState(cartStatus);
  const [isInWishlist, setIsInWishlist] = useState(wishlist);
  const {wishlistItems}=useWishlistItem();
  const {cartlistItems}=useCartItem();
  const {cartProductItems}=useCartProduct();

  const updateRemoveWishList = async (productId, customerId) => {
    try {
      // Send the PATCH request
      await axios.patch(`http://localhost:3001/products/${productId}`, { wishlist: false });
  
      // Find the wishlist item
      const wishlistItem = wishlistItems.find(
        (item) => item.productId === productId && item.customerId === customerId
      );
  
      if (wishlistItem) {
        // Delete the wishlist item
        await axios.delete(`http://localhost:3001/wishlistItems/${wishlistItem.id}`);
      }
    } catch (error) {
      console.error('Error updating wishlist:', error);
      // Handle error, e.g., display error message to user
    }
  };
  const removeFromCart=async(productId,customerId)=>{
    await axios.patch(`http://localhost:3001/products/${productId}`, { cartStatus: false});
    const cartlistItem = cartlistItems.find(
      (item) => String(item.productId) === String(productId) && item.customerId === customerId
    );
    
    
    if(cartlistItem){
      await axios.delete(`http://localhost:3001/cartItems/${cartlistItem.id}`);

    }


  }
  const updateAddWishList=async(productId,customerId)=>{
    await axios.patch(`http://localhost:3001/products/${productId}`, { wishlist: true });
    fetch('http://localhost:3001/wishlistItems', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            productId, // Use the productId passed to the function
            customerId, // Use the customerId passed to the function
        }),
    })
        .then((response) => response.json())
        .then((data) => console.log('Added to wishlist:', data))
        .catch((error) => console.error('Error:', error));
    

  }
  const addToCart=async (productId,customerId)=>{
    await axios.patch(`http://localhost:3001/products/${productId}`, { cartStatus: true });
    const response = await fetch('http://localhost:3001/cartItems', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          productId, // ID of the product
          customerId, // ID of the customer
          quantity:1 // Quantity of the item in the cart (default: 1)
      }) 
    });
  }

  const handleCartToggle = () => {
    const newCartStatus = !isInCart;
    setIsInCart(newCartStatus);
    if(!isInCart){
      addToCart(productId,customerId)
      //Addto cart
    }
    else{
      //Remove from cart 
      removeFromCart(productId,customerId)
    }
  
  };

  const handleWishlistToggle = () => {
    console.log(cartProductItems)
    const newWishlistStatus = !isInWishlist;
    setIsInWishlist(newWishlistStatus);
    if (!isInWishlist) { // Add to wishlist
        updateAddWishList(productId, customerId);
        console.log("Adding to wishlist");
    } else { // Remove from wishlist
        updateRemoveWishList(productId, customerId);
        console.log("Removing from wishlist");
    }
};


  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <img className="h-52 w-52 object-cover" src={laptopImage} alt="Product image" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">{description}</p>
      </div>
      <div className="px-5 text-black">
        <div>Actual Price: ${actualPrice}</div>
        <div>Discount Price: ${discountPrice}</div>
      </div>
      <div className="flex justify-between px-5 py-4">
        <button
          className={`bg-blue-600 text-white rounded-3xl px-5 py-2 `}
          onClick={handleCartToggle}
        >
          {isInCart ? "Remove from Cart" : "Add to Cart"}
        </button>
        <button
          className="flex items-center justify-center"
          onClick={handleWishlistToggle}
        >
                <img src={isInWishlist ? wishlistIcon : heartIcon} alt="Wishlist Icon" className="h-6 w-6" />

        </button>
      </div>
    </div>
  );
};

export default Card;
