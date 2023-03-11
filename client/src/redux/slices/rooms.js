import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import Api_Address from "../../env";

const initialState = {
    rooms: [],
    pages: {},
    isLoading: false,
    isError: false,
    isSuccess: false,
};

export const getAllRooms = createAsyncThunk(
    "rooms/getAll",
    async (page) => {
        const { data } = await axios.get(`${Api_Address}/api/room`, {
            params: {
                page: page
            }
        })
        const rooms = data.rooms;
        const pages = data.pagination.pages     
        return { rooms: rooms, pages: pages };
    }
);

export const deleteRoom = createAsyncThunk(
    "room/delete",
    async (id) => {
        const { data } = await axios.delete(`${Api_Address}/api/room/delete/${id}`, {
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
            state.rooms = action.payload.rooms
            state.pages = action.payload.pages
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