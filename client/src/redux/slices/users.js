import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
    users: [],
    pages: {},
    isLoading: false,
    isError: false,
    isSuccess: false,
};

export const getAllUsers = createAsyncThunk(
    "users/getAll",
    async (page) => {
        const { data } = await axios.get("http://localhost:3001/api/user", {
            params: {
                page: page
            }
        })
        const users = data.users;
        const pages = data.pagination.pages     
        return { users: users, pages: pages };
    }
)

export const deleteUsers = createAsyncThunk(
    "users/delete",
    async (id) => {
        const { data } = await axios.delete(`http://localhost:3001/api/user/admin/delete/${id}`, {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            },
        })
        toast.success(data.success)
        return id
    }
);

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllUsers.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(getAllUsers.fulfilled, (state, action) => {
            state.isLoading = false
            state.users = action.payload.users
            state.pages = action.payload.pages
        })
        builder.addCase(getAllUsers.rejected, (state, action) => {
            state.isError = true
        })


        builder.addCase(deleteUsers.fulfilled, (state, action) => {
            const newList = state.users.filter((x) => x.id !== action.payload)
            state.users = newList
        })
    },
});

const { reducer } = userSlice;
export default reducer;