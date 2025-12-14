export default function AddSweetForm({ newSweet, setNewSweet, onAdd }) {
  return (
    <div className="mt-10 max-w-md bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-lg font-medium mb-4">
        Add new sweet
      </h2>

      {["name", "category", "price", "quantity"].map((f) => (
        <input
          key={f}
          className="w-full mb-3 p-2 border rounded-md"
          placeholder={f}
          value={newSweet[f]}
          onChange={(e) =>
            setNewSweet({ ...newSweet, [f]: e.target.value })
          }
        />
      ))}

      <button
        onClick={onAdd}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
      >
        Add Sweet
      </button>
    </div>
  );
}

