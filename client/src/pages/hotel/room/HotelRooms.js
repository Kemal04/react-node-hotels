import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { faPencil, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch, useSelector } from 'react-redux'
import { deleteHotelRoom } from '../../../redux/slices/hotelRooms'
import { getAllHotelRooms } from '../../../redux/slices/hotelRooms'
import ReactPaginate from 'react-paginate'

const HotelRooms = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { hotelRooms, isLoading, isError, pages } = useSelector(state => state.hotelRooms)

    const [page, setPage] = useState(1)

    const changePage = ({ selected }) => {
        setPage(selected + 1)
    }

    useEffect(() => {
        dispatch(getAllHotelRooms(page))
    }, [dispatch, page])

    const handleDelete = async (id) => {
        dispatch(deleteHotelRoom(id))
        navigate("/hotel/otaglar")
    }

    return (
        <>
            <div className='container py-5'>
                <div className='d-flex justify-content-between aling-items-center h2 mb-5'>
                    Otaglar bölümi
                    <Link to="/hotel/otag-gosmak"><FontAwesomeIcon className='text-dark' icon={faPlus} /></Link>
                </div>
                <div className='row'>
                    <div className='col-xl-12'>
                        <table className="table">
                            <thead className='table-dark'>
                                <tr>
                                    <th scope="col">№</th>
                                    <th scope="col">Görnüşi</th>
                                    <th scope="col">Belgisi</th>
                                    <th scope="col">Meýdany</th>
                                    <th scope="col">Adam sany</th>
                                    <th scope="col">Bahasy</th>
                                    <th scope="col">Düzetmek</th>
                                </tr>
                            </thead>
                            <tbody>
                                {isLoading === true && <tr><td>Loading</td></tr>}
                                {isError === true && <tr><td>Error, please reload page</td></tr>}
                            </tbody>
                            <tbody>
                                {isLoading === false &&
                                    hotelRooms.slice().sort((a, b) => (a.id < b.id) ? 1 : -1).map((room, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            {/* <td><img src={`${Api_Address}/img/${room.img}`} alt={room.roomType.name} style={{width:"100px"}}/></td> */}
                                            <td>{room.roomtype.name}</td>
                                            <td>№ {room.roomNum}</td>
                                            <td>{room.size} m<sup>2</sup></td>
                                            <td>{room.capacity} adam</td>
                                            <td>{room.price}<span className='small'> TMT</span></td>
                                            <td>
                                                <Link className='me-3 btn btn-sm btn-outline-warning mx-1' to={`/hotel/otag-uytgetmek/${room.id}`}><FontAwesomeIcon icon={faPencil} /></Link>
                                                <button className='btn btn-sm btn-outline-danger mx-1' onClick={() => handleDelete(room.id)}><FontAwesomeIcon icon={faTrash} /></button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                    <nav className='col-xl-12 d-flex justify-content-center'>
                        <ReactPaginate
                            previousLabel="< previous"
                            nextLabel="next >"
                            pageCount={pages}
                            onPageChange={changePage}
                            containerClassName={"pagination"}
                            pageLinkClassName={"page-link"}
                            previousLinkClassName={"page-link"}
                            nextLinkClassName={"page-link"}
                            activeLinkClassName={"page-link active"}
                            disabledLinkClassName={"page-link disabled"}
                        />
                    </nav>
                </div>
            </div>
        </>
    )
}

export default HotelRooms