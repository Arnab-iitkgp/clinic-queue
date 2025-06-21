import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

export default function Display() {
  const [currentToken, setCurrentToken] = useState(null);

useEffect(() => {
  // Fetch last called token on first load
  const fetchCurrent = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/token/current");
      const data = await res.json();
      setCurrentToken(data.number);
    } catch (err) {
      console.log("No token has been called yet.");
    }
  };

  fetchCurrent();

  socket.on("connect", () => {
    console.log("🖥️ Display connected:", socket.id);
  });

  socket.on("tokenCalled", (data) => {
    setCurrentToken(data.number);
    console.log("📡 tokenCalled (Display):", data.number);
  });

  return () => {
    socket.off("connect");
    socket.off("tokenCalled");
  };
}, []);


  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white px-4">
      <h1 className="text-5xl sm:text-6xl font-extrabold mb-8 text-yellow-400 tracking-widest drop-shadow">
        🎫 Now Serving
      </h1>

      {currentToken ? (
        <div className="text-[120px] sm:text-[160px] font-extrabold text-green-400 animate-pulse drop-shadow-lg">
          #{currentToken}
        </div>
      ) : (
        <div className="text-3xl text-gray-300">Waiting for first token...</div>
      )}

      {/* Optional Branding or Footer */}
      <p className="absolute bottom-4 text-sm text-gray-500">Powered by QueueMate 🧾</p>
    </div>
  );
}
