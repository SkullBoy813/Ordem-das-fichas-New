export default function AuthToggle({ mode, setMode }) {
    return (
      <div className="flex bg-zinc-800 rounded-xl overflow-hidden">
        <button
          onClick={() => setMode("login")}
          className={`w-1/2 py-2 ${
            mode === "login" ? "bg-red-600" : "opacity-50"
          }`}
        >
          Login
        </button>
  
        <button
          onClick={() => setMode("register")}
          className={`w-1/2 py-2 ${
            mode === "register" ? "bg-red-600" : "opacity-50"
          }`}
        >
          Registro
        </button>
      </div>
    );
  }
  