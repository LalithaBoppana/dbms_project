import React from "react";
import { useParams } from "react-router-dom";
import useOrderItems from "../hooks/useOrderItems";
import Header from "./Header";

const OrderItems = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const numericOrderId = parseInt(orderId || "", 10);
  const { orderItems } = useOrderItems(numericOrderId);

  return (
    <div>
              <Header myaccount={true} signin={false} signup={false}/>

      <h1>Order Items for Order ID: {orderId}</h1>
      <ul>
        {orderItems.map((item, index) => (
          <li key={index} className="mb-4 p-4 border rounded shadow">
            <h2 className="text-xl font-bold">{item.product?.title}</h2>
            <p>Description: {item.product?.description}</p>
            <p>Actual Price: ${item.product?.actualprice}</p>
            <p>Discount Price: ${item.product?.discountprice}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Subtotal: ${item.subtotal}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderItems;
