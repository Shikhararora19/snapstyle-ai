import React, { useEffect, useState } from "react";
import { addToCart } from "../firebase/cartService";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase-config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface StyleCardProps {
  style: {
    name: string;
    description: string;
    type: string;
    price: string;
    image?: string; // Optional image property
  };
}

const StyleCard: React.FC<StyleCardProps> = ({ style }) => {
  const [image, setImage] = useState<string | null>(null);
  const [user] = useAuthState(auth);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch("/.netlify/functions/fetch-images", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ itemName: style.name }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch image.");
        }

        const data = await response.json();
        setImage(data.imageUrl);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchImage();
  }, [style.name]);

  const handleAddToCart = async () => {
    if (user) {
      const itemWithImage = {
        ...style,
        image: image || "", // Assign the fetched image URL to the item
      };

      await addToCart(user.uid, itemWithImage);
      toast.success(`${style.name} added to your cart!`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "colored",
      });
    } else {
      toast.error("Please log in to add items to your cart.", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "colored",
      });
    }
  };

  return (
    <div className="p-4 border rounded shadow-md hover:shadow-lg transition-shadow duration-300">
      {image ? (
        <img
          src={image}
          alt={style.name}
          className="w-full h-48 object-cover mb-4 rounded"
        />
      ) : (
        <div className="w-full h-48 bg-gray-200 flex items-center justify-center rounded mb-4">
          <p className="text-gray-500">Loading image...</p>
        </div>
      )}
      <h3 className="text-xl font-semibold mb-2">{style.name}</h3>
      <p className="text-gray-600 mb-2">{style.description}</p>
      <p className="text-sm text-gray-500 mb-2">Type: {style.type}</p>
      <p className="text-sm text-gray-500 mb-4">Price: {style.price}</p>
      <button
        onClick={handleAddToCart}
        className="bg-green-500 text-white px-4 py-2 mt-2 rounded hover:bg-green-600"
      >
        Add to Cart
      </button>
      <ToastContainer />
    </div>
  );
};

export default StyleCard;
