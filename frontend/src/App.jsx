import { useEffect, useState } from "react";
import "./index.css";

import Header from "./components/Header";
import AuthForm from "./components/AuthForm";
import SweetCard from "./components/SweetCard";
import AddSweetForm from "./components/AddSweetForm";

const API = "http://localhost:5000";

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [token, setToken] = useState("");
  const [role, setRole] = useState("");

  const [sweets, setSweets] = useState([]);
  const [search, setSearch] = useState("");
  const [purchaseQty, setPurchaseQty] = useState({});
  const [restockQty, setRestockQty] = useState({});
  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState("");

  const [newSweet, setNewSweet] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
  });

  const login = async () => {
    const res = await fetch(`${API}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) return alert(data.message);
    setToken(data.token);
    setRole(JSON.parse(atob(data.token.split(".")[1])).role);
  };

  const register = async () => {
    await fetch(`${API}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    login();
  };

  const logout = () => {
    setToken("");
    setRole("");
  };
  
  const fetchSweets = async () => {
  const params = new URLSearchParams();

  if (search) params.append("name", search);
  if (category) params.append("category", category);

  if (priceRange) {
    if (priceRange === "300+") {
      params.append("minPrice", "300");
    } else {
      const [min, max] = priceRange.split("-");
      params.append("minPrice", min);
      params.append("maxPrice", max);
    }
  }

  const res = await fetch(
    `${API}/api/sweets/search?${params.toString()}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
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

  const deleteSweet = async (id) => {
    await fetch(`${API}/api/sweets/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchSweets();
  };

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

useEffect(() => {
  if (token) fetchSweets();
}, [token, search, category, priceRange]);


  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6">
      <Header token={token} onLogout={logout} />

      {!token && (
        <AuthForm
          isRegister={isRegister}
          setIsRegister={setIsRegister}
          setName={setName}
          setEmail={setEmail}
          setPassword={setPassword}
          onSubmit={isRegister ? register : login}
        />
      )}

      {token && (
        <>
          <div className="flex flex-wrap gap-4 mb-6 items-center">
            <input
  className="p-2 border rounded-md w-full sm:w-1/3"
  placeholder="Search sweets..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>


            <select
              className="p-2 border rounded-md"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="Festival Sweets">Festival Sweets</option>
              <option value="Milk Sweets">Milk Sweets</option>
              <option value="Dry Fruit">Dry Fruit</option>
              <option value="Bengali Sweet">Bengali Sweet</option>
            </select>

            <select
              className="p-2 border rounded-md"
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
            >
              <option value="">All Prices</option>
              <option value="0-100">₹0 - ₹100</option>
              <option value="100-300">₹100 - ₹300</option>
              <option value="300+">₹300+</option>
            </select>

            <span className="text-sm ml-auto">Role: {role}</span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {sweets.map((s) => (
              <SweetCard
                key={s._id}
                sweet={s}
                role={role}
                purchaseQty={purchaseQty}
                setPurchaseQty={setPurchaseQty}
                restockQty={restockQty}
                setRestockQty={setRestockQty}
                onPurchase={purchaseSweet}
                onRestock={restockSweet}
                onDelete={deleteSweet}
              />
            ))}
          </div>

          {role === "ADMIN" && (
            <AddSweetForm
              newSweet={newSweet}
              setNewSweet={setNewSweet}
              onAdd={addSweet}
            />
          )}
        </>
      )}
    </div>
  );
}
