import React, { useEffect, useState } from 'react'
import axios from 'axios';

//ROUTER
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom'

//COMPONENTS
import { Navbar, Footer, AdminNavbar, AdminSidebar, HotelNavbar, HotelSidebar
 } from "./components"

//USERINTERFACE
import { About, Contact, Home, Rooms, RoomRead, Register, Login } from "./pages/userInterface"

//USERINTERFACE
import { Admin, AdminBooking, AdminBookingEdit, AdminContactEdit, AdminContacts, AdminHotels, AdminHotelsCreate, AdminLogin, AdminRoomEdit, AdminRooms, AdminRoomTypeCreate, AdminRoomTypeEdit, AdminRoomTypes, AdminUsers } from "./pages/admin"

//ERROR
import { Forbiden, NotFounded } from './pages/error';

//ERROR
import { HotelLogin, Hotel, HotelRooms, HotelRoomCreate, HotelRoomEdit } from './pages/hotel';

//TOAST
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

//CONTEXT
import ThemeContextProvider from "./context/ThemeContext"
import { AuthContext } from './context/AuthContext';

//CSS
import './App.css'

const App = () => {

    const [authState, setAuthState] = useState({
        phoneNum: "",
        id: 0,
        status: false,
        role: "User",
    });

    useEffect(() => {
        axios.get("http://localhost:3001/api/auth/auth", {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            },
        }).then((response) => {
            if (response.data.error) {
                setAuthState({ ...authState, status: false, role: "User" });
            } else {
                setAuthState({
                    phoneNum: response.data.phoneNum,
                    id: response.data.id,
                    status: true,
                    role: response.data.role,
                });
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <AuthContext.Provider value={{ authState, setAuthState }}>
                <ThemeContextProvider>
                    <Router>
                        <ToastContainer />
                        <Routes>

                            <Route path="/" element={<WithNavbar />}>
                                <Route path='/' element={<Home />}></Route>
                                <Route path='/biz-barada' element={<About />}></Route>
                                <Route path='/habarlasmak' element={<Contact />}></Route>

                                <Route path='/otaglar' element={<Rooms />}></Route>
                                <Route path='/otag/:id' element={<RoomRead />}></Route>

                                {
                                    !authState.status && (
                                        <>
                                            <Route path='/hasaba-durmak' element={<Register />}></Route>
                                            <Route path='/giris-etmek' element={<Login />}></Route>
                                        </>
                                    )

                                }
                            </Route>

                            <Route path="/" element={<AdminWithNavbar />}>
                                {
                                    authState.role === "Admin" && (
                                        <>
                                            <Route path='/admin' element={<Admin />}></Route>
                                            <Route path='/admin/ulanyjylar' element={<AdminUsers />}></Route>

                                            <Route path='/admin/teswirler' element={<AdminContacts />}></Route>
                                            <Route path='/admin/teswir-uytget/:id' element={<AdminContactEdit />}></Route>

                                            <Route path='/admin/hotellar' element={<AdminHotels />}></Route>
                                            <Route path='/admin/hotel-gosmak' element={<AdminHotelsCreate />}></Route>

                                            <Route path='/admin/otaglar' element={<AdminRooms />}></Route>
                                            <Route path='/admin/otag-uytget/:id' element={<AdminRoomEdit />}></Route>

                                            <Route path='/admin/otag-gornusleri' element={<AdminRoomTypes />}></Route>
                                            <Route path='/admin/otag-gornusini-gosmak' element={<AdminRoomTypeCreate />}></Route>
                                            <Route path='/admin/otag-gornusini-uytget/:id' element={<AdminRoomTypeEdit />}></Route>

                                            <Route path='/admin/bronlanan-otaglar' element={<AdminBooking />}></Route>
                                            <Route path='/admin/bronlanan-otaglary-uytget/:id' element={<AdminBookingEdit />}></Route>
                                        </>
                                    )
                                }
                            </Route>

                            <Route path="/" element={<HotelWithNavbar />}>
                                {
                                    authState.role === "Hotel" && (
                                        <>
                                            <Route path='/hotel' element={<Hotel />}></Route>
                                            <Route path='/hotel/otaglar' element={<HotelRooms />}></Route>
                                            <Route path='/hotel/otag-gosmak' element={<HotelRoomCreate />}></Route>
                                            <Route path='/hotel/otag-uytgetmek/:id' element={<HotelRoomEdit />}></Route>
                                        </>
                                    )
                                }
                            </Route>

                            <Route path='/admin/giris-etmek' element={<AdminLogin />}></Route>
                            <Route path='/hotel/giris-etmek' element={<HotelLogin />}></Route>

                            <Route path='/*' element={<NotFounded />}></Route>
                            <Route path='/404' element={<NotFounded />}></Route>
                            <Route path='/403' element={<Forbiden />}></Route>

                        </Routes>
                    </Router>
                </ThemeContextProvider>
            </AuthContext.Provider>
        </>
    )
}


const WithNavbar = () => {
    return (
        <>
            <Navbar />

            <Outlet />

            <Footer />
        </>
    );
}

const AdminWithNavbar = () => {
    return (
        <div className="hold-transition sidebar-mini layout-fixed">
            <div className="wrapper">
                <AdminNavbar />
                <AdminSidebar />
                <div className="content-wrapper" style={{ paddingTop: "70px" }}>
                    <div className='content'>
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
}

const HotelWithNavbar = () => {
    return (
        <div className="hold-transition sidebar-mini layout-fixed">
            <div className="wrapper">
                <HotelNavbar />
                <HotelSidebar />
                <div className="content-wrapper" style={{ paddingTop: "70px" }}>
                    <div className='content'>
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App