import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//  Async Thunks
export const fetchReceptionists = createAsyncThunk(
  "receptionists/fetchAll",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/receptionists", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Fetch failed");
    }
  }
);

export const createReceptionist = createAsyncThunk(
  "receptionists/create",
  async (form, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("http://localhost:5000/api/receptionists", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.user;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Create failed");
    }
  }
);

export const deleteReceptionist = createAsyncThunk(
  "receptionists/delete",
  async (id, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/receptionists/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Delete failed");
    }
  }
);

//  Slice
const receptionistSlice = createSlice({
  name: "receptionists",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchReceptionists.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchReceptionists.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchReceptionists.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create
      .addCase(createReceptionist.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })

      // Delete
      .addCase(deleteReceptionist.fulfilled, (state, action) => {
        state.list = state.list.filter((r) => r._id !== action.payload);
      });
  },
});

export default receptionistSlice.reducer;
