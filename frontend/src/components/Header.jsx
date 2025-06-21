import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center border-b border-slate-200">
      {/* Logo / Title */}
      <Link
        to="/"
        className="text-xl sm:text-2xl font-semibold text-indigo-600 hover:text-indigo-700 transition"
      >
        🧾 QueueMate
      </Link>

      {/* Right Section */}
     <div className="flex items-center gap-4">
  {user && (
    <>
      <div className="w-9 h-9 flex items-center justify-center rounded-full bg-indigo-600 text-white font-semibold">
        {user.name?.charAt(0).toUpperCase()}
      </div>

      <span className="text-sm text-slate-700">
        Signed in as{" "}
        <span className="font-semibold">{user.name}</span>{" "}
        (<span className="font-medium capitalize">{user.role}</span>)
      </span>

      <button
        onClick={handleLogout}
        className="text-sm px-4 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-md border border-slate-300 transition-shadow shadow-sm"
      >
        🔒 Logout
      </button>
    </>
  )}
</div>


    </header>
  );
}
