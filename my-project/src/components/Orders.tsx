import React from "react";
import OrderCard from "./OrderCard";
import useOrders from "../hooks/useOrders";
import Header from "./Header";

const Orders = () => {
  const { orders } = useOrders();

  return (
    <div>
              <Header myaccount={true} signin={false} signup={false}/>

      <h1>Orders</h1>
      {orders.map((order) => (
        <OrderCard
          key={order.orderId}
          orderId={order.orderId}
          orderDate={order.orderDate}
          orderStatus={order.orderStatus}
          totalAmount={order.totalAmount}
        />
      ))}
    </div>
  );
};

export default Orders;
