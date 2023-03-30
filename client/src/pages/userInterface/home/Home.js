import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightLong } from '@fortawesome/free-solid-svg-icons';
import { ThemeContext } from '../../../context/ThemeContext';
import { useDispatch, useSelector } from "react-redux";
import { getAllContacts } from '../../../redux/slices/contact'
import { getAllRooms } from '../../../redux/slices/rooms'
import { getAllHotels } from '../../../redux/slices/hotels';
import BannerSlider from "../../../components/banner/BannerSlider"
import Api_Address from '../../../env';
import about_1 from "../../../assets/cards/about/1.jpg"
import about_2 from "../../../assets/cards/about/2.jpg"
import about_3 from "../../../assets/cards/about/3.jpg"
import role from "../../../assets/icons/rol.png"
import coal from "../../../assets/icons/coal.png"
import fork from "../../../assets/icons/fork.png"
import drink from "../../../assets/icons/drink.png"
import contact from "../../../assets/cards/contact/1.jpg"
import "./home.css"

const Home = () => {

    const { darkMode } = useContext(ThemeContext)

    const dispatch = useDispatch();

    const { rooms } = useSelector(state => state.rooms)
    useEffect(() => {
        dispatch(getAllRooms())
    }, [dispatch])

    const { hotels } = useSelector(state => state.hotels)
    useEffect(() => {
        dispatch(getAllHotels())
    }, [dispatch])

    const { contacts } = useSelector(state => state.contacts)
    useEffect(() => {
        dispatch(getAllContacts())
    }, [dispatch])

    const roomoptions = {
        type: 'loop',
        perPage: 1,
        perMove: 1,
        pagination: false,
        autoplay: true,
    };

    const contactOptions = {
        type: 'loop',
        perPage: 1,
        perMove: 1,
        paginations: true,
        autoplay: true,
        arrows: false,
    };

    return (
        <>
            <BannerSlider />
            <div className={darkMode ? 'bg-dark text-white' : 'bg-white'}>
                {/* About Section  */}
                <div className='container mb-5 py-5'>
                    <div className='row align-items-center'>
                        <div className='col-xl-6 col-lg-6'>
                            <div className='h6 ls-2 mb-3' style={{ color: "#1cc3b2" }}> BIz barada </div>
                            <div className='display-4 mb-5'> Myhmanhanalar portalyna hoş geldiňiz </div>
                            <div className='h5 lh-lg ls-1 text-secondary mb-3'>
                                Dünýäde 340-dan gowrak myhmanhana bar, NH Hotel Group, barjak ýeriňize garamazdan ajaýyp ýaşamak üçin dürli myhmanhanalary hödürleýär.                            </div>
                            <div> Alyp Baryjy: <span style={{ color: "#1cc3b2" }}> Sanly Çözgüt IT Meydançasy</span> </div>
                        </div>
                        <div className='col-xl-6 col-lg-6 mt-3'>
                            <div className='row g-4 align-items-center'>
                                <div className='col-xl-6 col-lg-6 col-6'>
                                    <div className='scale'>
                                        <img src={about_1} alt="cards" className='img-fluid rounded-3 mb-4' />
                                    </div>
                                    <div className='scale'>
                                        <img src={about_2} alt="cards" className='img-fluid rounded-3' />
                                    </div>
                                </div>
                                <div className='col-xl-6 col-lg-6 col-6'>
                                    <div className='scale'>
                                        <img src={about_3} alt="cards" className='img-fluid rounded-3' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* About Section  */}

                {/* Mini Cards Section  */}
                <div className='container my-5 pb-5'>
                    <div className={darkMode ? 'row align-items-center text-dark' : 'row align-items-center text-dark'}>
                        <div className='col-xl-2 col-lg-4 col-md-4 col-6'>
                            <div className='card border-0 shadow p-4 d-flex flex-column align-items-center text-primary-hover'>
                                <img src={role} alt="Rol" className='img-fluid mb-3' style={{ width: "40px", height: "40px", objectFit: "cover" }} />
                                <h5>Ulag</h5>
                            </div>
                        </div>
                        <div className='col-xl-2 col-lg-4 col-md-4 col-6'>
                            <div className='card border-0 shadow p-4 d-flex flex-column align-items-center text-primary-hover'>
                                <img src={coal} alt="coal" className='img-fluid mb-3' style={{ width: "40px", height: "40px", objectFit: "cover" }} />
                                <h5>Rahatlyk</h5>
                            </div>
                        </div>
                        <div className='col-xl-2 col-lg-4 col-md-4 col-6'>
                            <div className='card border-0 shadow p-4 d-flex flex-column align-items-center text-primary-hover'>
                                <img src={fork} alt="fork" className='img-fluid mb-3' style={{ width: "40px", height: "40px", objectFit: "cover" }} />
                                <h5>Restoran</h5>
                            </div>
                        </div>
                        <div className='col-xl-2 col-lg-4 col-md-4 col-6'>
                            <div className='card border-0 shadow p-4 d-flex flex-column align-items-center text-primary-hover'>
                                <img src={drink} alt="drink" className='img-fluid mb-3' style={{ width: "40px", height: "40px", objectFit: "cover" }} />
                                <h5>Içgiler</h5>
                            </div>
                        </div>
                        <div className='col-xl-2 col-lg-4 col-md-4 col-6'>
                            <div className='card border-0 shadow p-4 d-flex flex-column align-items-center text-primary-hover'>
                                <img src={role} alt="Rol" className='img-fluid mb-3' style={{ width: "40px", height: "40px", objectFit: "cover" }} />
                                <h5>Ulag</h5>
                            </div>
                        </div>
                        <div className='col-xl-2 col-lg-4 col-md-4 col-6'>
                            <div className='card border-0 shadow p-4 d-flex flex-column align-items-center text-primary-hover'>
                                <img src={coal} alt="coal" className='img-fluid mb-3' style={{ width: "40px", height: "40px", objectFit: "cover" }} />
                                <h5>Spa</h5>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Mini Cards Section  */}

                {/* Hotels Section */}
                <div className='container'>
                    <div className='row justify-content-center mb-4'>
                        <div className='col-xl-4 text-center text-blue h1 border-top border-bottom text-uppercase'>
                            Otellar
                        </div>
                    </div>
                    <div className='row no-gutters'>
                        {
                            hotels.slice(0, 5).map((hotel, index) => (
                                <Link to={`/myhmanhana/${hotel.id}`} key={index} className='col-xl-4 col-lg-6'>
                                    <div className='main'>
                                        <div className="main-card">
                                            <img src={hotel.img === null ? about_3 : `${Api_Address}/img/${hotel.img}`} alt="hotels" />
                                            <div>
                                                <h2>
                                                    {hotel.name}
                                                </h2>
                                                <p style={{ lineHeight: "30px" }}>
                                                    E-mailimiz: {hotel.email}
                                                    <br />
                                                    Telefon belgimiz: +993 {hotel.phoneNum}
                                                    <br />
                                                    Adresimiz: {hotel.address}
                                                    <br />
                                                    Maglumatlary
                                                    <FontAwesomeIcon className='ms-2' icon={faRightLong} />

                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        }
                    </div>
                </div>
                {/* Hotels Section */}

                {/* Rooms Section  */}
                <div className='container-fluid p-0 my-5 pt-5'>
                    <Splide options={roomoptions} hasTrack={false}>
                        <SplideTrack className='row g-0'>
                            {
                                rooms.map((room, index) => (
                                    <SplideSlide className='col-xl-12 mb-3 p-0' key={index}>
                                        <Link to={`/otag/${room.id}`} className={darkMode ? 'row bg-white text-dark align-items-center text-decoration-none' : 'row bg-primary-blue text-white align-items-center text-decoration-none'}>
                                            <div className='col-xl-6 col-lg-6 col-12'>
                                                <img src={`${Api_Address}/img/${room.img}`} alt="room" className='img-fluid' style={{ width: "900px" }} />
                                            </div>
                                            <div className='col-xl-6 col-lg-6 col-12 d-flex align-items-start justify-content-center flex-column py-5'>
                                                <div className='ms-5 display-5'><b>{room.hotel.name}</b><span className='text-muted'> {room.roomtype.name} otagy</span></div>
                                                <div className='ms-5 my-4'>
                                                    <span className='h2 text-blue'>{room.price} <small>TMT</small></span>
                                                    <span> / Gün</span>
                                                </div>
                                                <div className='ms-3'>
                                                    <ul className='ul'>
                                                        <li className='li mb-3'>
                                                            <span style={{ width: "120px", display: "inline-block" }}>Meýdany</span>
                                                            <span style={{ width: "auto", display: "inline-block" }}>: {room.size} m<sup>2</sup></span>
                                                        </li>
                                                        <li className='li mb-3'>
                                                            <span style={{ width: "120px", display: "inline-block" }}>Adam sany</span>
                                                            <span style={{ width: "auto", display: "inline-block" }}>: Iň köp {room.capacity} adam</span>
                                                        </li>
                                                        <li className='li mb-3'>
                                                            <span style={{ width: "120px", display: "inline-block" }}>Hyzmatlar</span>
                                                            <span style={{ width: "auto", display: "inline-block" }}>: Wifi, Telewizor, Hammam . . .</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className='ms-5 mt-4'>
                                                    <div className='btn btn-primary ls-1' style={{ fontWeight: "600" }}>Maglumatlary gör</div>
                                                </div>
                                            </div>
                                        </Link>
                                    </SplideSlide>
                                ))
                            }
                        </SplideTrack>
                    </Splide>
                </div>
                {/* Rooms Section  */}

                {/* Contact Section  */}
                <div className='container py-5'>
                    <div className='row justify-content-between align-items-center'>
                        <div className='col-xl-6 col-lg-6 col-12 d-flex justify-content-center'>
                            <img src={contact} alt="Person" className='img-fluid rounded-3 w-75' />
                        </div>
                        <div className='col-xl-6 col-lg-6 col-12 mt-3 text-center'>
                            <div className='h6 ls-2 mb-3' style={{ color: "#1cc3b2" }}> Habarlaşmak </div>
                            <div className='display-5 mb-4'>Bize Gelen Teswirler</div>
                            <Splide options={contactOptions} hasTrack={false} className="my-5">
                                <SplideTrack className='row'>
                                    {
                                        contacts.map((contact) => (
                                            !contact.check
                                                ?
                                                null
                                                :
                                                <SplideSlide className='col-xl-12' key={contact.id}>
                                                    <div className='h5 lh-lg ls-1 text-secondary mb-5'>
                                                        {contact.comment}
                                                    </div>
                                                    <div>
                                                        {contact.name} - <span className='text-blue'>{contact.email}</span>
                                                    </div>
                                                </SplideSlide>
                                        ))
                                    }
                                </SplideTrack>
                            </Splide>
                        </div>
                    </div>
                </div>
                {/* Contact Section  */}
            </div>

        </>
    )
}

export default Home