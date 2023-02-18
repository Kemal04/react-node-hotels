import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
    roomTypes: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
};

export const getAllRoomTypes = createAsyncThunk(
    "roomTypes/getAll",
    async () => {
        const { data } = await axios.get("http://localhost:3001/api/roomType")
        return data.roomTypes
    }
);

export const creatRoomType = createAsyncThunk(
    "roomType/create",
    async (roomType) => {
        await axios.post("http://localhost:3001/api/roomType/create", roomType, {
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

export const updateRoomType = createAsyncThunk(
    "roomType/update",
    async (roomType) => {
        await axios.post(`http://localhost:3001/api/roomType/edit/${roomType.id}`, roomType, {
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

export const deleteRoomType = createAsyncThunk(
    "roomType/delete",
    async (id) => {
        const { data } = await axios.delete(`http://localhost:3001/api/roomType/delete/${id}`, {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            },
        })
        toast.success(data.success)
        return id
    }
);

const roomTypeSlice = createSlice({
    name: "roomType",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllRoomTypes.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(getAllRoomTypes.fulfilled, (state, action) => {
            state.isLoading = false
            state.roomTypes = action.payload
        })
        builder.addCase(getAllRoomTypes.rejected, (state, action) => {
            state.isError = true
        })


        builder.addCase(creatRoomType.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(creatRoomType.fulfilled, (state, action) => {
            state.isSuccess = true
        })
        builder.addCase(creatRoomType.rejected, (state, action) => {
            state.isError = true
        })


        builder.addCase(updateRoomType.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(updateRoomType.fulfilled, (state, action) => {
            state.isLoading = false
        })
        builder.addCase(updateRoomType.rejected, (state, action) => {
            state.isError = true
        })


        builder.addCase(deleteRoomType.fulfilled, (state, action) => {
            const newList = state.roomTypes.filter((x) => x.id !== action.payload)
            state.roomTypes = newList
        })
    },
});

const { reducer } = roomTypeSlice;
export default reducer;