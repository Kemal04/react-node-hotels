import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { ThemeContext } from '../../../context/ThemeContext';

import user_icon from "../../../assets/icons/user-1.jpg"
import Api_Address from '../../../env';
import moment from 'moment';

const ProfileHistory = () => {

    const { darkMode } = useContext(ThemeContext)

    let { id } = useParams();
    const [user, setUser] = useState("");

    useEffect(() => {
        axios.get(`${Api_Address}/api/user/${id}`).then((res) => {
            setUser(res.data.user);
        });
    }, [id]);


    const [booking, setBooking] = useState([]);

    useEffect(() => {
        const fetchBooking = async () => {
            try {
                const res = await axios.get(`${Api_Address}/api/booking/user`, {
                    headers: {
                        accessToken: localStorage.getItem("accessToken"),
                    },
                })
                setBooking(res.data.booking)
            } catch (err) {
                console.log(err)
            }
        }
        fetchBooking()
    }, [id])

    let newDate = new Date()

    return (
        <div className={darkMode ? "bg-dark" : "bg-white"}>
            <div className='banner-fixed d-flex align-items-center'>
                <div className='container'>
                    <div className='row'>

                    </div>
                </div>
            </div>
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
                                <div className="col-lg-12">
                                    <div className='row'>
                                        {booking.sort((a, b) => a.timeM > b.timeM ? 1 : -1).map((room, index) => (
                                            room.check
                                                ?
                                                moment(room.checkOut).format("DD-MM-YYYY") >= moment(newDate).format("DD-MM-YYYY")
                                                    ?
                                                    <div key={index} className='col-lg-4'>
                                                        <div className={`card mb-5 border-0 shadow rounded-0 me-3 ${darkMode ? "bg-dark shadow-lg" : "bg-white shadow"}`}>
                                                            <img src={`${Api_Address}/img/${room.room.img}`} className="img-fluid" alt={room.room.roomNum} />
                                                            <div className="card-body">
                                                                <div className='d-flex justify-content-between'>
                                                                    <h5 className="card-title">№ {room.room.roomNum} otag</h5>
                                                                </div>
                                                                <p className="card-text text-danger mb-4">
                                                                    <span className='h4'>{room.room.price}<sup>TMT</sup></span>
                                                                    <span className='h6 small' style={{ fontWeight: "500", color: "#afb4bf" }}> / Günlük</span>
                                                                </p>
                                                                <div className='row justify-content-between align-items-center mb-4'>
                                                                    <div className='col-lg-6'>
                                                                        <div style={{ fontWeight: "500", color: "#afb4bf" }}>Meýdany:</div>
                                                                        <div>{room.room.size} m<sup>2</sup></div>
                                                                    </div>
                                                                    <div className='col-lg-6 text-end'>
                                                                        <div style={{ fontWeight: "500", color: "#afb4bf" }}>Adam sany:</div>
                                                                        <div>{room.room.capacity} adam</div>
                                                                    </div>
                                                                </div>
                                                                <div className='row justify-content-between align-items-center mb-4'>
                                                                    <div className='col-lg-6'>
                                                                        <div style={{ fontWeight: "500", color: "#afb4bf" }}>Gornusi:</div>
                                                                        <div> "Standart"</div>
                                                                    </div>
                                                                    <div className='col-lg-6 text-end'>
                                                                        <div style={{ fontWeight: "500", color: "#afb4bf" }}>Halandy:</div>
                                                                        <div> 21</div>
                                                                    </div>
                                                                </div>
                                                                <div className='row justify-content-between align-items-center mb-5'>
                                                                    <div className='col-lg-6'>
                                                                        <div style={{ fontWeight: "500", color: "#afb4bf" }}>Giriş wagtyň:</div>
                                                                        {moment(room.checkIn).format("DD-MM-YYYY")}
                                                                    </div>
                                                                    <div className='col-lg-6 text-end'>
                                                                        <div style={{ fontWeight: "500", color: "#afb4bf" }}>Çykyş wagtyň:</div>
                                                                        {moment(room.checkOut).format("DD-MM-YYYY")}
                                                                    </div>
                                                                    <div className='col-lg-12 mt-3'>
                                                                        <div style={{ fontWeight: "500", color: "#afb4bf" }}>Telefon belgisi:</div>
                                                                        <div>+993 {room.phoneNum}</div>
                                                                    </div>
                                                                </div>

                                                                <div className='d-grid'>
                                                                    <div className='btn btn-sm btn-danger disabled'>Bronlanan wagty gecdi</div>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                    :
                                                    null
                                                :
                                                null
                                        ))}
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

export default ProfileHistory