import React, { useEffect, useState } from "react";
import { auth } from "../firebase/firebase-config";
import { getCartItems } from "../firebase/cartService";

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const user = auth.currentUser;

  useEffect(() => {
    const fetchCart = async () => {
      if (user) {
        const items = await getCartItems(user.uid);
        setCartItems(items);
      }
    };
    fetchCart();
  }, [user]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cartItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cartItems.map((item, index) => (
            <div key={index} className="p-4 border rounded shadow">
              <img src={item.image} alt={item.name} className="h-32 w-full object-cover mb-4" />
              <h3 className="text-xl font-semibold">{item.name}</h3>
              <p className="text-gray-600">{item.description}</p>
              <p className="text-sm text-gray-500">Price: {item.price}</p>
              <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;
