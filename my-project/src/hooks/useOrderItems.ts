import { useEffect, useState } from "react";
import axios from "axios";

interface OrderItem {
  orderId: number;
  productId: number;
  quantity: number;
  subtotal: number;
  product?: {
    title: string;
    description: string;
    actualprice: number;
    discountprice: number;
  };
}

const useOrderItems = (orderId: number) => {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

  useEffect(() => {
    const fetchOrderItems = async () => {
      try {
        const [orderItemsResponse, productsResponse] = await Promise.all([
          axios.get("http://localhost:3001/orderItems"),
          axios.get("http://localhost:3001/products"),
        ]);

        const items = orderItemsResponse.data.filter(
          (item: OrderItem) => item.orderId === orderId
        );

        const products = productsResponse.data;

        const itemsWithDetails = items.map((item: OrderItem) => ({
          ...item,
          product: products.find(
            (product: any) => product.productId === item.productId
          ),
        }));

        setOrderItems(itemsWithDetails);
      } catch (error) {
        console.error("Error fetching order items:", error);
      }
    };

    fetchOrderItems();
  }, [orderId]);

  return { orderItems };
};

export default useOrderItems;
