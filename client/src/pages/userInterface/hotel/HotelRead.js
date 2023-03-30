import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import BannerImg from '../../../components/banner/BannerImg';
import { ThemeContext } from '../../../context/ThemeContext';
import Api_Address from '../../../env';

const HotelRead = () => {

    const { darkMode } = useContext(ThemeContext)

    const [hotel, setHotel] = useState("");
    const [rooms, setRooms] = useState([]);

    const { id } = useParams()

    const fetchData = async () => {
        try {
            const res = await axios.get(`${Api_Address}/api/hotel/${id}`)
            setHotel(res.data.hotel)
            setRooms(res.data.rooms)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchData()
    }, [])


    return (
        <>
            <BannerImg name={`${hotel.name} Otel`} />
            <div className={darkMode ? "bg-dark text-white" : "bg-white text-dark"}>
                <div className='container py-5'>
                    <div className='row'>
                        {
                            rooms.map((room, index) => (
                                index % 1 === 0
                                    ?
                                    <div className='col-xl-6' key={index}>
                                        <div className='card border-0 my-4' style={{ backgroundColor: "transparent", boxShadow: 'none' }}>
                                            <div className='row align-items-center'>
                                                <div className='col-xl-6'>
                                                    <img src={room.img ? `${Api_Address}/img/${room.img}` : '/img/cards/room/1.jpg'} alt="Room" className='img-fluid rounded-3' />
                                                </div>
                                                <div className='col-xl-6'>
                                                    <div className='h4 mt-3'>№ {room.roomNum}</div>
                                                    <div className='my-3'>
                                                        <span className='h4 text-blue'>{room.price} <small>TMT</small></span>
                                                        <span style={{ color: '#afb4bf' }}> / Gün</span>
                                                    </div>
                                                    <div className='row'>
                                                        <div className='col-xl-6 col-lg-6 col-md-6 col-6 d-flex flex-column mb-4 mt-4 h6'>
                                                            <span className='mb-2' style={{ color: '#afb4bf' }}>Meýdany:</span>
                                                            <span>{room.size} m<sup>2</sup></span>
                                                        </div>
                                                        <div className='col-xl-6 col-lg-6 col-md-6 col-6 d-flex flex-column mb-4 mt-4 h6'>
                                                            <span className='mb-2' style={{ color: '#afb4bf' }}>Adam sany:</span>
                                                            <span>Iň köp {room.capacity} adam</span>
                                                        </div>
                                                        <div className='col-xl-6 col-lg-6 col-md-6 col-6 d-flex flex-column mb-4 h6'>
                                                            <span className='mb-2' style={{ color: '#afb4bf' }}>Görnüşi:</span>
                                                            <span>"{room.roomtype.name}"</span>
                                                        </div>
                                                        <div className='col-xl-6 col-lg-6 col-md-6 col-6 d-flex flex-column mb-4 h6'>
                                                            <span className='mb-2' style={{ color: '#afb4bf' }}>Halandy:</span>
                                                            <span>{room.liked === null ? 0 : room.liked}</span>
                                                        </div>
                                                    </div>
                                                    <div className='mt-4'>
                                                        <Link to={`/otag/${room.id}`} className='text-blue text-decoration-none' style={{ fontWeight: "500" }}>Maglumatlary gör &rarr;</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <div className='col-xl-6' key={index}>
                                        <div className='card border-0 my-4' style={{ backgroundColor: "transparent", boxShadow: 'none' }}>
                                            <div className='row align-items-center'>
                                                <div className='col-xl-6'>
                                                    <div className='h4 mt-3'>№ {room.roomNum}</div>
                                                    <div className='my-3'>
                                                        <span className='h4 text-blue'>{room.price} <small>TMT</small></span>
                                                        <span style={{ color: '#afb4bf' }}> / Gün</span>
                                                    </div>
                                                    <div className='row'>
                                                        <div className='col-xl-6 col-lg-6 col-md-6 col-6 d-flex flex-column mb-4 mt-4 h6'>
                                                            <span className='mb-2' style={{ color: '#afb4bf' }}>Meýdany:</span>
                                                            <span>{room.size} m<sup>2</sup></span>
                                                        </div>
                                                        <div className='col-xl-6 col-lg-6 col-md-6 col-6 d-flex flex-column mb-4 mt-4 h6'>
                                                            <span className='mb-2' style={{ color: '#afb4bf' }}>Adam sany:</span>
                                                            <span>Iň köp {room.capacity} adam</span>
                                                        </div>
                                                        <div className='col-xl-6 col-lg-6 col-md-6 col-6 d-flex flex-column mb-4 h6'>
                                                            <span className='mb-2' style={{ color: '#afb4bf' }}>Görnüşi:</span>
                                                            <span>"{room.roomtype.name}"</span>
                                                        </div>
                                                        <div className='col-xl-6 col-lg-6 col-md-6 col-6 d-flex flex-column mb-4 h6'>
                                                            <span className='mb-2' style={{ color: '#afb4bf' }}>Halandy:</span>
                                                            <span>{room.liked === null ? 0 : room.liked}</span>
                                                        </div>
                                                    </div>
                                                    <div className='mt-4'>
                                                        <Link to={`/otag/${room.id}`} className='text-blue text-decoration-none' style={{ fontWeight: "500" }}>Maglumatlary gör &rarr;</Link>
                                                    </div>
                                                </div>
                                                <div className='col-xl-6'>
                                                    <img src={room.img ? `${Api_Address}/img/${room.img}` : '/img/cards/room/1.jpg'} alt="Room" className='img-fluid rounded-3' />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default HotelRead