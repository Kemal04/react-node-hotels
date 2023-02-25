import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

const HotelRead = () => {

    const [hotel, setHotel] = useState("");
    const [rooms, setRooms] = useState([]);

    const location = useLocation();
    const hotelId = location.pathname.split("/")[2];

    useEffect(() => {
        axios.get(`http://localhost:3001/api/hotel/${hotelId}`)
            .then((res) => {
                setHotel(res.data.hotel)
                setRooms(res.data.rooms)
            })
    }, [hotelId])

    return (
        <div>HotelRead</div>
    )
}

export default HotelRead