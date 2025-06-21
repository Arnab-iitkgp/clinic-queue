import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import axios from "axios";
import toast from "react-hot-toast";
import {
  fetchQueueState,
  setCurrentToken,
  resetQueue as resetQueueState,
} from "../store/slices/queueSlice";

const socket = io("http://localhost:5000");

export default function Receptionist() {
  const dispatch = useDispatch();
  const { currentToken, upcomingTokens, loading, error } = useSelector(
    (state) => state.queue
  );

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const userRole = user?.role;

  const authHeaders = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const handleCallNext = async () => {
    if (!token) return;

    try {
      const res = await axios.post(
        "http://localhost:5000/api/token/call",
        {},
        authHeaders
      );
      dispatch(setCurrentToken(res.data));
      dispatch(fetchQueueState());
      toast.success(`📞 Called Token #${res.data.number}`);
    } catch (err) {
      console.error("❌ Error calling token:", err.message);
      toast.error(err?.response?.data?.message || "Failed to call token");
    }
  };

  const handleResetQueue = async () => {
    const confirmReset = window.confirm("Are you sure you want to reset the queue?");
    if (!confirmReset) return;

    try {
      await axios.delete("http://localhost:5000/api/token/reset", authHeaders);
      dispatch(resetQueueState());
      toast.success("🧹 Queue has been reset");
    } catch (err) {
      console.error("❌ Failed to reset queue.");
      toast.error("Reset failed");
    }
  };

  useEffect(() => {
    dispatch(fetchQueueState());

    socket.on("connect", () => {
      console.log("👩‍💼 Receptionist connected:", socket.id);
    });

    socket.on("tokenCalled", (data) => {
      dispatch(setCurrentToken(data));
      dispatch(fetchQueueState());
    });

    socket.on("newToken", () => {
      dispatch(fetchQueueState());
    });

    return () => {
      socket.off("connect");
      socket.off("tokenCalled");
      socket.off("newToken");
    };
  }, [dispatch]);

  return (
    <div className="flex flex-col items-center bg-white px-4 py-8 text-gray-800 overflow-hidden">
      <h1 className="text-4xl font-bold mb-4 text-blue-600">Receptionist Panel</h1>

      {currentToken ? (
        <div className="text-2xl mb-2">
          ✅ Last Called Token:{" "}
          <span className="font-bold text-green-600">#{currentToken.number}</span>{" "}
          <span className="text-gray-500 italic">({currentToken.name})</span>
        </div>
      ) : (
        <h2 className="text-lg text-gray-500 mb-2">No token called yet.</h2>
      )}

      <button
        onClick={handleCallNext}
        className={`px-6 py-3 mt-4 text-white font-semibold rounded shadow ${
          loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
        }`}
        disabled={loading}
      >
        {loading ? "Calling..." : "📞 Call Next Token"}
      </button>

      {userRole === "admin" && (
        <button
          onClick={handleResetQueue}
          className="mt-4 px-5 py-2 bg-red-600 text-white rounded hover:bg-red-700 shadow transition"
        >
          🧹 Reset Queue
        </button>
      )}

      {error && <p className="mt-4 text-red-500">{error}</p>}

      <div className="mt-8 w-full max-w-md bg-gray-100 rounded-lg p-4 flex flex-col">
        <h3 className="text-lg font-semibold mb-2 text-gray-700">
          📋 Upcoming Tokens:
        </h3>

        {upcomingTokens.length > 0 ? (
          <div className="flex flex-col gap-2 overflow-y-auto pr-1" style={{ maxHeight: "18rem" }}>
            {upcomingTokens.map((tokenObj, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between bg-blue-50 text-blue-800 px-4 py-2 rounded-lg font-medium shadow w-full"
              >
                <span className="text-lg font-semibold">#{tokenObj.number}</span>
                <span className="text-sm text-blue-600 italic">{tokenObj.name}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic text-sm">No tokens in queue</p>
        )}
      </div>
    </div>
  );
}
