import React, { useContext } from 'react'
import { ThemeContext } from '../../../context/ThemeContext'
import BannerImg from "../../../components/banner/BannerImg"
import { Link } from 'react-router-dom'
import Filter from '../../../components/filter/Filter'

const Rooms = () => {

    const { darkMode } = useContext(ThemeContext)
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
                            <div className='row'>
                                <div className='col-xl-12'>
                                    <div className='card border-0 my-4' style={{ backgroundColor: "transparent", boxShadow: 'none' }}>
                                        <div className='row align-items-center'>
                                            <div className='col-xl-6'>
                                                <img src={'/img/cards/room/1.jpg'} alt="Room" className='img-fluid rounded-3' />
                                            </div>
                                            <div className='col-xl-6'>
                                                <div className='h2 mt-3'>№ 321</div>
                                                <div className='my-3'>
                                                    <span className='h4 text-blue'>310 <small>TMT</small></span>
                                                    <span style={{ color: '#afb4bf' }}> / Gün</span>
                                                </div>
                                                <div className='row'>
                                                    <div className='col-xl-6 col-lg-6 col-md-6 col-6 d-flex flex-column mb-4 mt-4 h6'>
                                                        <span className='mb-2' style={{ color: '#afb4bf' }}>Meýdany:</span>
                                                        <span>31 m<sup>2</sup></span>
                                                    </div>
                                                    <div className='col-xl-6 col-lg-6 col-md-6 col-6 d-flex flex-column mb-4 mt-4 h6'>
                                                        <span className='mb-2' style={{ color: '#afb4bf' }}>Adam sany:</span>
                                                        <span>Iň köp 1 adam</span>
                                                    </div>
                                                    <div className='col-xl-6 col-lg-6 col-md-6 col-6 d-flex flex-column mb-4 h6'>
                                                        <span className='mb-2' style={{ color: '#afb4bf' }}>Görnüşi:</span>
                                                        <span>"Standart"</span>
                                                    </div>
                                                    <div className='col-xl-6 col-lg-6 col-md-6 col-6 d-flex flex-column mb-4 h6'>
                                                        <span className='mb-2' style={{ color: '#afb4bf' }}>Hyzmatlary:</span>
                                                        <span>Wifi, Telewizor ...</span>
                                                    </div>
                                                </div>
                                                <div className='mt-4'>
                                                    <Link to={`/otag/`} className='text-blue text-decoration-none' style={{ fontWeight: "500" }}>Maglumatlary gör &rarr;</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default Rooms