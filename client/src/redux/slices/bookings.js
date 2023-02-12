import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
    bookings: []
};

export const getAllBookings = createAsyncThunk(
    "bookings/getAll",
    async () => {
        const { data } = await axios.get("http://localhost:3001/api/booking")
        return data.booking

    }
);

export const getHotelBookings = createAsyncThunk(
    "bookings/getHotel",
    async () => {
        const { data } = await axios.get("http://localhost:3001/api/booking")
        return data.booking

    }
);

export const creatBooking = createAsyncThunk(
    "booking/create",
    async (booking) => {
        await axios.post("http://localhost:3001/api/booking/create", booking, {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            },
        }).then((res) => {
            toast.success(res.data.success)
        }).catch((res) => {
            toast.error(res.response.data.error)
        });
    }
);

export const deleteBooking = createAsyncThunk(
    "booking/delete",
    async (id) => {
        await axios.delete(`http://localhost:3001/api/booking/admin/delete/${id}`, {
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

export const deleteHotelBooking = createAsyncThunk(
    "booking/deleteHotel",
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


const bookingsSlice = createSlice({
    name: "bookings",
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder.addCase(getAllBookings.fulfilled, (state, action) => {
            state.bookings = action.payload
        })

        builder.addCase(getHotelBookings.fulfilled, (state, action) => {
            state.bookings = action.payload
        })

        builder.addCase(creatBooking.fulfilled, (state, action) => { })

        builder.addCase(deleteBooking.fulfilled, (state, action) => {
            state.bookings.splice(state.bookings.findIndex((arrow) => arrow.id === action.payload), 1);
        })
        
        builder.addCase(deleteHotelBooking.fulfilled, (state, action) => {
            state.bookings.splice(state.bookings.findIndex((arrow) => arrow.id === action.payload), 1);
        })
    },
});

const { reducer } = bookingsSlice;
export default reducer;