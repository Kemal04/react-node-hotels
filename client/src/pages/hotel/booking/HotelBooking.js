import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { deleteHotelBooking, getHotelBookings } from '../../../redux/slices/hotelBooking'
import ReactPaginate from 'react-paginate';

const HotelBooking = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch();

    const { hotelBooking, isLoading, isError, pages } = useSelector(state => state.hotelBooking)

    const [page, setPage] = useState(1)

    const changePage = ({ selected }) => {
        setPage(selected + 1)
    }

    useEffect(() => {
        dispatch(getHotelBookings(page))
    }, [dispatch, page])
    

    const handleDelete = async (id) => {
        dispatch(deleteHotelBooking(id))
        navigate("/myhmanhana/bronlar")
    }

    return (
        <>
            <div className='container py-5'>
                <div className='d-flex justify-content-between aling-items-center h2 mb-5'>
                    Bron bölümi
                </div>
                <div className='row'>
                    <div className='col-lg-12'>
                        <table className="table">
                            <thead className='table-dark'>
                                <tr>
                                    <th scope="col">№</th>
                                    <th scope="col">Otag belgisi</th>
                                    <th scope="col">Telefon belgisi</th>
                                    <th scope="col">Giriş we Çykyş wagtlary</th>
                                    <th scope="col">Tassyklamak</th>
                                </tr>
                            </thead>
                            <tbody>
                                {isLoading === true && <tr><td>Loading</td></tr>}
                                {isError === true && <tr><td>Error, please reload page</td></tr>}
                            </tbody>
                            <tbody>
                                {isLoading === false &&
                                    hotelBooking.slice().sort((a, b) => (a.id < b.id) ? 1 : -1).map((booking, index) => (
                                        <tr key={index} className={booking.check ? "text-success" : "text-danger"}>
                                            <td>{index + 1}</td>
                                            <td>№ {booking.room.roomNum} Otag</td>
                                            <td>+993 {booking.phoneNum}</td>
                                            <td>
                                                {new Date(booking.checkIn).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}
                                                <span className='mx-2'>|</span>
                                                {new Date(booking.checkOut).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}
                                            </td>
                                            <td>
                                                <Link className='btn btn-outline-warning mx-1' to={`/myhmanhana/bron-uytgetmek/${booking.id}`}><FontAwesomeIcon icon={faPencil} /></Link>
                                                <button className='btn btn-outline-danger mx-1' onClick={() => handleDelete(booking.id)}><FontAwesomeIcon icon={faTrash} /></button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>

                    {
                        page === 1
                            ?
                            null
                            :
                            <nav className='col-xl-12 d-flex justify-content-center mt-5'>
                                <ReactPaginate
                                    previousLabel="< yza"
                                    nextLabel="öňe >"
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
                    }
                </div>
            </div>
        </>
    )
}

export default HotelBooking