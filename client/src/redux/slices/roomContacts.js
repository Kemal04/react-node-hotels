import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
    roomContacts: [],
    pages: {},
    isLoading: false,
    isError: false,
    isSuccess: false,
};


export const getAllRoomContacts = createAsyncThunk(
    "roomContacts/getAll",
    async (page) => {
        const { data } = await axios.get(`http://localhost:3001/api/roomContact`, {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            },
            params: {
                page: page

            }
        })
        const roomContacts = data.contacts;
        const pages = data.pagination.pages
        return { roomContacts: roomContacts, pages: pages };
    }
);

export const creatRoomContact = createAsyncThunk(
    "roomContact/create",
    async (contact) => {
        await axios.post("http://localhost:3001/api/roomContact/create", contact, {
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

export const updateRoomContact = createAsyncThunk(
    "roomContact/update",
    async (roomContact) => {
        await axios.post(`http://localhost:3001/api/roomContact/edit/${roomContact.id}`, roomContact, {
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

export const deleteRoomContact = createAsyncThunk(
    "roomContact/delete",
    async (id) => {
        const { data } = await axios.delete(`http://localhost:3001/api/roomContact/delete/${id}`)
        toast.success(data.success)
        return id
    }
);


const roomContactSlice = createSlice({
    name: "roomContact",
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder.addCase(getAllRoomContacts.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(getAllRoomContacts.fulfilled, (state, action) => {
            state.isLoading = false
            state.roomContacts = action.payload.roomContacts
            state.pages = action.payload.pages
        })
        builder.addCase(getAllRoomContacts.rejected, (state, action) => {
            state.isError = true
        })


        builder.addCase(creatRoomContact.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(creatRoomContact.fulfilled, (state, action) => {
            state.isSuccess = true
        })
        builder.addCase(creatRoomContact.rejected, (state, action) => {
            state.isError = true
        })


        builder.addCase(deleteRoomContact.fulfilled, (state, action) => {
            const newList = state.roomContacts.filter((x) => x.id !== action.payload)
            state.roomContacts = newList
        })


        builder.addCase(updateRoomContact.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(updateRoomContact.fulfilled, (state, action) => {
            state.isLoading = false
        })
        builder.addCase(updateRoomContact.rejected, (state, action) => {
            state.isError = true
        })

    },
});

const { reducer } = roomContactSlice;
export default reducer;