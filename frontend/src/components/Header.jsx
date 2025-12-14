export default function Header({ token, onLogout }) {
  return (
    <header className="flex justify-between p-4 bg-white shadow">
      <h1 className="text-xl font-bold">Sweet Shop</h1>

      {token && (
        <button
          onClick={onLogout}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Logout
        </button>
      )}
    </header>
  );
}
