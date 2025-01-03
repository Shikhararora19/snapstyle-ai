import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../firebase/cartService"; // Import the clearCart function
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase-config";

interface CheckoutFormProps {
  totalAmount: number;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ totalAmount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    try {
      const response = await fetch("/.netlify/functions/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: totalAmount * 100, currency: "usd" }), // Amount in cents
      });

      const { clientSecret } = await response.json();

      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement!,
        },
      });

      if (paymentResult.error) {
        console.error("Payment failed:", paymentResult.error.message);
        alert("Payment failed!");
        navigate("/payment-failure"); // Navigate to the failure page
      } else {
        alert("Payment succeeded!");

        // Clear the cart in the database
        if (user) {
          await clearCart(user.uid); // Clear the user's cart
        }

        navigate("/payment-success"); // Navigate to the success page
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      navigate("/payment-failure"); // Navigate to the failure page on error
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded">
      <CardElement className="border p-2 rounded" />
      <button
        type="submit"
        disabled={!stripe}
        className="bg-blue-500 text-white px-4 py-2 mt-4 rounded hover:bg-blue-600"
      >
        Pay ${totalAmount}
      </button>
    </form>
  );
};

export default CheckoutForm;
