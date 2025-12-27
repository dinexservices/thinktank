import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const API_URL = "https://api.dinestx.com/api/user/";
// const API_URL = "http://localhost:5000/api/user/";

export const checkAuth = createAsyncThunk("auth/checkAuth", async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.get(`${API_URL}check-auth`, { withCredentials: true });
      if (response.data.isAuthenticated) {
        dispatch(getData()); // Fetch user data if authenticated
      }
      return { status: response.status, data: response.data };
    } catch (err) {
      return rejectWithValue(err.response?.data || "Something went wrong");
    }
  });
  
  
export const loginUser = createAsyncThunk("auth/login", async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}login`, data, { withCredentials: true });
      return { status: response.status, data: response.data };
    } catch (err) {
      return rejectWithValue(err.response?.data || "Something went wrong");
    }
  });

  export const getData = createAsyncThunk("auth/getData", async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}me`, {  withCredentials: true });
      return response.data ;

    } catch (err) {
      return rejectWithValue(err.response?.data || "Something went wrong");
    }
  });

  export const logoutUser = createAsyncThunk("auth/logOut", async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}logOut`,{}, {  withCredentials: true });
  
      return response.message;
  
    } catch (err) {
      return rejectWithValue(err.response?.data || "Something went wrong");
    }
  });


  export const sendMsg = createAsyncThunk("auth/sendMsg", async (data, { rejectWithValue }) => {
    try {
      
      const response = await axios.post(`${API_URL}send`,data, {  withCredentials: true });
      return { status: response.status, message: response.data.message };


    } catch (err) {
      return rejectWithValue(err.response?.data || "Something went wrong");
    }
  });




    export const registerEvent = createAsyncThunk("auth/registerEvent", async (formData, { rejectWithValue }) => {
    try {
      
      const response = await axios.post(`${API_URL}register-event`,formData, {  withCredentials: true });
      
      return { status: response?.status,message:response?.data?.message };

    } catch (err) {
      return rejectWithValue(err.response?.data || "Something went wrong");
    }
  });


  export const googleLogin = createAsyncThunk(
    "auth/googleLogin",
    async (_, { rejectWithValue }) => {
      try {

        window.location.href = `${API_URL}google`;
      } catch (err) {
        return rejectWithValue(err.message || "Google login failed");
      }
    }
  );





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




export const submitAppointment = createAsyncThunk(
  "appointments/submit",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}book`, formData, { withCredentials: true });
    
      return { status: response.status, message:response?.data?.message };
    } catch (err) {

  const errorMsg = err.response?.data?.message || "Something went wrong";
      return rejectWithValue({ message: errorMsg });
    }
  }
);



  const initialState = {
    user: null,
    isAuthenticated: false,
    loading:false,
    message: null,
    bookingStatus: null,
    error: null,
      applicationStatus: null,
    errordata:null
  };
  
  // Auth Slice
  const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
     
    },
    extraReducers: (builder) => {
      builder
        // Handle Login
        .addCase(loginUser.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
          state.loading = false;
          state.isAuthenticated = true;
          state.user = action.payload;
        })
        .addCase(loginUser.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
  
        //check-auth
        .addCase(checkAuth.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(checkAuth.fulfilled, (state, action) => {
          state.loading = false;
          state.isAuthenticated = action.payload.isAuthenticated;
        })
        .addCase(checkAuth.rejected, (state, action) => {
          state.loading = false;
          state.isAuthenticated = false;
          state.user = null;
          state.error = action.payload;
        })
  
        // Handle Get Data
        .addCase(getData.pending, (state) => {
          state.loading= true;
          state.errordata = null;
        })
        .addCase(getData.fulfilled, (state, action) => {
          state.loading = false;
          state.isAuthenticated = true;
          state.user = action.payload;
        })
        .addCase(getData.rejected, (state, action) => {
          state.loading = false;
          state.isAuthenticated = false;
          state.user = null;
          state.errordata = action.payload;
        })
  
        // Handle Logout
        .addCase(logoutUser.pending, (state) => {
          state.loading = true;
        })
        .addCase(logoutUser.fulfilled, (state) => {
          state.loading = false;
          state.isAuthenticated = false;
          state.user = null;
        })
        .addCase(logoutUser.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
  
        //forget


    //google login
    .addCase(googleLogin.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(googleLogin.fulfilled, (state) => {
      state.loading = false;
    })
    .addCase(googleLogin.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

   //send
   .addCase(sendMsg.pending, (state) => {
    state.loading = true;
    state.error = null;
  })
  .addCase(sendMsg.fulfilled, (state, action) => {
    state.loading = false;
    state.message = action.payload.message;
  })
  .addCase(sendMsg.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload || action.error.message;
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



    .addCase(registerEvent.pending, (state) => {
      state.loading = true;
      state.message = null;
      state.error = null;
    })
    .addCase(registerEvent.fulfilled, (state, action) => {
      state.loading = false;
     state.message = action.payload.message;
 // "Application submitted successfully"
   
    })
    .addCase(registerEvent.rejected, (state, action) => {
      state.loading = false;
      state.message = null;
      state.error = action.payload;
    })

       .addCase(submitAppointment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
    
      })
   .addCase(submitAppointment.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload
});

 
       
    },
  });
  





  export default authSlice.reducer;

