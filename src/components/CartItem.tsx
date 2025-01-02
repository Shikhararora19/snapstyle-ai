import React from "react";

interface CartItemProps {
  item: { name: string; price_range: string; description: string };
  onRemove: () => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onRemove }) => {
  return (
    <div className="p-4 border rounded shadow">
      <h3 className="text-xl font-semibold">{item.name}</h3>
      <p className="text-gray-600">{item.description}</p>
      <p className="text-gray-800 font-bold">Price: {item.price_range}</p>
      <button
        onClick={onRemove}
        className="bg-red-500 text-white px-4 py-2 mt-2 rounded hover:bg-red-600"
      >
        Remove
      </button>
    </div>
  );
};

export default CartItem;
