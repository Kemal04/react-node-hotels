import React, { useEffect, useState } from 'react'
import axios from 'axios';

//ROUTER
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom'

//COMPONENTS
import { Navbar, Footer } from "./components"

//USERINTERFACE
import { About, Contact, Home, Rooms, RoomRead, Register, Login } from "./pages/userInterface"

//USERINTERFACE
import { AdminLogin } from "./pages/admin"

//ERROR
import { Forbiden, NotFounded } from './pages/error';

//TOAST
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

//CONTEXT
import ThemeContextProvider from "./context/ThemeContext"
import { AuthContext } from './context/AuthContext';

const App = () => {

    const [authState, setAuthState] = useState({
        phoneNum: "",
        id: 0,
        status: false,
        role: "User",
    });
    console.log(authState);

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

                            <Route path='/admin/giris-etmek' element={<AdminLogin />}></Route>

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

export default App