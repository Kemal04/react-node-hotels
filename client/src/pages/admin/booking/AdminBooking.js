import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getAllBookings } from '../../../redux/slices/bookings'
import ReactPaginate from 'react-paginate';

const AdminBooking = () => {

    const dispatch = useDispatch();

    const { bookings, isLoading, isError } = useSelector(state => state.bookings)

    const pageCount = Math.ceil(bookings.length / 10);

    const [page, setPage] = useState(1)

    const changePage = ({ selected }) => {
        setPage(selected + 1)
    }

    useEffect(() => {
        dispatch(getAllBookings(page))
    }, [dispatch, page])

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
                                    <th scope="col">Otag ady</th>
                                    <th scope="col">Telefon belgisi</th>
                                    <th scope="col">Giriş we Çykyş wagtlary</th>
                                </tr>
                            </thead>
                            <tbody>
                                {isLoading === true && <tr><td>Loading</td></tr>}
                                {isError === true && <tr><td>Error, please reload page</td></tr>}
                            </tbody>
                            <tbody>
                                {isLoading === false &&
                                    bookings.slice().sort((a, b) => (a.id < b.id) ? 1 : -1).map((booking, index) => (
                                        <tr key={index} className={booking.check ? "text-success" : "text-danger"}>
                                            <td>{index + 1}</td>
                                            <td> № {booking.room.roomNum} Otag</td>
                                            <td>+993 {booking.phoneNum}</td>
                                            <td>
                                                {new Date(booking.checkIn).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}
                                                <span className='mx-2'>|</span>
                                                {new Date(booking.checkOut).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}
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
                </div>
            </div>
        </>
    )
}

export default AdminBooking