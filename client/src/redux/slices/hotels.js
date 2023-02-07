import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
    hotels: []
};

export const getAllHotels = createAsyncThunk(
    "hotels/getAll",
    async () => {
        const { data } = await axios.get("http://localhost:3001/api/hotel")
        return data.hotels
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

export const deleteHotel = createAsyncThunk(
    "hotel/delete",
    async (id) => {
        await axios.delete(`http://localhost:3001/api/hotel/delete/${id}`, {
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

const hotelSlice = createSlice({
    name: "hotel",
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder.addCase(getAllHotels.fulfilled, (state, action) => {
            state.hotels = action.payload
        })

        builder.addCase(creatHotel.fulfilled, (state, action) => { })

        builder.addCase(deleteHotel.fulfilled, (state, action) => {
            state.hotels.splice(state.hotels.findIndex((arrow) => arrow.id === action.payload), 1);
        })
    },
});

const { reducer } = hotelSlice;
export default reducer;