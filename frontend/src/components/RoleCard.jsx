import { Link } from "react-router-dom";
export default function RoleCard({ emoji, role, link, color }) {
  return (
    <Link to={link} className="transform hover:scale-105 transition">
      <div className={`w-60 h-40 flex flex-col items-center justify-center rounded-xl shadow-md text-white ${color}`}>
        <div className="text-4xl mb-2">{emoji}</div>
        <h2 className="text-2xl font-bold">{role}</h2>
      </div>
    </Link>
  );
}