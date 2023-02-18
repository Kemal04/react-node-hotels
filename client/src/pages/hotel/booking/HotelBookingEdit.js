import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { updateHotelBooking } from '../../../redux/slices/hotelBooking'

const HotelBookingEdit = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation();
    const bookingId = location.pathname.split("/")[3];

    const [booking, setBooking] = useState({
        checkIn: "",
        checkOut: "",
        phoneNumber: "",
        check: "",
        roomId: "",
    })

    const handleChange = (e) => {
        setBooking((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    useEffect(() => {
        axios.get(`http://localhost:3001/api/booking/edit/${bookingId}`, {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            },
        }).then((res) => {
            setBooking(res.data.booking)
        }).catch((res) => {
            toast.error(res.response.data.error)
            navigate(`/${res.response.status}`)
        })
    }, [navigate, bookingId])

    const handleClick = async (e) => {
        e.preventDefault()

        if (!booking.check) {
            toast.error("sayla")
        }
        else {
            dispatch(updateHotelBooking(booking))
            navigate("/hotel/bronlar")
        }
    }

    return (
        <>
            <div className='container'>
                <div className='row justify-content-center'>
                    <div className='col-lg-6'>
                        <div className='my-5 py-5'>
                            <div className='d-flex justify-content-center aling-items-center h2 mb-5'>
                                Otag üýgetmek
                            </div>
                            <form className='row'>
                                <div className="col-lg-12 mb-3">
                                    <label className="form-label fw-bold">Tassyklamak</label>
                                    <select name='check' onChange={handleChange} className="form-select">
                                        <option defaultChecked>Sayla</option>
                                        <option value="1">Tassykla</option>
                                    </select>
                                </div>

                                <div className='d-grid mt-3'>
                                    <button onClick={handleClick} type="submit" className="btn btn-primary btn-green-not-hover">üýgetmek</button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HotelBookingEdit