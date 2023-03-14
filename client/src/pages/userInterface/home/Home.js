import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '@splidejs/react-splide/css';
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import { ThemeContext } from '../../../context/ThemeContext';
import BannerSlider from "../../../components/banner/BannerSlider"
import { useDispatch, useSelector } from "react-redux";
import { getAllContacts } from '../../../redux/slices/contact'
import { getAllRooms } from '../../../redux/slices/rooms'
import { getAllHotels } from '../../../redux/slices/hotels';
import "./home.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightLong } from '@fortawesome/free-solid-svg-icons';

import about_1 from "../../../assets/cards/about/1.jpg"
import about_2 from "../../../assets/cards/about/2.jpg"
import about_3 from "../../../assets/cards/about/3.jpg"
import role from "../../../assets/icons/rol.png"
import coal from "../../../assets/icons/coal.png"
import fork from "../../../assets/icons/fork.png"
import drink from "../../../assets/icons/drink.png"
import contact from "../../../assets/cards/contact/1.jpg"
import signature from "../../../assets/icons/signature.png"
import Api_Address from '../../../env';

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

                {/* Seacrh Section  */}
                {/* <div className='container' style={{ marginTop: "-80px" }}>
                    <div className={darkMode ? "card border-0 shadow p-5 bg-dark text-white" : "card border-0 shadow p-5 bg-white"}>
                        <div className='row align-items-center'>
                            <div className='col-xl-3 col-lg-3 mt-2'>
                                <label htmlFor="exampleFormControlInput1" className="form-label">Giriş wagty</label>
                                <input type="date" className="form-control rounded-0" id="exampleFormControlInput1" placeholder="name@example.com" />
                            </div>
                            <div className='col-xl-3 col-lg-3 mt-2'>
                                <label htmlFor="exampleFormControlInput1" className="form-label">Çykyş wagty</label>
                                <input type="date" className="form-control rounded-0" id="exampleFormControlInput1" placeholder="name@example.com" />
                            </div>
                            <div className='col-xl-3 col-lg-3 mt-2'>
                                <div className='row align-items-center'>
                                    <div className='col-xl-4 col-lg-4 col-md-4 col-4'>
                                        <label className="form-label">Otag</label>
                                        <select className="form-select rounded-0">
                                            <option value="1">01</option>
                                            <option value="2">02</option>
                                            <option value="3">03</option>
                                        </select>
                                    </div>
                                    <div className='col-xl-4 col-lg-4 col-md-4 col-4'>
                                        <label className="form-label">Adam</label>
                                        <select className="form-select rounded-0">
                                            <option value="1">01</option>
                                            <option value="2">02</option>
                                            <option value="3">03</option>
                                        </select>
                                    </div>
                                    <div className='col-xl-4 col-lg-4 col-md-4 col-4'>
                                        <label className="form-label">Çaga</label>
                                        <select className="form-select rounded-0">
                                            <option value="1">01</option>
                                            <option value="2">02</option>
                                            <option value="3">03</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className='col-xl-3 col-lg-3 mt-4 d-grid'>
                                <Link to="/otaglar" className='btn btn-primary small'>Gözle</Link>
                            </div>
                        </div>
                    </div>
                </div> */}
                {/* Seacrh Section  */}

                {/* About Section  */}
                <div className='container mb-5 py-5'>
                    <div className='row align-items-center'>
                        <div className='col-xl-6 col-lg-6'>
                            <div className='h6 ls-2 mb-3' style={{ color: "#1cc3b2" }}> BIz barada </div>
                            <div className='display-4 mb-5'> Myhmanhanalar portalyna hoş geldiňiz </div>
                            <div className='h5 lh-lg ls-1 text-secondary mb-3'>
                                Dünýäde 340-dan gowrak myhmanhana bar, NH Hotel Group, barjak ýeriňize garamazdan ajaýyp ýaşamak üçin dürli myhmanhanalary hödürleýär.                            </div>
                            <div> Alyp Baryjy: <span style={{ color: "#1cc3b2" }}> Kemal Hojayew</span> </div>
                            <img src={signature} alt="Signature" className='img-fluid mt-3' />
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
                                <div key={index} className='col-xl-4 col-lg-6'>
                                    <div className='main'>
                                        <div className="main-card">
                                            <img src={hotel.img === null ? "https://images.unsplash.com/photo-1656618020911-1c7a937175fd?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NTc1MzQyNTE&ixlib=rb-1.2.1&q=80" : `${Api_Address}/img/${hotel.img}`} alt="hotels" />
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
                                                </p>
                                                <Link to={`/hotel/${hotel.id}`} className="d-flex align-items-center card-linkk">
                                                    Maglumatlary
                                                    <FontAwesomeIcon className='ms-2' icon={faRightLong} />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
                                    <SplideSlide className='col-xl-12 mb-3' key={index}>
                                        <div className={darkMode ? 'row bg-white text-dark align-items-center' : 'row bg-primary-blue text-white align-items-center'}>
                                            <div className='col-xl-6 col-lg-6 col-12'>
                                                <img src={`${Api_Address}/img/${room.img}`} alt="room" className='img-fluid ml-0' style={{ width: "900px" }} />
                                            </div>
                                            <div className='col-xl-6 col-lg-6 col-12 d-flex align-items-start justify-content-center flex-column py-3'>
                                                <div className='ms-5 display-5'><b>{room.hotel.name}</b><span className='text-muted'> № {room.roomNum}</span></div>
                                                <div className='ms-5 my-4'>
                                                    <span className='h2 text-blue'>{room.price} <small>TMT</small></span>
                                                    <span> / Gün</span>
                                                </div>
                                                <div className='ms-3'>
                                                    <ul className='ul'>
                                                        <li className='li mb-3'>
                                                            <span style={{ width: "120px", display: "inline-block" }}>Görnüşi</span>
                                                            <span style={{ width: "auto", display: "inline-block" }}>: {room.roomtype.name}</span>
                                                        </li>
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
                                                    <Link to={`/otag/${room.id}`} className='btn btn-primary ls-1' style={{ fontWeight: "600" }}>Maglumatlary gör</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </SplideSlide>
                                ))
                            }
                        </SplideTrack>
                    </Splide>
                </div>
                {/* Rooms Section  */}

                {/* Contact Section  */}
                <div className='container py-5'>
                    <div className='row justify-content-between '>
                        <div className='col-xl-6 col-lg-6 col-12 d-flex justify-content-center'>
                            <img src={contact} alt="Person" className='img-fluid rounded-3 w-75' />
                        </div>
                        <div className='col-xl-6 col-lg-6 col-12 mt-3'>
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