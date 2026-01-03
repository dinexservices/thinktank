import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5050";

// const API_URL = "http://localhost:5000/api/user/";


// Fetch registration form data
export const fetchRegistrationForm = createAsyncThunk("auth/fetchRegistrationForm", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_URL}/events/thinktank/registration`);
    return response.data;
  } catch (err) {
    console.log(err);
    return rejectWithValue(err.response?.data || "Failed to fetch registration form");
  }
});


export const register = createAsyncThunk("auth/register", async (formData, { rejectWithValue }) => {
  try {

    const response = await axios.post(`${API_URL}/event/thinktank/register/v1`, formData, { withCredentials: true });
    console.log(response.data);
    return response.data;

  } catch (err) {
    return rejectWithValue(err.response?.data || "Something went wrong");
  }
});

export const registerGroup = createAsyncThunk("auth/registerGroup", async (formData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_URL}/event/thinktank/register/v1`, formData, { withCredentials: true });
    console.log(response.data);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || "Group registration failed");
  }
});



export const submitApplication = createAsyncThunk(
  "application/submit",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}apply`, data, { withCredentials: true });
      return { status: response.status, data: response.data };
    } catch (err) {
      return rejectWithValue(err.response?.data || "Something went wrong");
    }
  }
);



const initialState = {
  isAuthenticated: false,
  loading: false,
  message: null,
  bookingStatus: null,
  error: null,
  applicationStatus: null,
  errordata: null,
  formData: null,
  formLoading: false
};

// Auth Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder

      // Fetch registration form
      .addCase(fetchRegistrationForm.pending, (state) => {
        state.formLoading = true;
        state.error = null;
      })
      .addCase(fetchRegistrationForm.fulfilled, (state, action) => {
        state.formLoading = false;
        state.formData = action.payload.data;
      })
      .addCase(fetchRegistrationForm.rejected, (state, action) => {
        state.formLoading = false;
        state.error = action.payload;
      })

      //apply

      .addCase(submitApplication.pending, (state) => {
        state.loading = true;
        state.applicationStatus = null;
        state.error = null;
      })
      .addCase(submitApplication.fulfilled, (state, action) => {
        state.loading = false;
        state.applicationStatus = action.payload.data.message; // "Application submitted successfully"
      })
      .addCase(submitApplication.rejected, (state, action) => {
        state.loading = false;
        state.applicationStatus = null;
        state.error = action.payload;
      })



      .addCase(register.pending, (state) => {
        state.loading = true;
        state.message = null;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        // "Application submitted successfully"

      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.message = null;
        state.error = action.payload;
      })

      .addCase(registerGroup.pending, (state) => {
        state.loading = true;
        state.message = null;
        state.error = null;
      })
      .addCase(registerGroup.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(registerGroup.rejected, (state, action) => {
        state.loading = false;
        state.message = null;
        state.error = action.payload;
      })





  },
});






export default authSlice.reducer;

