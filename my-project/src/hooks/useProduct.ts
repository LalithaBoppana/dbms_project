import React, { useEffect,useState } from 'react'
import axios from "axios"
const useProduct = () => {
    const [products, setProducts] = useState([{}])
    useEffect(() => {
        axios.get('http://localhost:3001/products')
          .then((response) => setProducts(response.data))
          .catch((error) => console.error('Error fetching products:', error));
      }, [products]);
      return({
        products,
        setProducts
      })
      
}

export default useProduct