import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
    hotelRooms: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
};

export const getAllHotelRooms = createAsyncThunk(
    "rooms/getAll",
    async () => {
        const { data } = await axios.get("http://localhost:3001/api/hotelRoom", {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            },
        })
        const hotelRooms = data.rooms
        return hotelRooms
    }
);

export const creatHotelRoom = createAsyncThunk(
    "room/create",
    async (formData) => {
        await axios.post("http://localhost:3001/api/hotelRoom/create", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                accessToken: localStorage.getItem("accessToken"),
            },
        }).then((res) => {
            toast.success(res.data.success)
        }).catch((res) => {
            toast.error(res.response.data.error)
        });
    }
);

export const deleteHotelRoom = createAsyncThunk(
    "room/delete",
    async (id) => {
        const { data } = await axios.delete(`http://localhost:3001/api/hotelRoom/delete/${id}`, {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            },
        })
        toast.success(data.success)
        return id
    }
);


const hotelRoomsSlice = createSlice({
    name: "hotelRoom",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllHotelRooms.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(getAllHotelRooms.fulfilled, (state, action) => {
            state.isLoading = false
            state.hotelRooms = action.payload
        })
        builder.addCase(getAllHotelRooms.rejected, (state, action) => {
            state.isError = true
        })


        builder.addCase(creatHotelRoom.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(creatHotelRoom.fulfilled, (state, action) => {
            state.isSuccess = true
        })
        builder.addCase(creatHotelRoom.rejected, (state, action) => {
            state.isError = true
        })


        builder.addCase(deleteHotelRoom.fulfilled, (state, action) => {
            const newList = state.hotelRooms.filter((x) => x.id !== action.payload)
            state.hotelRooms = newList
        })
    },
});

const { reducer } = hotelRoomsSlice;
export default reducer;