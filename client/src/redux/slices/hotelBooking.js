import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
    hotelBooking: []
};

export const getHotelBookings = createAsyncThunk(
    "hotelBooking/getHotel",
    async () => {
        const { data } = await axios.get("http://localhost:3001/api/booking/hotel", {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            },
        })
        return data.booking

    }
);

export const deleteHotelBooking = createAsyncThunk(
    "hotelBooking/deleteHotel",
    async (id) => {
        await axios.delete(`http://localhost:3001/api/booking/delete/${id}`, {
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


const hotelBookingsSlice = createSlice({
    name: "hotelBooking",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getHotelBookings.fulfilled, (state, action) => {
            state.hotelBooking = action.payload
        })

        builder.addCase(deleteHotelBooking.fulfilled, (state, action) => {
            state.hotelBooking.splice(state.hotelBooking.findIndex((arrow) => arrow.id === action.payload), 1);
        })
    },
});

const { reducer } = hotelBookingsSlice;
export default reducer;