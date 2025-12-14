import { useEffect, useState } from "react";
import './index.css'

const API = "http://localhost:5000";

export default function App() {
  // auth
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [token, setToken] = useState("");
  const [role, setRole] = useState("");

  // sweets
  const [sweets, setSweets] = useState([]);
  const [search, setSearch] = useState("");
  const [purchaseQty, setPurchaseQty] = useState({});


  // admin
  const [newSweet, setNewSweet] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
  });
  const [restockQty, setRestockQty] = useState({});

  // ---------------- AUTH ----------------

  const login = async () => {
    const res = await fetch(`${API}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) return alert(data.message || "Login failed");

    setToken(data.token);
    const payload = JSON.parse(atob(data.token.split(".")[1]));
    setRole(payload.role);
  };

  const register = async () => {
    const res = await fetch(`${API}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    if (!res.ok) return alert(data.message || "Register failed");
    await login();
  };

  const logout = () => {
    setToken("");
    setRole("");
    setEmail("");
    setPassword("");
    setName("");
  };

  // ---------------- SWEETS ----------------

  const fetchSweets = async () => {
    const res = await fetch(
      `${API}/api/sweets/search?name=${search}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setSweets(await res.json());
  };

const purchaseSweet = async (id, qty) => {
  await fetch(`${API}/api/sweets/${id}/purchase`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ qty: Number(qty) }),
  });

  setPurchaseQty({ ...purchaseQty, [id]: "" });
  fetchSweets();
};

  // ---------------- ADMIN ----------------

  const addSweet = async () => {
    await fetch(`${API}/api/sweets`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...newSweet,
        price: Number(newSweet.price),
        quantity: Number(newSweet.quantity),
      }),
    });
    setNewSweet({ name: "", category: "", price: "", quantity: "" });
    fetchSweets();
  };

  const deleteSweet = async (id) => {
    await fetch(`${API}/api/sweets/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchSweets();
  };

  const restockSweet = async (id) => {
    await fetch(`${API}/api/sweets/${id}/restock`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ qty: Number(restockQty[id] || 0) }),
    });
    setRestockQty({ ...restockQty, [id]: "" });
    fetchSweets();
  };

  useEffect(() => {
    if (token) fetchSweets();
  }, [token, search]);

  // ---------------- UI ----------------

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">🍬 Sweet Shop</h1>
        {token && (
          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        )}
      </header>

      {!token && (
        <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">
            {isRegister ? "Register" : "Login"}
          </h2>

          {isRegister && (
            <input
              className="w-full mb-2 p-2 border rounded"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
          )}

          <input
            className="w-full mb-2 p-2 border rounded"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="w-full mb-4 p-2 border rounded"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={isRegister ? register : login}
            className="w-full bg-blue-600 text-white py-2 rounded"
          >
            {isRegister ? "Register" : "Login"}
          </button>

          <p
            className="text-center mt-3 text-blue-600 cursor-pointer"
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister
              ? "Already have an account? Login"
              : "New user? Register"}
          </p>
        </div>
      )}

      {token && (
        <>
          <div className="flex justify-between mb-4">
            <input
              className="p-2 border rounded w-1/2"
              placeholder="Search sweets..."
              onChange={(e) => setSearch(e.target.value)}
            />
            <span className="font-semibold">Role: {role}</span>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {sweets.map((s) => (
              <div key={s._id} className="bg-white p-4 rounded shadow">
                <h3 className="font-bold text-lg">{s.name}</h3>
                <p className="text-sm text-gray-600">{s.category}</p>
                <p className="mt-1">₹{s.price}</p>
                <p>Stock: {s.quantity}</p>

                <div className="mt-2 flex gap-2 items-center">
  <input
    type="number"
    min="1"
    className="w-20 p-1 border rounded"
    placeholder="Qty"
    value={purchaseQty[s._id] || ""}
    onChange={(e) =>
      setPurchaseQty({
        ...purchaseQty,
        [s._id]: e.target.value,
      })
    }
  />

  <button
    disabled={
      s.quantity === 0 ||
      !purchaseQty[s._id] ||
      Number(purchaseQty[s._id]) > s.quantity
    }
    onClick={() => purchaseSweet(s._id, purchaseQty[s._id])}
    className="bg-green-600 text-white px-3 py-1 rounded disabled:bg-gray-400"
  >
    Purchase
  </button>
</div>


                {role === "ADMIN" && (
                  <>
                    <div className="mt-3 flex gap-2">
                      <input
                        className="w-20 p-1 border rounded"
                        placeholder="Qty"
                        value={restockQty[s._id] || ""}
                        onChange={(e) =>
                          setRestockQty({
                            ...restockQty,
                            [s._id]: e.target.value,
                          })
                        }
                      />
                      <button
                        onClick={() => restockSweet(s._id)}
                        className="bg-yellow-500 text-white px-2 rounded"
                      >
                        Restock
                      </button>
                    </div>

                    <button
                      onClick={() => deleteSweet(s._id)}
                      className="mt-2 bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>

 


          {role === "admin" && (
            <div className="mt-8 bg-white p-6 rounded shadow">
              <h2 className="text-xl font-semibold mb-4">Add New Sweet</h2>
              {["name", "category", "price", "quantity"].map((f) => (
                <input
                  key={f}
                  className="w-full mb-2 p-2 border rounded"
                  placeholder={f}
                  value={newSweet[f]}
                  onChange={(e) =>
                    setNewSweet({ ...newSweet, [f]: e.target.value })
                  }
                />
              ))}
              <button
                onClick={addSweet}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Add Sweet
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
