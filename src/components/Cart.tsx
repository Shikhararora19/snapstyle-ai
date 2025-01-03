import React, { useEffect, useState } from "react";
import { getCartItems, removeFromCart } from "../firebase/cartService"; // Add `removeFromCart`
import CartItem from "../components/CartItem";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase-config";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "../stripeService";
import CheckoutForm from "../components/CheckoutForm";

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [user] = useAuthState(auth);
  const [showCheckout, setShowCheckout] = useState(false);

  const fetchCartItems = async () => {
    if (user) {
      const items = await getCartItems(user.uid);
      setCartItems(items);

      // Calculate the total price of items in the cart
      const total = items.reduce((sum: number, product: any) => {
        const price = parseFloat(product.price.replace("$", ""));
        return (sum + price * product.quantity);
      }, 0);
      setTotalPrice(total);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, [user]);

  const handleRemove = async (itemName: string) => {
    if (user) {
      await removeFromCart(user.uid, itemName); // Call the service to remove the item
      fetchCartItems(); // Refresh the cart items
    }
  };

  if (!user) {
    return <p>Please log in to view your cart.</p>;
  }

  return (
    <div className="p-6 bg-gradient-to-r from-green-100 via-blue-100 to-purple-100">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map((item, index) => (
              <CartItem
                key={index}
                item={item}
                onRemove={() => handleRemove(item.name)} // Pass the remove handler
              />
            ))}
          </div>

          <div className="mt-6 border-t pt-4">
            <h2 className="text-xl font-bold">
              Total Price: <span className="text-green-600">${totalPrice.toFixed(2)}</span>
            </h2>
          </div>

          <button
            onClick={() => setShowCheckout(true)}
            className="bg-blue-500 text-white px-4 py-2 mt-4 rounded hover:bg-blue-600"
          >
            Checkout
          </button>

          {showCheckout && (
            <Elements stripe={stripePromise}>
              <CheckoutForm totalAmount={parseFloat(totalPrice.toFixed(2))} />
            </Elements>
          )}
        </>
      )}
    </div>
  );
};

export default Cart;
