import RoleCard from "./components/RoleCard";
import { Toaster } from "react-hot-toast"; // 👈 import here

export default function App() {
  return (
    <>
      {/* 🔔 Global toast system */}
      <Toaster position="top-center" reverseOrder={false} />

      <div className="flex flex-col items-center justify-center gap-8 py-10">
        <h1 className="text-5xl font-extrabold text-indigo-700 mb-8">QueueMate 🧾</h1>
        <p className="mb-10 text-lg text-gray-600 text-center">Choose your role to continue</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <RoleCard emoji="👩‍💼" role="Admin/Desk" link="/login" color="bg-blue-600" />
          <RoleCard emoji="🧍" role="Patient" link="/patient" color="bg-green-600" />
          <RoleCard emoji="🖥️" role="Display" link="/display" color="bg-yellow-500" />
        </div>
      </div>
    </>
  );
}
