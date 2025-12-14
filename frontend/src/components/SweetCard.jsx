export default function SweetCard({
  sweet,
  role,
  purchaseQty,
  setPurchaseQty,
  restockQty,
  setRestockQty,
  onPurchase,
  onRestock,
  onDelete,
}) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow transition">
      <h3 className="font-medium text-lg">{sweet.name}</h3>
      <p className="text-sm text-gray-500">{sweet.category}</p>

      <div className="mt-2 flex justify-between items-center">
        <span className="font-semibold">₹{sweet.price}</span>
        <span className="text-sm text-gray-500">
          Stock: {sweet.quantity}
        </span>
      </div>

        {/* //to purchase the Sweets */}
        
      <div className="mt-3 flex gap-2">
        <input
          type="number"
          min="1"
          className="w-20 p-1.5 border rounded-md"
          placeholder="Qty"
          value={purchaseQty[sweet._id] || ""}
          onChange={(e) =>
            setPurchaseQty({
              ...purchaseQty,
              [sweet._id]: e.target.value,
            })
          }
        />

        <button
          disabled={
            sweet.quantity === 0 ||
            !purchaseQty[sweet._id] ||
            Number(purchaseQty[sweet._id]) > sweet.quantity
          }
          onClick={() =>
            onPurchase(sweet._id, purchaseQty[sweet._id])
          }
          className="bg-green-600 hover:bg-green-700 text-white px-3 rounded-md disabled:bg-gray-300"
        >
          Buy
        </button>
      </div>


      {role === "ADMIN" && ( //For admin only to restock
        <div className="mt-4 border-t pt-3">
          <div className="flex gap-2 mb-2">
            <input
              className="w-20 p-1.5 border rounded-md"
              placeholder="Qty"
              value={restockQty[sweet._id] || ""}
              onChange={(e) =>
                setRestockQty({
                  ...restockQty,
                  [sweet._id]: e.target.value,
                })
              }
            />
            <button
              onClick={() => onRestock(sweet._id)}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 rounded-md"
            >
              Restock
            </button>
          </div>

          <button
            onClick={() => onDelete(sweet._id)}
            className="text-sm text-red-600 hover:underline"
          >
            Delete sweet
          </button>
        </div>
      )}
    </div>
  );
}
