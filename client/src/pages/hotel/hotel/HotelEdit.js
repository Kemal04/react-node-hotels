import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const HotelEdit = () => {

    const navigate = useNavigate()

    const [eHotel, setEHotel] = useState({
        phoneNum: "",
        address: "",
    })

    const handleChange = (e) => {
        setEHotel((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    useEffect(() => {
        axios.get(`http://localhost:3001/api/hotel/profil/edit`, {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            },
        }).then((res) => {
            setEHotel(res.data.hotel)
        }).catch((res) => {
            toast.error(res.response.data.error)
            navigate(`/${res.response.status}`)
        })

    }, [navigate])

    const handleClick = async (e) => {
        e.preventDefault()

        if (!eHotel.phoneNum) {
            toast.error("Telefon belgisi yazyn")
        }
        else if (eHotel.phoneNum.length < 8) {
            toast.error("Telefon belgisi 8 sandan ybarat bolmaly")
        }
        else if (eHotel.phoneNum.length > 8) {
            toast.error("Telefon belgisi 8 sandan ybarat bolmaly")
        }
        else if (!eHotel.address) {
            toast.error("Adresi yazyn")
        }
        else {
            await axios.post(`http://localhost:3001/api/hotel/profil/edit/`, eHotel, {
                headers: {
                    accessToken: localStorage.getItem("accessToken"),
                },
            })
                .then((res) => {
                    toast.success(res.data.success)
                    navigate(`/hotel`)
                }).catch((error) => {
                    toast.error(error.message)
                });
        }
    }
    return (
        <>
            <div className='container'>
                <div className='row justify-content-center'>
                    <div className='w-75'>
                        <div className={`card border-0 px-5 bg-white shadow mt-5 pt-5 mb-5 pb-4`}>
                            <div className='d-flex justify-content-center'>
                                <img src="/img/icons/user-1.jpg" alt="" className='rounded-circle' style={{ width: "150px", marginTop: "-70px" }} />
                            </div>
                            <div className='mt-4 h2 text-center'>
                                {eHotel.name}
                            </div>
                            <div className='mt-1 small text-center'>
                                {eHotel.email}
                            </div>
                            <div className='row justify-content-center mt-4 mb-5'>
                                <div className='w-50'>
                                    <div className="card-body">
                                        <div className="row justify-content-between">
                                            <div className="col-sm-4">
                                                <h6 className="mb-0">Doly Ady</h6>
                                            </div>
                                            <div className={`col-sm-8 text-secondary`}>
                                                {eHotel.name}
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row justify-content-between">
                                            <div className="col-sm-4">
                                                <h6 className="mb-0">E-mail adresi</h6>
                                            </div>
                                            <div className={`col-sm-8 text-secondary`}>
                                                {eHotel.email}
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row justify-content-between">
                                            <div className="col-sm-4">
                                                <h6 className="mb-0">Telefon belgisi</h6>
                                            </div>
                                            <div className={`col-sm-8 text-secondary d-flex align-items-center`}>
                                                +993
                                                <input value={eHotel.phoneNum ? eHotel.phoneNum : ""} onChange={handleChange} type="number" name='phoneNum' className='form-control ms-2' min="60000000" max="65999999" />
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row justify-content-between">
                                            <div className="col-sm-4">
                                                <h6 className="mb-0">Adresi</h6>
                                            </div>
                                            <div className={`col-sm-8 text-secondary`}>
                                                <input value={eHotel.address ? eHotel.address : ""} onChange={handleChange} type="text" name='address' className='form-control' />
                                            </div>
                                        </div>
                                        <div className="row mt-5">
                                            <div className="col-sm-12 d-grid">
                                                <button onClick={handleClick} className="btn btn-primary">Düzeltmek</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HotelEdit