import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Api_Address from '../../../env';
import { getAllHotels } from '../../../redux/slices/hotels';
import about_3 from "../../../assets/cards/about/3.jpg"
import BannerImg from '../../../components/banner/BannerImg';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faRightLong } from '@fortawesome/free-solid-svg-icons';

const Hotels = () => {

    const dispatch = useDispatch()

    const { hotels } = useSelector(state => state.hotels)

    const pageCount = Math.ceil(hotels.length / 10);

    const [page, setPage] = useState(1)

    const changePage = ({ selected }) => {
        setPage(selected + 1)
    }

    useEffect(() => {
        dispatch(getAllHotels(page))
    }, [dispatch, page])

    return (
        <>
            <BannerImg name={`Myhmanhanalar`} />
            <div className='container my-5 py-5'>
                <div className='row'>
                    {

                        hotels.slice().sort((a, b) => (a.id < b.id) ? 1 : -1).map((hotel, index) => (
                            <Link to={`/myhmanhana/${hotel.id}`} key={index} className='col-xl-4 col-lg-6 text-decoration-none text-dark'>
                                <div className='card rounded-0 shadow-sm border-0 mx-2'>
                                    <img src={`${Api_Address}/img/${hotel.img}`} alt="room" className='img-fluid' style={{ objectFit: "cover", height: "300px" }} />
                                    <div className='card-body'>
                                        <div className='d-flex justify-content-between align-items-center mb-4'>
                                            <div className='h4 mb-0'>{hotel.name}</div>
                                            <div><FontAwesomeIcon icon={faEye} className='mr-1' />31</div>
                                        </div>
                                        <div className='fw-bold mb-3'>
                                            E-mail adesi:
                                            <span className='fw-normal'> {hotel.email}</span>
                                        </div>
                                        <div className='fw-bold mb-3'>
                                            Telefon belgisi:
                                            <span className='fw-normal'> +993 {hotel.phoneNum}</span>
                                        </div>
                                        <div className='fw-bold mb-3'>
                                            Adresi:
                                            <span className='fw-normal'> {hotel.address}</span>
                                        </div>
                                        <div className='more-info'>Giňişleýin</div>
                                    </div>
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default Hotels