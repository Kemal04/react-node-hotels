import React, { useEffect, useState } from 'react'
import axios from 'axios';

//ROUTER
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom'

//COMPONENTS
import { Navbar, Footer, AdminNavbar, AdminSidebar, HotelNavbar, HotelSidebar, ProfileNavbar } from "./components"

//USERINTERFACE
import { About, Contact, Home, Rooms, RoomRead, Register, Login, HotelRead } from "./pages/userInterface"

//ADMIN
import { Admin, AdminBannerCreate, AdminBannerEdit, AdminBanners, AdminBooking, AdminContactEdit, AdminContacts, AdminHotelEdit, AdminHotels, AdminHotelsCreate, AdminLogin, AdminRooms, AdminRoomTypeCreate, AdminRoomTypeEdit, AdminRoomTypes, AdminUsers } from "./pages/admin"

//HOTEL
import { HotelLogin, Hotel, HotelRooms, HotelRoomCreate, HotelRoomEdit, HotelBooking, HotelBookingEdit, HotelContacts, HotelContactEdit } from './pages/hotel';

//PROFILE
import { Profile, ProfileBooking, ProfileEdit, ProfileHistory } from './pages/profile';

//TOAST
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

//CONTEXT
import ThemeContextProvider from "./context/ThemeContext"
import { AuthContext } from './context/AuthContext';

//CSS
import './App.css'
import ScrollToTop from './components/scroll/ScrollToTop';

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
        }).then((res) => {
            if (res.data.error) {
                setAuthState({ ...authState, status: false, role: "User" });
            } else {
                setAuthState({
                    phoneNum: res.data.phoneNum,
                    id: res.data.id,
                    status: true,
                    role: res.data.role,
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
                        <ScrollToTop />
                        <Routes>

                            <Route path="/" element={<WithNavbar />}>
                                <Route path='/' element={<Home />}></Route>
                                <Route path='/biz-barada' element={<About />}></Route>
                                <Route path='/habarlasmak' element={<Contact />}></Route>

                                <Route path='/otaglar' element={<Rooms />}></Route>
                                <Route path='/otag/:id' element={<RoomRead />}></Route>

                                <Route path='/hotel/:id' element={<HotelRead />}></Route>

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
                                            <Route path='/admin/teswir-uytgetmek/:id' element={<AdminContactEdit />}></Route>

                                            <Route path='/admin/hotellar' element={<AdminHotels />}></Route>
                                            <Route path='/admin/hotel-gosmak' element={<AdminHotelsCreate />}></Route>
                                            <Route path='/admin/hotel-uytgetmek/:id' element={<AdminHotelEdit />}></Route>

                                            <Route path='/admin/bannerler' element={<AdminBanners />}></Route>
                                            <Route path='/admin/banner-gosmak' element={<AdminBannerCreate />}></Route>
                                            <Route path='/admin/banner-uytgetmek/:id' element={<AdminBannerEdit />}></Route>

                                            <Route path='/admin/otaglar' element={<AdminRooms />}></Route>

                                            <Route path='/admin/otag-gornusleri' element={<AdminRoomTypes />}></Route>
                                            <Route path='/admin/otag-gornusini-gosmak' element={<AdminRoomTypeCreate />}></Route>
                                            <Route path='/admin/otag-gornusini-uytgetmek/:id' element={<AdminRoomTypeEdit />}></Route>

                                            <Route path='/admin/bronlanan-otaglar' element={<AdminBooking />}></Route>
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

                                            <Route path='/hotel/bronlar' element={<HotelBooking />}></Route>
                                            <Route path='/hotel/bron-uytgetmek/:id' element={<HotelBookingEdit />}></Route>

                                            <Route path='/hotel/teswirler' element={<HotelContacts />}></Route>
                                            <Route path='/hotel/teswir-uytgetmek/:id' element={<HotelContactEdit />}></Route>
                                        </>
                                    )
                                }
                            </Route>

                            <Route path="/" element={<ProfilWithNavbar />}>
                                {
                                    authState.status && (
                                        <>
                                            <Route path='/ulanyjy-profili/:id' element={<Profile />}></Route >
                                            <Route path='/ulanyjy-profili-uytget/:id' element={<ProfileEdit />}></Route >
                                            <Route path='/ulanyjy-profili/bronlarym/:id' element={<ProfileBooking />}></Route>
                                            <Route path='/ulanyjy-profili/onki-bronlarym/:id' element={<ProfileHistory />}></Route>
                                        </>
                                    )
                                }
                            </Route>

                            <Route path='/admin/giris-etmek' element={<AdminLogin />}></Route>
                            <Route path='/hotel/giris-etmek' element={<HotelLogin />}></Route>

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

const ProfilWithNavbar = () => {
    return (
        <>
            <ProfileNavbar />
            <Outlet />
        </>
    );
}

export default App