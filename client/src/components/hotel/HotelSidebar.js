import React, { useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { faBed, faBook, faComment } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import user_icon from "../../assets/icons/user-1.jpg"
import Api_Address from '../../env';

const HotelSidebar = () => {

    const { authState } = useContext(AuthContext)

    const id = authState.id;
    const [hotel, setHotel] = useState("");

    useEffect(() => {
        axios.get(`${Api_Address}/api/hotel/${id}`).then((res) => {
            setHotel(res.data.hotel);
        });
    }, [id]);

    return (
        <>
            <aside className="main-sidebar sidebar-dark-primary elevation-4">
                <div className="sidebar">
                    <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                        <div className="image">
                            <img src={user_icon} className="img-circle elevation-2" alt='user' />
                        </div>
                        <div className="info">
                            <NavLink to="/myhmanhana" className="d-block text-uppercase text-decoration-none">{hotel.name}</NavLink>
                        </div>
                    </div>

                    <div className="user-panel mt-3 pb-3 mb-3 d-flex align-items-center">
                        <div className="image">
                            <i className="fas fa-home text-white"></i>
                        </div>
                        <div className="info">
                            <NavLink to="/myhmanhana" className="d-block text-uppercase text-decoration-none">Esasy Sahypa</NavLink>
                        </div>
                    </div>

                    <nav className="mt-2">
                        <ul className="nav nav-pills nav-sidebar flex-column nav-treeview" data-widget="treeview" role="menu" data-accordion="false">
                            <li className="nav-item">
                                <NavLink to="/myhmanhana/otaglar" className="nav-link">
                                    <FontAwesomeIcon icon={faBed} className="nav-icon me-2" />
                                    <p>Otaglar</p>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/myhmanhana/bronlar" className="nav-link">
                                    <FontAwesomeIcon icon={faBook} className="nav-icon me-2" />
                                    <p>Bronlanan otaglar</p>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/myhmanhana/teswirler" className="nav-link">
                                    <FontAwesomeIcon icon={faComment} className="nav-icon me-2" />
                                    <p>Teswirler</p>
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
            </aside>
        </>
    )
}

export default HotelSidebar