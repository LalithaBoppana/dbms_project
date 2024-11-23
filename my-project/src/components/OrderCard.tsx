import React from "react";
import { useNavigate } from "react-router-dom";

interface OrderCardProps {
  orderStatus: string;
  totalAmount: number;
  orderDate: string;
  orderId: number;
}

const OrderCard: React.FC<OrderCardProps> = ({
  orderStatus,
  totalAmount,
  orderDate,
  orderId,
}) => {
  const navigate = useNavigate();

  // Handle navigation on card click
  const handleCardClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault(); // Prevent default anchor behavior
    navigate(`/${orderId}`);
  };

  return (
    <div className="p-4">
      <a
        href={`/${orderId}`} // Keeps semantic meaning for SEO while preventing default behavior
        onClick={handleCardClick}
        className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow transition hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <p className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
          {orderDate} - {orderStatus}
        </p>
        <p className="text-lg font-normal text-gray-700 dark:text-gray-400">
          ${totalAmount.toFixed(2)} {/* Ensures consistent currency formatting */}
        </p>
      </a>
    </div>
  );
};

export default OrderCard;
