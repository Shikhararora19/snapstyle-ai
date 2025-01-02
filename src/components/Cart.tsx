import React, { useEffect, useState } from "react";
import { getCart, removeFromCart } from "../firebase/cartService";
import { auth } from "../firebase/firebase-config";
import CartItem from "./CartItem";

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const user = auth.currentUser;

  useEffect(() => {
    const fetchCart = async () => {
      if (user) {
        const items = await getCart(user.uid);
        setCartItems(items);
      }
    };

    fetchCart();
  }, [user]);

  const handleRemove = async (item: any) => {
    if (user) {
      await removeFromCart(user.uid, item);
      setCartItems(cartItems.filter((cartItem) => cartItem.name !== item.name));
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      <div className="grid grid-cols-1 gap-4">
        {cartItems.map((item, index) => (
          <CartItem key={index} item={item} onRemove={() => handleRemove(item)} />
        ))}
      </div>
    </div>
  );
};

export default Cart;
