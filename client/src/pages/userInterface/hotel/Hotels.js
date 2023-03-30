import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Api_Address from '../../../env';
import { getAllHotels } from '../../../redux/slices/hotels';
import about_3 from "../../../assets/cards/about/3.jpg"
import BannerImg from '../../../components/banner/BannerImg';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightLong } from '@fortawesome/free-solid-svg-icons';

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
                            <div className='col-xl-4 col-lg-4 col-md-6 col-12 mb-3' key={index}>
                                <div className='card rounded-3 shadow border-0'>
                                    <img src={hotel.img === null ? about_3 : `${Api_Address}/img/${hotel.img}`} alt="hotels" />
                                    <div className='card-body'>
                                        <div className='h4'><span className='text-blue fw-bold ls-1'>{hotel.name}</span> myhmanhanasy</div>
                                        <table className='my-4' style={{ fontSize: "18px" }}>
                                            <tbody>
                                                <tr>
                                                    <td className="text-secondary lh-lg" style={{ width: "125px" }}>Telefon belgisi:</td>
                                                    <td className='text-secondary'>+993 {hotel.phoneNum}</td>
                                                </tr>
                                                <tr>
                                                    <td className="text-secondary lh-lg" style={{ width: "125px" }}>E-mail adresi:</td>
                                                    <td className='text-secondary'>{hotel.email}</td>
                                                </tr>
                                                <tr>
                                                    <td className="text-secondary lh-lg" style={{ width: "125px" }}>Adresi:</td>
                                                    <td className='text-secondary'>{hotel.address}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <div className='my-3'>
                                            <Link to={`/myhmanhana/${hotel.id}`} className="text-decoration-none text-dark h5 pb-2 ls-1">Maglumatlar <FontAwesomeIcon icon={faRightLong} className="text-blue"/></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default Hotels