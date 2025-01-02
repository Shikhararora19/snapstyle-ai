import { Handler } from "@netlify/functions";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-12-18.acacia",
});

export const handler: Handler = async (event) => {
  try {
    const { amount, currency } = JSON.parse(event.body || "{}");

    if (!amount || !currency) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing required fields." }),
      };
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
    };
  } catch (error) {
    console.error("Error creating payment intent:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to create payment intent." }),
    };
  }
};
