import { Link, useNavigate } from "react-router-dom";
import LogoutButton from "./LogoutButton";

export default function Header() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="bg-white shadow-md px-4 sm:px-6 py-3 flex justify-between items-center border-b border-slate-200 text-slate-800">
      {/* Logo */}
      <Link
        to="/"
        className="text-base sm:text-xl font-semibold text-indigo-600 hover:text-indigo-700 whitespace-nowrap"
      >
        🧾 QueueMate
      </Link>

      {/* Right Section */}
      {user && (
        <div className="flex items-center gap-2 sm:gap-3 max-w-[80%] sm:max-w-none overflow-hidden">
          {/* Avatar */}
          <div className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full bg-indigo-600 text-white font-semibold text-sm shrink-0">
            {user.name?.charAt(0).toUpperCase()}
          </div>

          {/* Name + Role - hidden on mobile */}
          <div className="hidden sm:flex flex-col leading-tight truncate max-w-[100px] sm:max-w-none">
            <span className="text-sm font-medium truncate">{user.name}</span>
            <span className="text-xs capitalize text-slate-500 truncate">{user.role}</span>
          </div>

          {/* Dashboard button (admin only) */}
          {user.role === "admin" && (
            <Link
              to="/admin/dashboard"
              className="text-xs sm:text-sm px-2 sm:px-4 py-1 sm:py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-md shadow-sm transition whitespace-nowrap"
            >
              📊 Dashboard
            </Link>
          )}

          {/* Logout Button */}
          <LogoutButton onClick={handleLogout} />
        </div>
      )}
    </header>
  );
}
