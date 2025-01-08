import { createAsyncThunk, createSlice,} from "@reduxjs/toolkit";
import axios from "axios";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
}

export interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
}

export const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk<User[], void>(
  "users/fetchUsers",
  async () => {
    const response = await axios.get("https://jsonplaceholder.typicode.com/users");
    return response.data;
  }
);
export const deleteUserAsync = createAsyncThunk(
  "users/deleteUser",
  async (id:any) => {
    const response = await axios.delete(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );
    return id;
  }
);

export const addUserAsync = createAsyncThunk("users/addUser", async (value:any) => {
  const response = await axios.post(
    `https://jsonplaceholder.typicode.com/users/`,
    value
  );
  return value;
});

export const editUserAsync = createAsyncThunk(
  "users/editUser",
  async (value:any) => {
    const response = await axios.put(
      `https://jsonplaceholder.typicode.com/users/${value.id}`,
      value
    );
    return value;
  }
);


export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "";
    });
    builder.addCase(editUserAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(editUserAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.users = state.users.map((user) =>
        user.id === action.payload.id ? action.payload : user
      );
    });
    builder.addCase(editUserAsync.rejected, (state, action:any) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(addUserAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addUserAsync.fulfilled, (state, action:any) => {
      state.loading = false;
      console.log("add user payload", action.payload);
      state.users.push(action.payload);
      console.log(state.users);
    });
    builder.addCase(addUserAsync.rejected, (state, action:any) => {
      state.loading = false;
      console.log("first");
      state.error = action.error.message;
    });

    builder.addCase(deleteUserAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteUserAsync.fulfilled, (state, action:any) => {
      state.loading = false;
      console.log("action", action);
      state.users = state.users.filter((user) => user.id !== action.payload);
    });
    builder.addCase(deleteUserAsync.rejected, (state, action:any) => {
      state.loading = false;
      state.error = action.error.message;
    });
  }
});

export default userSlice.reducer;


