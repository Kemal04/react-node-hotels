import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
    users: []
};

export const getAllUsers = createAsyncThunk(
    "users/getAll",
    async () => {
        const { data } = await axios.get("http://localhost:3001/api/user")
        return data.users;
    }
)

export const deleteUsers = createAsyncThunk(
    "users/delete",
    async (id) => {
        await axios.delete(`http://localhost:3001/api/user/admin/delete/${id}`, {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            },
        })
            .then((res) => {
                toast.success(res.data)
            }).catch((err) => {
                toast.error(err.message)
            })
    }
);

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllUsers.fulfilled, (state, action) => {
            state.users = action.payload
        })
        
        builder.addCase(deleteUsers.fulfilled, (state, action) => {
            state.users.splice(state.users.findIndex((arrow) => arrow.id === action.payload), 1);
        })
    },
});

const { reducer } = userSlice;
export default reducer;