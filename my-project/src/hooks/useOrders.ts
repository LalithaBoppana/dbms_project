import { useEffect, useState } from "react";
import axios from "axios";

interface Order {
  orderId: number;
  customerId: number;
  totalAmount: number;
  orderDate: string;
  orderStatus: string;
}

const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/orders")
      .then((response) => setOrders(response.data))
      .catch((error) => console.error("Error fetching orders:", error));
  }, []);

  return { orders };
};

export default useOrders;
