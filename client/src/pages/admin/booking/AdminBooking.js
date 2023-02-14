import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { deleteBooking, getAllBookings } from '../../../redux/slices/bookings'

const AdminBooking = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch();

    const { bookings } = useSelector(state => state.bookings)
    useEffect(() => {
        dispatch(getAllBookings())
    }, [dispatch])

    const handleDelete = async (id) => {
        dispatch(deleteBooking(id))
        navigate("/admin/bronlanan-otaglar")
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

                                {
                                    bookings.slice().sort((a, b) => (a.id < b.id) ? 1 : -1).map((booking, index) => (
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
                                                <button className='btn btn-outline-danger mx-1' onClick={() => handleDelete(booking.id)}><FontAwesomeIcon icon={faTrash} /></button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminBooking