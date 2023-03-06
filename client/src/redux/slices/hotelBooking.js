import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
    hotelBooking: [],
    pages: {},
    isLoading: false,
    isError: false,
    isSuccess: false,
};

export const getHotelBookings = createAsyncThunk(
    "hotelBooking/getHotel",
    async (page) => {
        const { data } = await axios.get("http://localhost:3001/api/booking", {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            },
            params: {
                page: page
            }
        })
        const hotelBooking = data.booking;
        const pages = data.pagination.pages     
        return { hotelBooking: hotelBooking, pages: pages };

    }
);

export const updateHotelBooking = createAsyncThunk(
    "hotelBooking/update",
    async ({ bookingId, booking }) => {
        await axios.post(`http://localhost:3001/api/booking/edit/${bookingId}`, booking, {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            },
        })
            .then((res) => {
                toast.success(res.data.success)
            }).catch((res) => {
                toast.error(res.data.error)
            });
    }
);

export const deleteHotelBooking = createAsyncThunk(
    "hotelBooking/deleteHotel",
    async (id) => {
        const { data } = await axios.delete(`http://localhost:3001/api/booking/delete/${id}`, {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            },
        })
        toast.success(data.success)
        return id
    }
);


const hotelBookingsSlice = createSlice({
    name: "hotelBooking",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getHotelBookings.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(getHotelBookings.fulfilled, (state, action) => {
            state.isLoading = false
            state.hotelBooking = action.payload.hotelBooking
            state.pages = action.payload.pages
        })
        builder.addCase(getHotelBookings.rejected, (state, action) => {
            state.isError = true
        })


        builder.addCase(updateHotelBooking.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(updateHotelBooking.fulfilled, (state, action) => {
            state.isLoading = false
        })
        builder.addCase(updateHotelBooking.rejected, (state, action) => {
            state.isError = true
        })


        builder.addCase(deleteHotelBooking.fulfilled, (state, action) => {
            const newList = state.hotelBooking.filter((x) => x.id !== action.payload)
            state.hotelBooking = newList
        })
    },
});

const { reducer } = hotelBookingsSlice;
export default reducer;