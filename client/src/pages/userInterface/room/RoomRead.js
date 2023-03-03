import React, { useContext, useEffect, useState } from 'react'
import '@splidejs/react-splide/css';
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import { ThemeContext } from '../../../context/ThemeContext';
import BannerImg from '../../../components/banner/BannerImg';
import { AuthContext } from '../../../context/AuthContext';
import { useDispatch } from 'react-redux';
import { creatBooking } from '../../../redux/slices/bookings'
import { creatRoomContact } from '../../../redux/slices/roomContacts';

const RoomRead = () => {

    const option = {
        type: 'loop',
        perPage: 1,
        perMove: 1,
        paginations: true,
        autoplay: true,
    };

    const { authState } = useContext(AuthContext)
    const { darkMode } = useContext(ThemeContext)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation();
    const roomId = location.pathname.split("/")[2];

    const [room, setRoom] = useState("")
    const [roomType, setRoomType] = useState("")
    const [hotel, setHotel] = useState("")
    const [booking, setBooking] = useState({
        roomId: roomId,
        hotelId: "",
        checkIn: "",
        checkOut: "",
        phoneNum: "",
    })
    const [contact, setContact] = useState({
        name: "",
        email: "",
        subject: "",
        comment: "",
        hotelId: "",
        roomId: roomId,
    })
    console.log(contact);

    const handleChange = (e) => {
        setBooking((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const changeContact = (e) => {
        setContact((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    useEffect(() => {
        axios.get(`http://localhost:3001/api/room/${roomId}`).then((res) => {
            setRoom(res.data.room)
            setRoomType(res.data.room.roomtype)
            setHotel(res.data.room.hotel)
            contact.hotelId = res.data.room.hotel.id
        }).catch((err) => {
            toast.error(err.message)
        })
    }, [contact, roomId]);

    const bookingRoom = async (e) => {
        e.preventDefault()

        if (!booking.checkIn) {
            toast.error("Giriş wagtyny ýazyň")
        }
        else if (!booking.checkOut) {
            toast.error("Çykyş wagtyny ýazyň")
        }
        else if (!booking.hotelId) {
            toast.error("Yatda saklanmady")
        }
        else if (!booking.phoneNum) {
            toast.error("Telefon belgiňizi ýazyň")
        }
        else if (booking.phoneNum.length < 8) {
            toast.error("Telefon belgisi 8 sandan ybarat bolmaly")
        }
        else {
            dispatch(creatBooking(booking))
            navigate("/")
        }
    }

    const clickContact = async (e) => {
        e.preventDefault()


        if (!contact.name) {
            toast.error("Adyňyzy ýazyň")
        }
        else if (!contact.email) {
            toast.error("E-mail adresiňizi ýazyň")
        }
        else if (!contact.subject) {
            toast.error("Temaňyzy ýazyň")
        }
        else if (!contact.comment) {
            toast.error("Teswiriňizi ýazyň")
        }
        else if (contact.comment.length < 25) {
            toast.error("Teswiriňizi 25 harpdan ybarat bolmaly")
        }
        else {
            dispatch(creatRoomContact(contact))
            navigate("/")
        }
    }

    return (
        <>
            <BannerImg name={`№ ${room.roomNum} Otag`} />
            <div className={darkMode ? "bg-dark text-white" : "bg-white text-dark"}>
                <div className='container py-5'>
                    <div className='row justify-content-between'>
                        <div className='col-xl-7'>
                            <Splide options={option} hasTrack={false} className="mb-5">
                                <SplideTrack className='row'>
                                    <SplideSlide className='col-xl-12'>
                                        <img src={room.img ? `http://localhost:3001/img/${room.img}` : '/img/cards/room/1.jpg'} alt="" className='img-fluid w-100' style={{ height: "500px", objectFit: "cover" }} />
                                    </SplideSlide>
                                    <SplideSlide className='col-xl-12'>
                                        <img src="/img/cards/room/2.jpg" alt="" className='img-fluid w-100' style={{ height: "500px", objectFit: "cover" }} />
                                    </SplideSlide>
                                    <SplideSlide className='col-xl-12'>
                                        <img src="/img/cards/room/3.jpg" alt="" className='img-fluid w-100' style={{ height: "500px", objectFit: "cover" }} />
                                    </SplideSlide>
                                </SplideTrack>
                            </Splide>
                            <div className='row border p-4' style={{ fontWeight: "500" }}>
                                <div className='col-xl-3 col-6 mt-3 d-flex flex-column align-items-center border-end'>
                                    <div style={{ color: "#afb4bf" }}>Tutýan meýdany :</div>
                                    <div>{room.size}m<sup>2</sup></div>
                                </div>
                                <div className='col-xl-3 col-6 mt-3 d-flex flex-column align-items-center border-end'>
                                    <div style={{ color: "#afb4bf" }}>Adam sany :</div>
                                    <div>{room.capacity} adam </div>
                                </div>
                                <div className='col-xl-3 col-6 mt-3 d-flex flex-column align-items-center border-end'>
                                    <div style={{ color: "#afb4bf" }}>Otag görnüşi :</div>
                                    <div>"{roomType.name}"</div>
                                </div>
                                <div className='col-xl-3 col-6 mt-3 d-flex flex-column align-items-center'>
                                    <div style={{ color: "#afb4bf" }}>Oteli :</div>
                                    <div>{hotel.name}</div>
                                </div>
                            </div>
                            <div className='row mt-4'>
                                <div className='col-xl-12 p-0 lh-lg mt-3' style={{ color: "#636a76" }}>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    {room.description}
                                </div>
                            </div>
                            <div className='row my-5 align-items-center'>
                                <div className='col-xl-12 p-0 h4'>
                                    Otag Hyzmatlary
                                </div>
                                <div className='col-xl-4 col-6 p-0 d-flex align-items-center my-4'>
                                    <img src="/img/icons/air.png" alt="Air" className='img-fluid me-3' />
                                    <div>Kondisioner</div>
                                </div>
                                <div className='col-xl-4 col-6 p-0 d-flex align-items-center my-4'>
                                    <img src="/img/icons/drinks.png" alt="Air" className='img-fluid me-3' />
                                    <div>Mugt içgiler</div>
                                </div>
                                <div className='col-xl-4 col-6 p-0 d-flex align-items-center my-4'>
                                    <img src="/img/icons/plate.png" alt="Air" className='img-fluid me-3' />
                                    <div>Restoran</div>
                                </div>
                                <div className='col-xl-4 col-6 p-0 d-flex align-items-center mt-4'>
                                    <img src="/img/icons/tv.png" alt="Air" className='img-fluid me-3' />
                                    <div>Telewizor</div>
                                </div>
                                <div className='col-xl-4 col-6 p-0 d-flex align-items-center mt-4'>
                                    <img src="/img/icons/wifi.png" alt="Air" className='img-fluid me-3' />
                                    <div>Güýçli Wifi</div>
                                </div>
                                <div className='col-xl-4 col-6 p-0 d-flex align-items-center mt-4'>
                                    <img src="/img/icons/contact.png" alt="Air" className='img-fluid me-3' />
                                    <div>Habarlaşmak 7/24</div>
                                </div>
                            </div>
                            <div className='row my-5 align-items-center'>
                                <div className='col-xl-12 p-0 h4'>
                                    Otag barada teswirler:
                                </div>
                                <div className='col-xl-12 p-0 mt-5 text-xl-start text-lg-start text-md-start text-center'>
                                    <div className='row align-items-center justify-content-center'>
                                        <div className='col-xl-2 col-12 border-end'>
                                            <img src="/img/icons/user-1.jpg" alt="User" className='rounded-circle' style={{ width: "100px" }} />
                                        </div>
                                        <div className='col-xl-10 col-12 mt-2'>
                                            <div className='row justify-content-between align-items-center'>
                                                <div className='col-xl-3 col-12'>
                                                    <div className='mb-3 small text-secondary'>31 Awg 2022</div>
                                                    <div className='mb-3 text-blue h6'>Kemal Hojaýew</div>
                                                </div>
                                            </div>
                                            <div className='text-secondary'>
                                                Bu owadandy. Myhmanhananyň özi ajaýyp. işgärler gaty gowy. Biz ony gowy görýärdik. Bu gaty gowydy. Men ýene gitmek isleýärin sebäbi tagam meniň damagymda galdy. Iýmitde gaty gowy. Bu gaty üstünlikli diýip pikir edýärin.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-xl-12 p-0 mt-5 text-xl-start text-lg-start text-md-start text-center'>
                                    <div className='row align-items-center justify-content-center'>
                                        <div className='col-xl-2 col-12 border-end'>
                                            <img src="/img/icons/user-1.jpg" alt="User" className='rounded-circle' style={{ width: "100px" }} />
                                        </div>
                                        <div className='col-xl-10 col-12 mt-2'>
                                            <div className='row justify-content-between align-items-center'>
                                                <div className='col-xl-3 col-12'>
                                                    <div className='mb-3 small text-secondary'>31 Awg 2022</div>
                                                    <div className='mb-3 text-blue h6'>Kemal Hojaýew</div>
                                                </div>
                                            </div>
                                            <div className='text-secondary'>
                                                Bu owadandy. Myhmanhananyň özi ajaýyp. işgärler gaty gowy. Biz ony gowy görýärdik. Bu gaty gowydy. Men ýene gitmek isleýärin sebäbi tagam meniň damagymda galdy. Iýmitde gaty gowy. Bu gaty üstünlikli diýip pikir edýärin.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <form className='row justify-content-center' onSubmit={clickContact}>
                                <div className="col-xl-4 mb-4">
                                    <input onChange={changeContact} name='name' type="text" className="form-control rounded-0" placeholder='Adynyz' autoComplete='off' />
                                </div>
                                <div className="col-xl-4 mb-4">
                                    <input onChange={changeContact} name='email' type="email" className="form-control rounded-0" placeholder='E-mail adresiniz' autoComplete='off' />
                                </div>
                                <div className="col-xl-8 mb-4">
                                    <input onChange={changeContact} name='subject' type="text" className="form-control rounded-0" placeholder='Temasy' autoComplete='off' />
                                </div>
                                <div className="col-xl-8 mb-4">
                                    <textarea onChange={changeContact} name='comment' typeof='string' className="form-control rounded-0" rows="6" placeholder='Mazmuny'></textarea>
                                </div>
                                <div className="col-xl-5 mb-4 text-center">
                                    <button className='btn btn-primary px-5'>Ugrat</button>
                                </div>
                            </form>
                        </div>


                        <div className='col-xl-4 col-12'>
                            <div className='card p-5 rounded-0'>
                                <div className='h4 mb-5 text-center'>Bronlamak</div>
                                <div className='row'>
                                    <div className='col-xl-12'>
                                        <label className="form-label mb-3">Giriş we Çykyş wagtlary</label>
                                        <div className='row g-0'>
                                            <div className='col-xl-6 mb-3'>
                                                <input onChange={handleChange} name='checkIn' type="date" className="form-control rounded-0 py-2 px-3" placeholder='Check In' />
                                            </div>
                                            <div className='col-xl-6 mb-3'>
                                                <input onChange={handleChange} name='checkOut' type="date" className="form-control rounded-0 py-2 px-3" placeholder='Check Out' />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-xl-12 mt-4'>
                                        <label className="form-label">Telefon belginiz</label>
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text rounded-0">+993</span>
                                            </div>
                                            <input onChange={handleChange} type="number" min="60000000" max="65999999" className="form-control" autoComplete='off' name="phoneNum" required />
                                        </div>
                                    </div>
                                    <div className="col-lg-12 mt-4">
                                        <div className="form-check">
                                            <input className='form-check-input' value={hotel.id} id="kemal" type="checkbox" name='hotelId' onChange={handleChange} />
                                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                                Yatda Sakla
                                            </label>
                                        </div>
                                    </div>
                                    <div className='col-xl-12 border-top mt-5 pt-3'>
                                        <div className='d-flex justify-content-between align-items-center'>
                                            <div className='h4'>Bahasy</div>
                                            <div className='h3 text-blue'>{room.price} <small>TMT</small></div>
                                        </div>
                                    </div>
                                    <div className='col-xl-12 d-grid mt-5'>
                                        {
                                            !authState.status
                                                ?
                                                <div className='d-grid'>
                                                    <Link to="/giris-etmek" className="btn btn-lg btn-primary btn-block  fw-bold">
                                                        Bronlamak
                                                    </Link>
                                                </div>
                                                :
                                                <div className='d-grid'>
                                                    <button onClick={bookingRoom} type="submit" className="btn btn-lg btn-primary btn-block fw-bold" id="buy-now">
                                                        Bronlamak
                                                    </button>
                                                </div>
                                        }
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

export default RoomRead