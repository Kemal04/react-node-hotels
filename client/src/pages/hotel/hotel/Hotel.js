import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { AuthContext } from '../../../context/AuthContext'
import { Link } from 'react-router-dom'
const Hotel = () => {

    const { authState } = useContext(AuthContext)

    const id = authState.id;
    const [user, setHotel] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:3001/api/hotel/${id}`).then((res) => {
            setHotel(res.data.hotel);
        });
    }, [id]);

    return (
        <>
            <div className='container'>
                <div className='row justify-content-center'>
                    <div className='w-75'>
                        <div className={`card border-0 px-5 bg-white shadow mt-5 pt-5 mb-5 pb-4`}>
                            <div className='d-flex justify-content-center'>
                                <img src={`http://localhost:3001/img/${user.img}`} alt="" className='rounded' style={{ width: "150px", marginTop: "-70px" }} />
                            </div>
                            <div className='mt-4 h2 text-center'>
                                {user.name}
                            </div>
                            <div className='mt-1 small text-center'>
                                {user.email}
                            </div>
                            <div className='row justify-content-center mt-4 mb-5'>
                                <div className='w-50'>
                                    <div className="card-body">
                                        <div className="row justify-content-between">
                                            <div className="col-sm-4">
                                                <h6 className="mb-0">Doly Ady</h6>
                                            </div>
                                            <div className={`col-sm-8 text-secondary`}>
                                                {user.name}
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row justify-content-between">
                                            <div className="col-sm-4">
                                                <h6 className="mb-0">E-mail adresi</h6>
                                            </div>
                                            <div className={`col-sm-8 text-secondary`}>
                                                {user.email}
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row justify-content-between">
                                            <div className="col-sm-4">
                                                <h6 className="mb-0">Telefon belgisi</h6>
                                            </div>
                                            <div className={`col-sm-8 text-secondary`}>
                                                +993 {user.phoneNum === null ? "00-00-00-00" : user.phoneNum}
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row justify-content-between">
                                            <div className="col-sm-4">
                                                <h6 className="mb-0">Adresi</h6>
                                            </div>
                                            <div className={`col-sm-8 text-secondary`}>
                                                {user.address === null ? "girizilmedik" : user.address}
                                            </div>
                                        </div>
                                        <div className="row mt-5">
                                            <div className="col-sm-12 d-grid">
                                                <Link to={`/hotel-uytget/${user.id}`} className="btn btn-primary">Maglumatlary düzeltmek</Link>
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

export default Hotel