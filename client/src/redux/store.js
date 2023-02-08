import { configureStore } from '@reduxjs/toolkit'
import contactsReducer from './slices/contact';
import usersReducer from './slices/users';
import roomTypesReducer from './slices/roomTypes';
import roomsReducer from './slices/rooms';
import bookingsReducer from './slices/bookings';
import hotelsReducer from './slices/hotels';
import hotelRoomsReducer from './slices/hotelRooms';

const reducer = {
    contacts: contactsReducer,
    users: usersReducer,
    roomTypes: roomTypesReducer,
    rooms: roomsReducer,
    bookings: bookingsReducer,
    hotels: hotelsReducer,
    hotelRooms: hotelRoomsReducer,
}

const store = configureStore({
    reducer: reducer,
    devTools: true,
})

export default store;