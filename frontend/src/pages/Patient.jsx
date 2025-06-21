import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import {
  fetchQueueState,
  setCurrentToken,
} from "../store/slices/queueSlice";

const socket = io(import.meta.env.VITE_SOCKET_BASE);

export default function Patient() {
  const dispatch = useDispatch();
  const { currentToken, upcomingTokens } = useSelector((state) => state.queue);

  const [myToken, setMyToken] = useState(null);
  const [name, setName] = useState("");

  // // 🧠 Restore token from localStorage (optional for real-life usage)
  // useEffect(() => {
  //   const saved = localStorage.getItem("myToken");
  //   if (saved) setMyToken(Number(saved));
  // }, []);

  // // 💾 Persist token in localStorage (optional for real-life usage)
  // useEffect(() => {
  //   if (myToken !== null) {
  //     localStorage.setItem("myToken", myToken);
  //   }
  // }, [myToken]);

  const handleJoinQueue = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE}/api/token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      const data = await res.json();
      setMyToken(data.number);
      dispatch(fetchQueueState());
    } catch (err) {
      alert("❌ Could not join the queue. Try again.");
    }
  };

  useEffect(() => {
    dispatch(fetchQueueState());

    socket.on("connect", () => {
      console.log("🧍 Patient connected:", socket.id);
    });

    socket.on("tokenCalled", (data) => {
      dispatch(setCurrentToken(data)); // full object
      dispatch(fetchQueueState());
    });

    return () => {
      socket.off("connect");
      socket.off("tokenCalled");
    };
  }, [dispatch]);

  const getStatus = () => {
    if (!myToken || !currentToken?.number) return "⏳ Waiting for updates...";
    if (myToken === currentToken.number) return "✅ It's your turn now!";
    if (currentToken.number > myToken) return "🟢 You were already served.";

    const numbers = upcomingTokens.map((t) => t.number);
    const index = numbers.indexOf(myToken);
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
              {currentToken?.number ?? "Loading..."}
            </span>
          </div>
          <div className="text-lg mt-4 text-gray-700">{getStatus()}</div>
        </>
      )}
    </div>
  );
}
