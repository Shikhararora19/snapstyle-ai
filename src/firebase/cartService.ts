import { doc, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "./firebase-config";

// Add item to cart
export const addToCart = async (userId: string, item: any) => {
  const cartRef = doc(db, "Cart", userId);
  const cartSnap = await getDoc(cartRef);

  if (cartSnap.exists()) {
    // Check if item already exists in the cart
    const existingItems = cartSnap.data().items || [];
    const itemExists = existingItems.some((cartItem: any) => cartItem.name === item.name);

    if (itemExists) {
      console.warn("Item already in the cart. Consider updating the quantity instead.");
      return;
    }

    await updateDoc(cartRef, {
      items: arrayUnion({ ...item, quantity: 1 }),
    });
  } else {
    await setDoc(cartRef, {
      items: [{ ...item, quantity: 1 }],
    });
  }
};

// Get all cart items
export const getCartItems = async (userId: string) => {
  const cartRef = doc(db, "Cart", userId);
  const cartSnap = await getDoc(cartRef);

  if (cartSnap.exists()) {
    return cartSnap.data().items || [];
  }
  return [];
};

// Remove item from cart
export const removeFromCart = async (userId: string, itemName: string) => {
  const cartRef = doc(db, "Cart", userId);
  const cartSnap = await getDoc(cartRef);

  if (cartSnap.exists()) {
    const existingItems = cartSnap.data().items || [];
    const updatedItems = existingItems.filter((item: any) => item.name !== itemName);

    await updateDoc(cartRef, { items: updatedItems });
  }
};
