import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase-config";
import { getCartItems } from "../firebase/cartService";
import CartItem from "./CartItem";

const Cart: React.FC = () => {
  const [user] = useAuthState(auth);
  const [cartItems, setCartItems] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      const fetchCart = async () => {
        const items = await getCartItems(user.uid);
        setCartItems(items);
      };
      fetchCart();
    }
  }, [user]);

  const handleRemove = (index: number) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
    // Add logic to update Firestore if needed
  };

  if (!user) return <p>Please log in to view your cart.</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      <div className="space-y-4">
        {cartItems.map((item, index) => (
          <CartItem
            key={index}
            item={item}
            onRemove={() => handleRemove(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Cart;
