import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
    rooms: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
};

export const getAllRooms = createAsyncThunk(
    "rooms/getAll",
    async () => {
        const { data } = await axios.get("http://localhost:3001/api/room")
        const rooms = data.rooms
        return rooms
    }
);

export const deleteRoom = createAsyncThunk(
    "room/delete",
    async (id) => {
        const { data } = await axios.delete(`http://localhost:3001/api/room/delete/${id}`, {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            },
        })
        toast.success(data.success)
        return id
    }
);

const roomsSlice = createSlice({
    name: "rooms",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllRooms.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(getAllRooms.fulfilled, (state, action) => {
            state.isLoading = false
            state.rooms = action.payload
        })
        builder.addCase(getAllRooms.rejected, (state, action) => {
            state.isError = true
        })


        builder.addCase(deleteRoom.fulfilled, (state, action) => {
            const newList = state.rooms.filter((x) => x.id !== action.payload)
            state.rooms = newList
        })
    },
});

const { reducer } = roomsSlice;
export default reducer;