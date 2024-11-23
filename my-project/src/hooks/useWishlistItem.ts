import React, { useEffect,useState } from 'react'
import axios from "axios"
export const useWishlistItem = () => {
    const [wishlistItems, setWishlistItems] = useState([{}])
    useEffect(() => {
        axios.get('http://localhost:3001/wishlistItems')
          .then((response) => setWishlistItems(response.data))
          .catch((error) => console.error('Error fetching products:', error));
      }, [wishlistItems]);
      return({
        wishlistItems,
        setWishlistItems,
      })
      
}

