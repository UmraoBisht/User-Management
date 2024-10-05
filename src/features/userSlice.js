// userSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUsers, createUser, updateUser, deleteUser } from "./userApi";
import { toast } from "react-toastify"; // Import toast notifications

const initialState = {
  users: [],
  status: "idle",
  error: null,
};

// Fetch users
export const fetchUsersAsync = createAsyncThunk(
  "users/fetchUsersAsync",
  async (_, thunkAPI) => {
    try {
      const response = await fetchUsers();
      return response;
    } catch (error) {
      toast.error("Failed to fetch users"); // Show error toast
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Create user
export const createUserAsync = createAsyncThunk(
  "users/createUserAsync",
  async (newUser, thunkAPI) => {
    try {
      const response = await createUser(newUser);
      toast.success("User created successfully"); // Show success toast
      return response;
    } catch (error) {
      toast.error("Failed to create user"); // Show error toast
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Update user
export const updateUserAsync = createAsyncThunk(
  "users/updateUserAsync",
  async (updatedUser, thunkAPI) => {
    try {
      const response = await updateUser(updatedUser);
      toast.success("User updated successfully"); // Show success toast
      return response;
    } catch (error) {
      toast.error("Failed to update user"); // Show error toast
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Delete user
export const deleteUserAsync = createAsyncThunk(
  "users/deleteUserAsync",
  async (userId, thunkAPI) => {
    try {
      await deleteUser(userId);
      toast.success("User deleted successfully"); // Show success toast
      console.log(userId);
      return userId; // Return the ID of the deleted user
    } catch (error) {
      toast.error("Failed to delete user"); // Show error toast
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Users
      .addCase(fetchUsersAsync.pending, (state) => {
        state.status = "loading";
        state.loading = true; // Set loading to true
      })
      .addCase(fetchUsersAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
        state.loading = false; // Set loading to false
      })
      .addCase(fetchUsersAsync.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })

      // Create User
      .addCase(createUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.users.push(action.payload); // Add the new user to the state
        state.status = "succeeded";
      })
      .addCase(createUserAsync.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed"; // Set loading to false
      })

      // Update User
      .addCase(updateUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        const index = state.users.findIndex(
          (user) => user.id === action.payload.id
        );
        if (index !== -1) {
          state.users[index] = action.payload; // Update the user in the state
        }
        state.status = "succeeded";
      })
      .addCase(updateUserAsync.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed"; // Set loading to false
      })

      // Delete User
      .addCase(deleteUserAsync.pending, (state) => {
        state.status = "loading"; // Set loading to true for delete
      })
      .addCase(deleteUserAsync.fulfilled, (state, action) => {
        const userIndex = state.users.findIndex(
          (user) => user.id === action.payload
        );
        if (userIndex !== -1) {
          state.users.splice(userIndex, 1); // Remove user from state
        }
        state.status = "succeeded";
      })
      .addCase(deleteUserAsync.rejected, (state, action) => {
        state.error = action.payload; // Set error in the state
        state.status = "failed"; // Set loading to false
      });
  },
});

export default usersSlice.reducer;
