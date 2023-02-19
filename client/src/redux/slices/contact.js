import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
    contacts: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
};

export const getAllContacts = createAsyncThunk(
    "contacts/getAll",
    async () => {
        const { data } = await axios.get("http://localhost:3001/api/contact")
        return data.contacts;
    }
);

export const getCreatContact = createAsyncThunk(
    "contact/getCreate",
    async () => {
        const { data } = await axios.get("http://localhost:3001/api/contact/create")
        return data.csrfToken
    }
);

export const creatContact = createAsyncThunk(
    "contact/create",
    async ({ contact, csrfToken }) => {
        await axios.post("http://localhost:3001/api/contact/create", { contact, csrfToken }, {
            headers: {
                'CSRF-Token': csrfToken
            },
        })
            .then((res) => {
                toast.success(res.data.success)
            }).catch((res) => {
                toast.error(res.response.data.error)
            });
    }
);

export const updateContact = createAsyncThunk(
    "contact/update",
    async (contact) => {
        await axios.post(`http://localhost:3001/api/contact/edit/${contact.id}`, contact, {
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

export const deleteContact = createAsyncThunk(
    "contact/delete",
    async (id) => {
        const { data } = await axios.delete(`http://localhost:3001/api/contact/delete/${id}`)
        toast.success(data.success)
        return id
    }
);


const contactSlice = createSlice({
    name: "contact",
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder.addCase(getAllContacts.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(getAllContacts.fulfilled, (state, action) => {
            state.isLoading = false
            state.contacts = action.payload
        })
        builder.addCase(getAllContacts.rejected, (state, action) => {
            state.isError = true
        })


        builder.addCase(getCreatContact.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(getCreatContact.fulfilled, (state, action) => {
            state.isLoading = false
            state.contacts = action.payload
        })
        builder.addCase(getCreatContact.rejected, (state, action) => {
            state.isError = true
        })

        builder.addCase(creatContact.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(creatContact.fulfilled, (state, action) => {
            state.isSuccess = true
        })
        builder.addCase(creatContact.rejected, (state, action) => {
            state.isError = true
        })


        builder.addCase(deleteContact.fulfilled, (state, action) => {
            const newList = state.contacts.filter((x) => x.id !== action.payload)
            state.contacts = newList
        })


        builder.addCase(updateContact.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(updateContact.fulfilled, (state, action) => {
            state.isLoading = false
        })
        builder.addCase(updateContact.rejected, (state, action) => {
            state.isError = true
        })

    },
});

const { reducer } = contactSlice;
export default reducer;