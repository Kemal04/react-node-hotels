import React, { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../../../context/ThemeContext'
import BannerImg from "../../../components/banner/BannerImg"
import { Link } from 'react-router-dom'
import Filter from '../../../components/filter/Filter'
import { useDispatch, useSelector } from 'react-redux';
import { getAllRooms } from '../../../redux/slices/rooms'
import { getAllRoomTypes } from '../../../redux/slices/roomTypes'
import { getAllHotels } from '../../../redux/slices/hotels'
import EmptyRoom from '../../../components/emptyRoom/EmptyRoom'
import ReactPaginate from 'react-paginate'
import Api_Address from '../../../env'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from '@fortawesome/free-solid-svg-icons'

const Rooms = () => {

    const { darkMode } = useContext(ThemeContext)
    const dispatch = useDispatch()

    const [page, setPage] = useState(1)

    const changePage = ({ selected }) => {
        setPage(selected + 1)
    }

    //ROOMS
    const { rooms, pages } = useSelector(state => state.rooms)
    useEffect(() => {
        dispatch(getAllRooms(page))
    }, [dispatch, page])

    const [room, setRoom] = useState(rooms)
    useEffect(() => {
        setRoom(rooms);
    }, [rooms]);

    const pageCount = Math.ceil(rooms.length / 10) + 1;

    //ROOMTYPES
    const { roomTypes } = useSelector(state => state.roomTypes)
    useEffect(() => {
        dispatch(getAllRoomTypes())
    }, [dispatch])

    //HOTELS
    const { hotels } = useSelector(state => state.hotels)
    useEffect(() => {
        dispatch(getAllHotels())
    }, [dispatch])

    //RESULT
    const [result, setResult] = useState(true)

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

    const roomType = [...new Set(roomTypes.map((Val) => Val.name))];

    const filterItem = (value) => {
        const newItem = rooms.filter((newVal) => newVal.roomtype.name === value);
        setRoom(newItem);
        !newItem.length ? setResult(false) : setResult(true)
    };


    const hotel = [...new Set(hotels.map((Val) => Val))];

    const filterHotel = (value) => {
        const newItem = rooms.filter((newVal) => newVal.hotel.name === value);
        setRoom(newItem);
        !newItem.length ? setResult(false) : setResult(true)
    };


    const capacity = [...new Set(rooms.map((Val) => Val.capacity))];

    const filterCapacity = (value) => {
        const newItem = rooms.filter((newVal) => newVal.capacity === value);
        setRoom(newItem);
        !newItem.length ? setResult(false) : setResult(true)
    };

    return (
        <>
            <BannerImg name="Otaglar" />
            <div className={darkMode ? "bg-dark text-white" : "bg-white text-dark"}>
                <div className='container py-5'>
                    <div className='row align-items-start justify-content-center'>

                        {/* OFFCANVAS  */}
                        <div className="offcanvas offcanvas-start" style={{ width: "250px" }} data-bs-scroll="true" tabIndex="-1" id="offcanvasWithBothOptions1" aria-labelledby="offcanvasWithBothOptionsLabel1">
                            <div className="offcanvas-header flex-column align-items-start p-0">
                                <div className='d-flex align-items-center justify-content-between p-3'>
                                    <h5 className="offcanvas-title me-5 pe-5" id="offcanvasWithBothOptionsLabel1">Logo</h5>
                                    <button type="button" className="btn-close ms-4" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                </div>
                                <div className="d-flex flex-column mt-3">
                                    <Filter
                                        filterItem={filterItem}
                                        roomType={roomType}
                                        rooms={rooms}
                                        setRoom={setRoom}

                                        hotel={hotel}
                                        filterHotel={filterHotel}

                                        capacity={capacity}
                                        filterCapacity={filterCapacity}
                                    />
                                </div>
                            </div>
                        </div>
                        {/* /OFFCANVAS  */}

                        <div className='col-xl-2 col-lg-2 col-md-2 col-12 d-xl-block d-lg-block d-md-block d-none'>
                            <Filter
                                filterItem={filterItem}
                                roomType={roomType}
                                rooms={rooms}
                                setRoom={setRoom}

                                hotel={hotel}
                                filterHotel={filterHotel}

                                capacity={capacity}
                                filterCapacity={filterCapacity}
                            />
                        </div>

                        <div className='col-xl-8 col-lg-8 col-md-8 col-12 mb-3'>
                            <div className='row justify-content-end text-end mt-4 align-items-center'>

                                {/* OFFCANVAS  */}
                                <div className='col-2 d-xl-none d-lg-none d-md-none d-inline-block mt-2'>
                                    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions1" aria-controls="offcanvasWithBothOptions1">
                                        <FontAwesomeIcon icon={faFilter} className="border px-3 py-2" />
                                    </button>
                                </div>
                                {/* /OFFCANVAS  */}

                                <div className='col-xl-3 col-10'>
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
                                {result
                                    ?
                                    room.map((room, index) => (
                                        <div className='col-xl-12' key={index}>
                                            <div className='card border-0 my-4' style={{ backgroundColor: "transparent", boxShadow: 'none' }}>
                                                <div className='row align-items-center'>
                                                    <div className='col-xl-6'>
                                                        <img src={room.img ? `${Api_Address}/img/${room.img}` : '/img/cards/room/1.jpg'} alt="Room" className='img-fluid rounded-3' />
                                                    </div>
                                                    <div className='col-xl-6'>
                                                        <div className='h4 mt-3'><b className=''>{room.hotel.name}</b> № {room.roomNum}</div>
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
                                    ))
                                    :
                                    <EmptyRoom />
                                }
                                {
                                    pages === 1
                                        ?
                                        null
                                        :
                                        <nav className='col-xl-12 d-flex justify-content-center mt-5'>
                                            <ReactPaginate
                                                previousLabel="< yza"
                                                nextLabel="öňe >"
                                                pageCount={pageCount}
                                                onPageChange={changePage}
                                                containerClassName={"pagination"}
                                                pageLinkClassName={"page-link"}
                                                previousLinkClassName={"page-link"}
                                                nextLinkClassName={"page-link"}
                                                activeLinkClassName={"page-link active"}
                                                disabledLinkClassName={"page-link disabled"}
                                            />
                                        </nav>
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