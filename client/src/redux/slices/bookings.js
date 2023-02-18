import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
    bookings: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
};

export const getAllBookings = createAsyncThunk(
    "bookings/getAll",
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
        const { data } = await axios.delete(`http://localhost:3001/api/booking/admin/delete/${id}`, {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            },
        })
        toast.success(data.success)
        return id
    }
);


const bookingsSlice = createSlice({
    name: "bookings",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllBookings.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(getAllBookings.fulfilled, (state, action) => {
            state.isLoading = false
            state.bookings = action.payload
        })
        builder.addCase(getAllBookings.rejected, (state, action) => {
            state.isError = true
        })


        builder.addCase(creatBooking.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(creatBooking.fulfilled, (state, action) => {
            state.isSuccess = true
        })
        builder.addCase(creatBooking.rejected, (state, action) => {
            state.isError = true
        })


        builder.addCase(deleteBooking.fulfilled, (state, action) => {
            const newList = state.roomTypes.filter((x) => x.id !== action.payload)
            state.roomTypes = newList
        })
    },
});

const { reducer } = bookingsSlice;
export default reducer;