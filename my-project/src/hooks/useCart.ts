interface CartItem {
    cartId: number;
    customerId: number;
    productId: number;
    quantity: number;
  }
  
  interface Product {
    productId: number;
    title: string;
    description: string;
    cardStatus: boolean;
    wishlist: boolean;
    actualprice: number;
    discountprice: number;
  }
  
  interface CartProduct extends Product {
    quantity: number;
    subtotal: number;
  }
  
  export const useCart = (
    cartItems: CartItem[],
    products: Product[]
  ) => {
    const updateCartQuantity = (
      productId: number,
      increment: boolean = true
    ): CartItem[] => {
      return cartItems.map((item) =>
        item.productId === productId
          ? {
              ...item,
              quantity: increment ? item.quantity + 1 : Math.max(1, item.quantity - 1),
            }
          : item
      );
    };
  
    const cartProducts: CartProduct[] = cartItems
      .map((cartItem) => {
        const product = products.find((p) => p.productId === cartItem.productId);
        return product
          ? {
              ...product,
              quantity: cartItem.quantity,
              subtotal: cartItem.quantity * product.discountprice,
            }
          : null;
      })
      .filter(Boolean) as CartProduct[];
  
    const total = cartProducts.reduce((sum, item) => sum + item.subtotal, 0);
  
    return { cartProducts, total, updateCartQuantity };
  };
  