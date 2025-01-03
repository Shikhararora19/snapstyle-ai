import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase-config";
import { getWishlistItems, removeFromWishlist } from "../firebase/wishlistService";
import { addToCart } from "../firebase/cartService"; // Import addToCart function
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Wishlist: React.FC = () => {
  const [user] = useAuthState(auth);
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchWishlistItems = async () => {
    if (user) {
      try {
        const items = await getWishlistItems(user.uid);
        setWishlist(items);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchWishlistItems();
  }, [user]);

  const handleRemove = async (itemId: string) => {
    if (user) {
      try {
        await removeFromWishlist(user.uid, itemId);
        setWishlist((prev) => prev.filter((item) => item.id !== itemId));
        toast.success("Item removed from wishlist!", {
          position: "top-right",
          autoClose: 2000,
        });
      } catch (error) {
        console.error("Error removing item from wishlist:", error);
        toast.error("Failed to remove item from wishlist.");
      }
    }
  };

  const handleAddToCart = async (item: any) => {
    if (user) {
      try {
        await addToCart(user.uid, { ...item, quantity: 1 });
        toast.success("Item added to cart!", {
          position: "top-right",
          autoClose: 2000,
        });
      } catch (error) {
        console.error("Error adding item to cart:", error);
        toast.error("Failed to add item to cart.");
      }
    } else {
      toast.error("You need to log in to add items to cart.");
    }
  };

  if (!user) {
    return <p>Please log in to view your wishlist.</p>;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div className="loader mb-4"></div>
          <p className="text-lg text-gray-600">Loading your wishlist...</p>
        </div>
      </div>
    );
  }

  if (wishlist.length === 0) {
    return (
      <div className="text-center p-6">
        <p className="text-lg text-gray-600">Your wishlist is empty.</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gradient-to-r from-green-100 via-blue-100 to-purple-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Wishlist</h1>
      <div className="space-y-4">
        {wishlist.map((item, index) => (
          <div
            key={index}
            className="p-4 border rounded shadow flex items-center justify-between"
          >
            <div className="flex items-center">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover mr-4 rounded"
                />
              ) : (
                <div className="w-20 h-20 bg-gray-200 mr-4 flex items-center justify-center rounded">
                  <span className="text-gray-500 text-sm">No Image</span>
                </div>
              )}
              <div>
                <h3 className="text-xl font-semibold">{item.name}</h3>
                <p className="text-gray-600">{item.description}</p>
                <p className="text-gray-800 font-bold">Price: {item.price}</p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => handleAddToCart(item)}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Add to Cart
              </button>
            </div>
            
          </div>
          
        ))}
        <button onClick={() => navigate("/cart")}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-red-600">
              View Cart
            </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Wishlist;
