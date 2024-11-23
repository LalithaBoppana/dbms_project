import React from 'react';
import Card from './Card';
import Header from './Header';
import useProduct from '../hooks/useProduct';

// Define the types for the product structure
interface Product {
  id: number;
  wishlist: boolean;
  actualprice: number;
  discountprice: number;
  description: string;
  photopath: string;
  title: string;
  cartStatus: boolean;
  customerId: number;
}

const Products: React.FC = () => {
  // Use the hook and destructure the products
  const { products } = useProduct();

  return (
    <>
      <Header myaccount={true} signin={false} signup={false} />

      <div className='grid grid-cols-3 px-20 py-10'>
        {products.map((product:any) => {
          return (
            <Card
              key={product.id}
              wishlist={product.wishlist}
              actualPrice={product.actualprice}
              discountPrice={product.discountprice}
              description={product.description}
              title={product.title}
              productId={product.id}
              cartStatus={product.cartStatus}
              customerId={product.customerId}
            />
          );
        })}
      </div>
    </>
  );
};

export default Products;
