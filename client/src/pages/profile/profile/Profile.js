import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { ThemeContext } from '../../../context/ThemeContext';

import user_icon from "../../../assets/icons/user-1.jpg"
import Api_Address from '../../../env';

const Profile = () => {

    const { darkMode } = useContext(ThemeContext)

    let { id } = useParams();
    const [user, setUser] = useState("");

    useEffect(() => {
        axios.get(`${Api_Address}/api/user/${id}`).then((res) => {
            setUser(res.data.user);
        });
    }, [id]);

    return (
        <div className={darkMode ? "bg-dark" : "bg-white"}>
            <div className='banner-fixed d-flex align-items-center'></div>
            <div className='container-fluid' style={{ marginTop: "-50px" }}>
                <div className='row justify-content-center'>
                    <div className='w-75'>
                        <div className={`card border-0 px-5 ${darkMode ? "bg-dark shadow-lg" : "bg-white shadow"}`}>
                            <div className='d-flex justify-content-center'>
                                <img src={user_icon} alt="" className='rounded-circle' style={{ width: "150px", marginTop: "-70px" }} />
                            </div>
                            <div className='mt-4 h2 text-center'>
                                {user.name}
                            </div>
                            <div className='mt-1 small text-center'>
                                {user.email}
                            </div>
                            <div className='row justify-content-center mt-4 mb-5'>
                                <div className='w-50'>
                                    <div className="card-body">
                                        <div className="row justify-content-between">
                                            <div className="col-sm-4">
                                                <h6 className="mb-0">Doly Adym</h6>
                                            </div>
                                            <div className={`col-sm-8 ${darkMode ? "text-white" : "text-secondary"}`}>
                                                {user.username}
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row justify-content-between">
                                            <div className="col-sm-4">
                                                <h6 className="mb-0">Familýam</h6>
                                            </div>
                                            <div className={`col-sm-8 ${darkMode ? "text-white" : "text-secondary"}`}>

                                                {user.surname}
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row justify-content-between">
                                            <div className="col-sm-4">
                                                <h6 className="mb-0">E-mail adresim</h6>
                                            </div>
                                            <div className={`col-sm-8 ${darkMode ? "text-white" : "text-secondary"}`}>
                                                {user.email}
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row justify-content-between">
                                            <div className="col-sm-4">
                                                <h6 className="mb-0">Telefon belgim</h6>
                                            </div>
                                            <div className={`col-sm-8 ${darkMode ? "text-white" : "text-secondary"}`}>
                                                +993 {user.phoneNum}
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row justify-content-between">
                                            <div className="col-sm-4">
                                                <h6 className="mb-0">Adresim</h6>
                                            </div>
                                            <div className={`col-sm-8 ${darkMode ? "text-white" : "text-secondary"}`}>
                                                {user.address}
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row mt-5">
                                            <div className="col-sm-12 d-grid">
                                                <Link to={`/ulanyjy-profili-uytget/${user.id}`} className="btn btn-primary">Maglumatlary düzeltmek</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile