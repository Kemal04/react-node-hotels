import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
    hotels: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
};

export const getAllHotels = createAsyncThunk(
    "hotels/getAll",
    async () => {
        const { data } = await axios.get("http://localhost:3001/api/hotel")
        return data.hotels.docs
    }
);

export const creatHotel = createAsyncThunk(
    "hotel/create",
    async (hotel) => {
        await axios.post("http://localhost:3001/api/hotel/create", hotel, {
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

export const updateHotel = createAsyncThunk(
    "hotel/update",
    async (hotel) => {
        await axios.post(`http://localhost:3001/api/hotel/edit/${hotel.id}`, hotel, {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            },
        })
            .then((res) => {
                toast.success(res.data.success)
            }).catch((res) => {
                toast.error(res.response.data.error)
            });
    }
);


export const deleteHotel = createAsyncThunk(
    "hotel/delete",
    async (id) => {
        const { data } = await axios.delete(`http://localhost:3001/api/hotel/delete/${id}`, {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            },
        })
        toast.success(data.success)
        return id
    }
);

const hotelSlice = createSlice({
    name: "hotel",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllHotels.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(getAllHotels.fulfilled, (state, action) => {
            state.isLoading = false
            state.hotels = action.payload
        })
        builder.addCase(getAllHotels.rejected, (state, action) => {
            state.isError = true
        })


        builder.addCase(creatHotel.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(creatHotel.fulfilled, (state, action) => {
            state.isSuccess = true
        })
        builder.addCase(creatHotel.rejected, (state, action) => {
            state.isError = true
        })


        builder.addCase(updateHotel.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(updateHotel.fulfilled, (state, action) => {
            state.isLoading = false
        })
        builder.addCase(updateHotel.rejected, (state, action) => {
            state.isError = true
        })


        builder.addCase(deleteHotel.fulfilled, (state, action) => {
            const newList = state.hotels.filter((x) => x.id !== action.payload)
            state.hotels = newList
        })
    },
});

const { reducer } = hotelSlice;
export default reducer;