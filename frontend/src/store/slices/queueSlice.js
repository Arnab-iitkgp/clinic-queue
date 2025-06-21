// store/slices/queueSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Helper to dynamically get latest token (for cases when token updates)
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
};

export const fetchQueueState = createAsyncThunk("queue/fetch", async (_, thunkAPI) => {
  try {
    let current = null;

    // Try fetching the current token, but gracefully handle 404 (no token yet)
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE}/api/token/current`);
      current = res.data || null;
    } catch (err) {
      if (err.response?.status !== 404) {
        throw err; // only ignore 404, not real errors
      }
    }

    // Always try fetching waiting tokens (protected route)
    const waiting = await axios.get(
      `${import.meta.env.VITE_API_BASE}/api/token/waiting`,
      getAuthHeaders()
    );

    return {
      current,
      upcoming: waiting.data || [],
    };
  } catch (err) {
    console.error("❌ Queue Fetch Error:", err.message);
    return thunkAPI.rejectWithValue(
      err.response?.data?.message || "Queue load failed."
    );
  }
});

const queueSlice = createSlice({
  name: "queue",
  initialState: {
    currentToken: null,
    upcomingTokens: [],
    loading: false,
    error: null,
  },
  reducers: {
    setCurrentToken: (state, action) => {
      state.currentToken = action.payload;
    },
    setUpcomingTokens: (state, action) => {
      state.upcomingTokens = action.payload;
    },
    resetQueue: (state) => {
      state.currentToken = null;
      state.upcomingTokens = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQueueState.pending, (state) => {
        state.loading = true;
        state.error = null; // clear any previous error
      })
      .addCase(fetchQueueState.fulfilled, (state, action) => {
        state.loading = false;
        state.currentToken = action.payload.current;
        state.upcomingTokens = action.payload.upcoming;
      })
      .addCase(fetchQueueState.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Queue load failed.";
      });
  },
});

export const { setCurrentToken, setUpcomingTokens, resetQueue } = queueSlice.actions;
export default queueSlice.reducer;
