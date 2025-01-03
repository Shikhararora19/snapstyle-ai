import React from "react";

const PaymentSuccess = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-100 via-blue-100 to-purple-100">
      <div className="animate-bounce rounded-full bg-green-500 p-5 shadow-lg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2.5"
          stroke="white"
          className="w-16 h-16"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      <h1 className="mt-6 text-3xl font-bold text-green-600 animate-fade-in">
        Payment Successful!
      </h1>
      <p className="mt-2 text-lg text-gray-700">
        Thank you for your purchase. Your order has been confirmed.
      </p>
      <p className="mt-4 text-sm text-gray-500">
        A receipt has been sent to your email.
      </p>
      <button
        onClick={() => window.location.href = "/home"}
        className="mt-6 bg-blue-500 text-white py-3 px-6 rounded-lg shadow hover:bg-blue-600 transition duration-300"
      >
        Back to Home
      </button>
    </div>
  );
};

export default PaymentSuccess;
