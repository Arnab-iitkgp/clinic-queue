import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:5000");

export default function Patient() {
  const [myToken, setMyToken] = useState(null);
  const [currentToken, setCurrentToken] = useState(null);
  const [waitingTokens, setWaitingTokens] = useState([]);
  const [name, setName] = useState("");
  const handleJoinQueue = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/token", { name });
      setMyToken(res.data.number);
      fetchWaitingTokens();
    } catch (err) {
      alert("❌ Could not join the queue. Try again.");
    }
  };

  const fetchWaitingTokens = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/token/waiting");
      const tokens = res.data.map((t) => t.number);
      console.log("📋 Waiting tokens:", tokens);
      setWaitingTokens(tokens);
    } catch (err) {
      console.error("Error fetching waiting tokens");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const waiting = await axios.get(
          "http://localhost:5000/api/token/waiting"
        );
        setWaitingTokens(waiting.data.map((t) => t.number));
      } catch (err) {
        console.log("Error fetching waiting tokens");
      }

      try {
        const current = await axios.get(
          "http://localhost:5000/api/token/current"
        );
        setCurrentToken(current.data.number);
      } catch (err) {
        console.log("No token called yet.");
      }
    };

    fetchData();

    socket.on("connect", () => {
      console.log("🧍 Patient connected:", socket.id);
    });

    socket.on("tokenCalled", (data) => {
      setCurrentToken(data.number);
      fetchData(); // refresh queue too
    });

    return () => {
      socket.off("connect");
      socket.off("tokenCalled");
    };
  }, []);

  const getStatus = () => {
    if (!myToken || !currentToken) return "⏳ Waiting for updates...";
    if (myToken === currentToken) return "✅ It's your turn now!";
    if (currentToken > myToken) return "🟢 You were already served.";

    const index = waitingTokens.indexOf(myToken);
    return index === -1
      ? "🔄 Waiting for your token to be added..."
      : `⌛ ${index} people ahead of you.`;
  };

  return (
    <div className="flex flex-col items-center justify-center px-4 text-gray-800 py-40">
      <h1 className="text-4xl font-bold text-green-600 mb-6">Patient Queue</h1>

      {!myToken ? (
        <div className="w-full max-w-sm">
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mb-4 px-4 py-2 border rounded w-full"
            required
          />
          <button
            onClick={handleJoinQueue}
            className="px-6 py-3 bg-green-600 text-white font-semibold rounded hover:bg-green-700 shadow w-full"
            disabled={!name.trim()}
          >
            🧍 Join Queue
          </button>
        </div>
      ) : (
        <>
          <div className="text-2xl mb-2">
            🎫 Your Token: <span className="font-bold">#{myToken}</span>
          </div>
          <div className="text-xl mb-2">
            📢 Current Token:{" "}
            <span className="font-semibold text-blue-600">
              {currentToken || "Loading..."}
            </span>
          </div>
          <div className="text-lg mt-4 text-gray-700">{getStatus()}</div>
        </>
      )}
    </div>
  );
}
