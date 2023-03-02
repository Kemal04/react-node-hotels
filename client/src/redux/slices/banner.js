import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
    banners: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
};

export const getAllBanners = createAsyncThunk(
    "banners/getAll",
    async () => {
        const { data } = await axios.get("http://localhost:3001/api/banner")
        return data.banners
    }
);

export const creatBanner = createAsyncThunk(
    "banner/create",
    async (formData) => {
        await axios.post("http://localhost:3001/api/banner/create", formData, {
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

export const updateBanner = createAsyncThunk(
    "banner/update",
    async (banner) => {
        await axios.post(`http://localhost:3001/api/banner/edit/${banner.id}`, banner, {
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


export const deleteBanner = createAsyncThunk(
    "banner/delete",
    async (id) => {
        const { data } = await axios.delete(`http://localhost:3001/api/banner/delete/${id}`, {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            },
        })
        toast.success(data.success)
        return id
    }
);

const bannerSlice = createSlice({
    name: "banner",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllBanners.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(getAllBanners.fulfilled, (state, action) => {
            state.isLoading = false
            state.banners = action.payload
        })
        builder.addCase(getAllBanners.rejected, (state, action) => {
            state.isError = true
        })


        builder.addCase(creatBanner.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(creatBanner.fulfilled, (state, action) => {
            state.isSuccess = true
        })
        builder.addCase(creatBanner.rejected, (state, action) => {
            state.isError = true
        })


        builder.addCase(updateBanner.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(updateBanner.fulfilled, (state, action) => {
            state.isLoading = false
        })
        builder.addCase(updateBanner.rejected, (state, action) => {
            state.isError = true
        })


        builder.addCase(deleteBanner.fulfilled, (state, action) => {
            const newList = state.banners.filter((x) => x.id !== action.payload)
            state.banners = newList
        })
    },
});

const { reducer } = bannerSlice;
export default reducer;