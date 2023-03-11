import React, { useEffect } from 'react'
import '@splidejs/react-splide/css';
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBanners } from '../../redux/slices/banner';
import Api_Address from '../../env';

const BannerSlider = () => {

    const options = {
        type: 'loop',
        perPage: 1,
        perMove: 1,
        pagination: false,
        autoplay: false,
    };

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { banners, isLoading, isError } = useSelector(state => state.banner)

    useEffect(() => {
        dispatch(getAllBanners())
    }, [dispatch])

    return (
        <div className='container-fluid p-0'>
            <Splide options={options} hasTrack={false}>
                <SplideTrack className='row g-0'>
                    {

                        banners.slice().sort((a, b) => (a.id < b.id) ? 1 : -1).map((banner, index) => (
                            <SplideSlide className='col-lg-12 p-0' key={index}>
                                <img src={`${Api_Address}/img/${banner.img}`} alt="banner" className='w-100 position-relative' style={{ height: "85vh", objectFit: "cover", }} />
                                <div className='d-flex justify-content-center align-items-center flex-column' style={{ backgroundColor: "rgba(14, 39, 55, 0.7)", position: "absolute", top: "0", height: "85vh", width: "100%" }}>
                                    <div className='text-white ls-1 text-uppercase'>{banner.description}</div>
                                    <div className='text-white text-center display-2 mb-5 mt-4'>{banner.title}</div>
                                    <Link to="/otaglar" className='btn btn-outline-primary btn-lg px-5'>Şu Wagt Gözle</Link>
                                </div>
                            </SplideSlide>
                        ))
                    }
                </SplideTrack>
            </Splide>
        </div>
    )
}

export default BannerSlider