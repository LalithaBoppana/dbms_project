import React, { useEffect,useState } from 'react'
import axios from "axios"
export const useCartItem = () => {
    const [cartlistItems, setcartlistItems] = useState([{}])
    useEffect(() => {
        axios.get('http://localhost:3001/wishlistItems')
          .then((response) => setcartlistItems(response.data))
          .catch((error) => console.error('Error fetching products:', error));
      }, [cartlistItems]);
      return({
       cartlistItems,
       setcartlistItems,
      })
      
}

