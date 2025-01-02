import { db } from "./firebase-config";
import { doc, setDoc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

export const addToCart = async (userId: string, item: any) => {
  const cartRef = doc(db, "carts", userId);

  try {
    // Add item to cart (using arrayUnion to avoid duplicates)
    await updateDoc(cartRef, { items: arrayUnion(item) });
  } catch (error) {
    if ((error as any).code === "not-found") {
      // If the cart doesn't exist, create it
      await setDoc(cartRef, { items: [item] });
    } else {
      console.error("Error adding to cart:", error);
      throw error;
    }
  }
};

export const removeFromCart = async (userId: string, item: any) => {
  const cartRef = doc(db, "carts", userId);

  try {
    // Remove item from cart
    await updateDoc(cartRef, { items: arrayRemove(item) });
  } catch (error) {
    console.error("Error removing from cart:", error);
    throw error;
  }
};

export const getCart = async (userId: string) => {
  const cartRef = doc(db, "carts", userId);

  try {
    const cartSnapshot = await getDoc(cartRef);
    return cartSnapshot.exists() ? cartSnapshot.data().items : [];
  } catch (error) {
    console.error("Error fetching cart:", error);
    throw error;
  }
};
