import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
    hotelRooms: [],
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
        await axios.delete(`http://localhost:3001/api/hotelRoom/delete/${id}`, {
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


const hotelRoomsSlice = createSlice({
    name: "hotelRoom",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllHotelRooms.fulfilled, (state, action) => {
            state.hotelRooms = action.payload
        })

        builder.addCase(creatHotelRoom.fulfilled, (state, action) => { })

        builder.addCase(deleteHotelRoom.fulfilled, (state, action) => {
            state.hotelRooms.splice(state.hotelRooms.findIndex((arrow) => arrow.id === action.payload), 1);
        })
    },
});

const { reducer } = hotelRoomsSlice;
export default reducer;