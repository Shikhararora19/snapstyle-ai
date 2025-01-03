import {
    collection,
    doc,
    setDoc,
    getDoc,
    updateDoc,
    arrayUnion,
    arrayRemove,
  } from "firebase/firestore";
  import { db } from "./firebase-config"; // Ensure you use the correct db import
  
  // Add an item to the wishlist
  export const addToWishlist = async (userId: string, item: any) => {
    try {
      const userWishlistRef = doc(db, "Wishlist", userId);
      await setDoc(
        userWishlistRef,
        {
          items: arrayUnion(item),
        },
        { merge: true }
      );
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  };
  
  // Remove an item from the wishlist
  export const removeFromWishlist = async (userId: string, itemId: string) => {
    try {
      const userWishlistRef = doc(db, "Wishlist", userId);
      const userWishlistSnap = await getDoc(userWishlistRef);
  
      if (userWishlistSnap.exists()) {
        const wishlist = userWishlistSnap.data()?.items || [];
        const updatedItems = wishlist.filter((item: any) => item.id !== itemId);
  
        await setDoc(userWishlistRef, { items: updatedItems });
      }
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  };
  
  // Fetch all wishlist items for a user
  export const getWishlistItems = async (userId: string) => {
    try {
      const wishlistDoc = await getDoc(doc(db, "Wishlist", userId));
      return wishlistDoc.exists() ? wishlistDoc.data()?.items || [] : [];
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      return [];
    }
  };
  