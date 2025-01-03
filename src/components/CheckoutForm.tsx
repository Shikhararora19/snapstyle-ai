import React, { useState } from "react";
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
  const [isProcessing, setIsProcessing] = useState(false);
  const [buttonText, setButtonText] = useState("Pay Now");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    setIsProcessing(true);
    setButtonText("Processing...");

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
        setButtonText("Payment Failed");
        setTimeout(() => setButtonText("Pay Now"), 2000); // Reset button text after 2 seconds
        navigate("/payment-failure"); // Navigate to the failure page
      } else {
        setButtonText("Payment Succeeded!");
        // Clear the cart in the database
        if (user) {
          await clearCart(user.uid); // Clear the user's cart
        }

        navigate("/payment-success"); // Navigate to the success page
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      setButtonText("Payment Failed");
      setTimeout(() => setButtonText("Pay Now"), 2000); // Reset button text after 2 seconds
      navigate("/payment-failure"); // Navigate to the failure page on error
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded bg-gradient-to-r from-green-100 via-blue-100 to-purple-100">
      <CardElement className="border p-2 rounded bg-gradient-to-r from-green-100 via-blue-100 to-purple-100" />
      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className={`text-white px-4 py-2 mt-4 rounded transition duration-300 ${
          isProcessing ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {buttonText}
      </button>
    </form>
  );
};

export default CheckoutForm;
