import React, { useContext, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import './navbar.css'
import { ThemeContext } from '../../context/ThemeContext';
import { AuthContext } from '../../context/AuthContext';
import Search from '../search/Search';

import tm_icon from "../../assets/icons/lang/tm.png";
import ru_icon from "../../assets/icons/lang/ru.png";
import en_icon from "../../assets/icons/lang/en.png";
import moon from "../../assets/icons/moon.png"
import sun from "../../assets/icons/sun.png"

const Navbar = () => {

    const { authState, setAuthState } = useContext(AuthContext)

    const { darkMode, toggleDarkMode } = useContext(ThemeContext)

    const darkModeClick = () => {
        toggleDarkMode();
    }

    const logout = () => {
        localStorage.removeItem("accessToken");
        setAuthState({ phoneNum: "", id: 0, status: false, role: "User" })
    };

    return (
        <>
            <div className='py-2 text-white border-bottom' style={darkMode ? { backgroundColor: "#212529" } : { backgroundColor: "#0e2737" }}>
                <div className='container'>
                    <div className='row'>
                        <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12'>
                            <div className='row align-items-center'>
                                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 small'>
                                    499401, 499402, 499403
                                </div>
                                <div className='col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 small '>
                                    it@sanly.tm
                                </div>
                            </div>
                        </div>
                        <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 text-end d-xl-block d-lg-block d-md-block d-sm-none d-none'>
                            <Link to="/" className='px-3'>
                                <img src={tm_icon} alt="Icon" style={{ width: "25px", height: "25px", objectFit: "cover" }} />
                            </Link>
                            <Link to="/" className='px-3'>
                                <img src={ru_icon} alt="Icon" style={{ width: "25px", height: "25px", objectFit: "cover" }} />
                            </Link>
                            <Link to="/" className='px-3'>
                                <img src={en_icon} alt="Icon" style={{ width: "25px", height: "25px", objectFit: "cover" }} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <nav className={darkMode ? "navbar navbar-dark navbar-expand-lg bg-dark py-0" : "navbar navbar-expand-lg bg-light py-0"}>
                <div className="container">

                    {/* LOGO */}
                    <Link to="/" className="navbar-brand">Logo</Link>

                    {/* RESPONSOVE BUTTON */}
                    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* NAVBAR */}
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item mx-xl-2 mx-lg-2 mx-md-2 mx-sm-0 mx-0" style={{ fontSize: "17px" }}>
                                <NavLink style={({ isActive }) => ({ color: isActive ? "active" : null })} to="/" className="nav-link fw-bold">Baş sahypa</NavLink>
                            </li>
                            <li className="nav-item mx-xl-2 mx-lg-2 mx-md-2 mx-sm-0 mx-0" style={{ fontSize: "17px" }}>
                                <NavLink to="/otaglar" className="nav-link fw-bold">Otaglar</NavLink>
                            </li>
                            <li className="nav-item mx-xl-2 mx-lg-2 mx-md-2 mx-sm-0 mx-0" style={{ fontSize: "17px" }}>
                                <NavLink to="/biz-barada" className="nav-link fw-bold">Biz barada</NavLink>
                            </li>
                            <li className="nav-item mx-xl-2 mx-lg-2 mx-md-2 mx-sm-0 mx-0" style={{ fontSize: "17px" }}>
                                <NavLink to="/habarlasmak" className="nav-link fw-bold">Habarlaşmak</NavLink>
                            </li>
                            <li className="nav-item mx-xl-2 mx-lg-2 mx-md-2 mx-sm-0 mx-0" style={{ fontSize: "17px" }}>
                                <button onClick={darkModeClick} className={darkMode ? "nav-link border-0 bg-dark" : "nav-link border-0 bg-light"}>
                                    {
                                        darkMode ?
                                            <img src={sun} alt="Sun" style={{ width: "20px", }} />
                                            :
                                            <img src={moon} alt="Moon" style={{ width: "20px" }} />
                                    }
                                </button>
                            </li>
                            <li className="nav-item mx-xl-2 pe-3 pt-1 mx-lg-2 mx-md-2 mx-sm-0 mx-0" style={{ fontSize: "17px" }}>
                                <Search />
                            </li>
                        </ul>
                        <form className="d-flex">
                            {
                                !authState.status
                                    ?
                                    <Link to="/giris-etmek" className="btn btn-primary py-4 fw-bold px-5" style={{ letterSpacing: "1px" }} type="submit">Giriş</Link>
                                    :
                                    <div className="navbar-nav ms-5">
                                        <li className="nav-item dropdown">
                                            <div className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ letterSpacing: "1px" }}>
                                                Şahsy Otag
                                            </div>
                                            <ul className="dropdown-menu rounded-0">
                                                {
                                                    authState.role === "Admin" && <li><NavLink to="/admin" className="dropdown-item bg-white text-black">Admin</NavLink></li>
                                                }
                                                {
                                                    authState.role === "Hotel" && <li><NavLink to="/hotel" className="dropdown-item bg-white text-black">Hotel</NavLink></li>
                                                }
                                                {
                                                    authState.role === "User" && <li><NavLink to={`/ulanyjy-profili/${authState.id}`} className="dropdown-item bg-white text-black">Şahsy Otagym</NavLink></li>
                                                }
                                                <li><hr className="dropdown-divider" /></li>
                                                <li><button onClick={logout} className="dropdown-item bg-white text-black">Ulgamdan çyk</button></li>
                                            </ul>
                                        </li>
                                    </div>
                            }
                        </form>
                    </div>

                    {/* SIDEBAR */}
                    <div className="offcanvas offcanvas-start" style={{ width: "250px" }} data-bs-scroll="true" tabIndex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
                        <div className="offcanvas-header flex-column align-items-start p-0">

                            <div className='d-flex align-items-center justify-content-between p-3'>
                                <h5 className="offcanvas-title me-5 pe-5" id="offcanvasWithBothOptionsLabel">Logo</h5>
                                <button type="button" className="btn-close ms-4" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                            </div>

                            <div className="d-flex flex-column mt-3">
                                <ul className="navbar-nav p-3">
                                    <li className="nav-item mx-xl-2 mx-lg-2 mx-md-2 mx-sm-0 mx-0" style={{ fontSize: "17px" }}>
                                        <NavLink style={({ isActive }) => ({ color: isActive ? "active" : null })} to="/" className="nav-link fw-bold">Baş sahypa</NavLink>
                                    </li>
                                    <li className="nav-item mx-xl-2 mx-lg-2 mx-md-2 mx-sm-0 mx-0" style={{ fontSize: "17px" }}>
                                        <NavLink to="/otaglar" className="nav-link fw-bold">Otaglar</NavLink>
                                    </li>
                                    <li className="nav-item mx-xl-2 mx-lg-2 mx-md-2 mx-sm-0 mx-0" style={{ fontSize: "17px" }}>
                                        <NavLink to="/biz-barada" className="nav-link fw-bold">Biz barada</NavLink>
                                    </li>
                                    <li className="nav-item mx-xl-2 mx-lg-2 mx-md-2 mx-sm-0 mx-0" style={{ fontSize: "17px" }}>
                                        <NavLink to="/habarlasmak" className="nav-link fw-bold">Habarlaşmak</NavLink>
                                    </li>
                                    <li className="nav-item mx-xl-2 mx-lg-2 mx-md-2 mx-sm-0 mx-0" style={{ fontSize: "17px" }}>
                                        <button onClick={darkModeClick} className={darkMode ? "nav-link border-0 bg-dark" : "nav-link border-0 bg-light"}>
                                            {
                                                darkMode ?
                                                    <img src={sun} alt="Sun" style={{ width: "20px", }} />
                                                    :
                                                    <img src={moon} alt="Moon" style={{ width: "20px" }} />
                                            }
                                        </button>
                                    </li>
                                    <li className="nav-item mx-xl-2 pe-3 pt-1 mx-lg-2 mx-md-2 mx-sm-0 mx-0 mb-4" style={{ fontSize: "17px" }}>
                                        <Search />
                                    </li>
                                </ul>
                                <form className="d-flex position-absolute bottom-0 justify-content-center">
                                    {
                                        !authState.status
                                            ?
                                            <Link to="/giris-etmek" className="btn btn-primary py-4 fw-bold" style={{ letterSpacing: "1px", paddingLeft: "102px", paddingRight: "103px" }} type="submit">Giriş</Link>
                                            :
                                            <div className="navbar-nav ms-5">
                                                <li className="nav-item dropdown">
                                                    <div className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ letterSpacing: "1px" }}>
                                                        Şahsy Otag
                                                    </div>
                                                    <ul className="dropdown-menu rounded-0">
                                                        {
                                                            authState.role === "Admin" && <li><NavLink to="/admin" className="dropdown-item bg-white text-black">Admin</NavLink></li>
                                                        }
                                                        {
                                                            authState.role === "Hotel" && <li><NavLink to="/hotel" className="dropdown-item bg-white text-black">Hotel</NavLink></li>
                                                        }
                                                        {
                                                            authState.role === "User" && <li><NavLink to={`/ulanyjy-profili/${authState.id}`} className="dropdown-item bg-white text-black">Şahsy Otagym</NavLink></li>
                                                        }
                                                        <li><hr className="dropdown-divider" /></li>
                                                        <li><button onClick={logout} className="dropdown-item bg-white text-black">Ulgamdan çyk</button></li>
                                                    </ul>
                                                </li>
                                            </div>
                                    }
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </nav>
        </>
    )
}

export default Navbar