import React, { useEffect, useState } from "react";
import { auth } from "../firebase/firebase-config";
import { getCartItems, removeFromCart } from "../firebase/cartService";
import CartItem from "./CartItem";

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const user = auth.currentUser;

  useEffect(() => {
    const fetchCartItems = async () => {
      if (user) {
        const items = await getCartItems(user.uid);
        setCartItems(items);
      }
    };
    fetchCartItems();
  }, [user]);

  const handleRemoveItem = async (item: any) => {
    if (user) {
      await removeFromCart(user.uid, item);
      setCartItems((prev) => prev.filter((cartItem) => cartItem !== item));
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      <div className="grid grid-cols-1 gap-4">
        {cartItems.map((item, index) => (
          <CartItem key={index} item={item} onRemove={() => handleRemoveItem(item)} />
        ))}
      </div>
    </div>
  );
};

export default Cart;
