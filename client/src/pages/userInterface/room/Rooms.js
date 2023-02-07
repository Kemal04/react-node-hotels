import React, { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../../../context/ThemeContext'
import BannerImg from "../../../components/banner/BannerImg"
import { Link } from 'react-router-dom'
import Filter from '../../../components/filter/Filter'
import { useDispatch, useSelector } from 'react-redux';
import { getAllRoomTypes } from '../../../redux/slices/roomTypes'
import { getAllRooms } from '../../../redux/slices/rooms'

const Rooms = () => {

    const { darkMode } = useContext(ThemeContext)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllRoomTypes())
    }, [dispatch])

    const { rooms } = useSelector(state => state.rooms)
    useEffect(() => {
        dispatch(getAllRooms())
    }, [dispatch])

    const [room, setRoom] = useState(rooms)
    useEffect(() => {
        setRoom(rooms);
    }, [rooms]);

    function onSelectionChange(e) {
        const sortDirection = e.target.value;

        const roomsSort = [...rooms];

        roomsSort.sort((a, b) => {
            return sortDirection === "asc" ? a.id - b.id : null
        });
        roomsSort.sort((a, b) => {
            return sortDirection === "desc" ? b.id - a.id : null
        });
        roomsSort.sort((a, b) => {
            return sortDirection === "expensive" ? b.price - a.price : null
        });
        roomsSort.sort((a, b) => {
            return sortDirection === "cheap" ? a.price - b.price : null
        });
        roomsSort.sort((a, b) => {
            return sortDirection === "manyUser" ? b.capacity - a.capacity : null
        });
        roomsSort.sort((a, b) => {
            return sortDirection === "fewUser" ? a.capacity - b.capacity : null
        });
        setRoom(roomsSort)
    }

    return (
        <>
            <BannerImg name="Otaglar" />
            <div className={darkMode ? "bg-dark text-white" : "bg-white text-dark"}>
                <div className='container py-5'>
                    <div className='row align-items-start justify-content-center'>
                        <div className='col-xl-2'>
                            <Filter />
                        </div>

                        <div className='col-xl-8 mb-3'>
                            <div className='row justify-content-end text-end mt-4'>
                                <div className='col-xl-3'>
                                    <label htmlFor="exampleFormControlInput1" className="form-label">Sort</label>
                                    <select className="form-select rounded-0" onChange={onSelectionChange}>
                                        <option value="asc">Koneler</option>
                                        <option value="desc">Tazeler</option>
                                        <option value="expensive">Gymmatlar</option>
                                        <option value="cheap">Arzanlar</option>
                                        <option value="manyUser">Kop Adamly</option>
                                        <option value="fewUser">Az Adamly</option>
                                    </select>
                                </div>
                            </div>
                            <div className='row'>
                                {

                                    room.map((room, index) => (
                                        <div className='col-xl-12' key={index}>
                                            <div className='card border-0 my-4' style={{ backgroundColor: "transparent", boxShadow: 'none' }}>
                                                <div className='row align-items-center'>
                                                    <div className='col-xl-6'>
                                                        <img src={room.img ? `http://localhost:3001/img/${room.img}` : '/img/cards/room/1.jpg'} alt="Room" className='img-fluid rounded-3' />
                                                    </div>
                                                    <div className='col-xl-6'>
                                                        <div className='h2 mt-3'>№ {room.roomNum}</div>
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
                                                                <span>"{room.roomtypeId}"</span>
                                                            </div>
                                                            <div className='col-xl-6 col-lg-6 col-md-6 col-6 d-flex flex-column mb-4 h6'>
                                                                <span className='mb-2' style={{ color: '#afb4bf' }}>Oteli:</span>
                                                                <span>{room.hotel.name}</span>
                                                            </div>
                                                        </div>
                                                        <div className='mt-4'>
                                                            <Link to={`/otag/${room.id}`} className='text-blue text-decoration-none' style={{ fontWeight: "500" }}>Maglumatlary gör &rarr;</Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default Rooms