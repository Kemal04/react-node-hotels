import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import {updateHotel} from "../../../redux/slices/hotels"

const AdminHotelEdit = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const location = useLocation();
    const hotelId = location.pathname.split("/")[3];

    const [hotel, setHotel] = useState({
        name: "",
        email: "",
        password: "",
    })

    const handleChange = (e) => {
        setHotel((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    useEffect(() => {
        axios.get(`http://localhost:3001/api/hotel/edit/${hotelId}`, {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            },
        }).then((res) => {
            setHotel(res.data.hotel)
        }).catch((err) => {
            console.log(err.message)
        })
    }, [hotelId])

    const handleClick = async (e) => {
        e.preventDefault()

        if (!hotel.name) {
            toast.error("Adynyzy yazyn")
        }
        else if (!hotel.email) {
            toast.error("E-mail ýazyň")
        }
        else if (!hotel.password) {
            toast.error("Habary ýazyň")
        }
        else {
            dispatch(updateHotel(hotel))
            navigate("/admin/hotellar")
        }
    }

    return (
        <>
            <div className='container'>
                <div className='row justify-content-center'>
                    <div className='col-lg-6'>
                        <div className='my-5 py-5'>
                            <div className='d-flex justify-content-center aling-items-center h2 mb-5'>
                                Hotel Goşmak
                            </div>
                            <form className='row'>

                                <div className="col-lg-6 mb-3">
                                    <label className="form-label fw-bold">Ady</label>
                                    <input name='name' value={hotel.name} onChange={handleChange} type="text" className="form-control rounded-0" autoComplete="off" />
                                </div>

                                <div className="col-lg-6 mb-3">
                                    <label className="form-label fw-bold">E-mail Adresi</label>
                                    <input name='email' value={hotel.email} onChange={handleChange} type="email" className="form-control rounded-0" autoComplete="off" />
                                </div>

                                <div className="col-lg-12 mb-3">
                                    <label className="form-label fw-bold">Açar sözi</label>
                                    <input name='password' value={hotel.password} onChange={handleChange} type="password" className="form-control rounded-0" autoComplete="off" />
                                </div>

                                <div className='d-grid mt-3'>
                                    <button onClick={handleClick} type="submit" className="btn btn-primary">Goşmak</button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminHotelEdit