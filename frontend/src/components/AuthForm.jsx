export default function AuthForm({
  isRegister,
  setIsRegister,
  setName,
  setEmail,
  setPassword,
  onSubmit,
}) {
  return (
    <div className="max-w-sm mx-auto bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-lg font-medium mb-4">
        {isRegister ? "Create account" : "Welcome back"}
      </h2>

      {isRegister && (
        <input
          className="w-full mb-3 p-2 border rounded-md"
          placeholder="Full name"
          onChange={(e) => setName(e.target.value)}
        />
      )}

      <input
        className="w-full mb-3 p-2 border rounded-md"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        className="w-full mb-4 p-2 border rounded-md"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={onSubmit}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md"
      >
        {isRegister ? "Register" : "Login"}
      </button>

      <p
        className="mt-4 text-center text-sm text-blue-600 cursor-pointer"
        onClick={() => setIsRegister(!isRegister)}
      >
        {isRegister
          ? "Already have an account? Login"
          : "New here? Create an account"}
      </p>
    </div>
  );
}
