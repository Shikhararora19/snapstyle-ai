import React from "react";

interface CartItemProps {
  item: {
    name: string;
    price: string;
    description: string;
    image: string;
    quantity: number;
  };
  onRemove: () => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onRemove }) => {
  return (
    <div className="p-4 border rounded shadow flex items-center">
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
        <p className="text-gray-600">Quantity: {item.quantity}</p>
        <button
          onClick={onRemove}
          className="bg-red-500 text-white px-4 py-2 mt-2 rounded hover:bg-red-600"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
