import React, { useContext, useEffect, useState } from 'react'
import '@splidejs/react-splide/css';
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import { ThemeContext } from '../../../context/ThemeContext';
import BannerImg from '../../../components/banner/BannerImg';
import { AuthContext } from '../../../context/AuthContext';
import { useDispatch, useSelector } from 'react-redux';
import { creatBooking } from '../../../redux/slices/bookings'
import { creatRoomContact, getSingleRoomContacts } from '../../../redux/slices/roomContacts';
import icon_air from "../../../assets/icons/air.png"
import icon_drinks from "../../../assets/icons/drinks.png"
import icon_plate from "../../../assets/icons/plate.png"
import icon_tv from "../../../assets/icons/tv.png"
import icon_wifi from "../../../assets/icons/wifi.png"
import icon_contact from "../../../assets/icons/contact.png"
import user_icon from "../../../assets/icons/user-1.jpg"
import Api_Address from '../../../env';
import { DatePicker } from 'antd';
import 'antd/dist/reset.css';
import moment from "moment"

const { RangePicker } = DatePicker;

const RoomRead = () => {

    const option = {
        type: 'loop',
        perPage: 1,
        perMove: 1,
        paginations: true,
        autoplay: true,
    };

    //CONTEXT
    const { authState } = useContext(AuthContext)
    const { darkMode } = useContext(ThemeContext)

    //CONST'S
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation();
    const roomId = location.pathname.split("/")[2];

    //STATE'S
    const [room, setRoom] = useState("")
    const [roomType, setRoomType] = useState("")
    const [hotel, setHotel] = useState("")

    //DATE
    const [fromdate, setFromdate] = useState()
    const [todate, setTodate] = useState()
    const [totalAmount, setTotalAmount] = useState()

    const fromdateTotal = moment(fromdate, 'DD-MM-YYYY')
    const todateTotal = moment(todate, 'DD-MM-YYYY')
    const totalDays = moment.duration(todateTotal.diff(fromdateTotal)).asDays()

    function filterDate(dates) {
        setFromdate(moment(dates[0])._i.format("DD-MM-YYYY"))
        setTodate(moment(dates[1])._i.format("DD-MM-YYYY"))
    }

    const [currentBooking, setCurrentBooking] = useState([])

    useEffect(() => {
        axios.get(`${Api_Address}/api/booking/currentBooking`).then((res) => {
            setCurrentBooking(res.data.currentBooking)
        }).catch((err) => {
            toast.error(err.message)
        })
    }, []);

    function disabledDate(current) {
        
    }

    //BOOKING
    const [booking, setBooking] = useState({
        roomId: roomId,
        hotelId: "",
        checkIn: fromdate,
        checkOut: todate,
        totalDays: totalDays,
        totalAmount: totalAmount,
        phoneNum: "",
    })

    const handleChange = (e) => {
        setBooking((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }


    //CONTACT
    const { roomContacts } = useSelector(state => state.roomContacts)

    useEffect(() => {
        dispatch(getSingleRoomContacts({ roomId }))
    }, [dispatch, roomId])

    const [contact, setContact] = useState({
        roomId: roomId,
        hotelId: "",
        name: "",
        email: "",
        subject: "",
        comment: "",
    })

    const changeContact = (e) => {
        setContact((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    //BOOKING
    useEffect(() => {
        axios.get(`${Api_Address}/api/room/${roomId}`).then((res) => {
            setRoom(res.data.room)
            setRoomType(res.data.room.roomtype)
            setHotel(res.data.room.hotel)
            setTotalAmount(totalDays * room.price)
            contact.hotelId = res.data.room.hotel.id
            booking.hotelId = res.data.room.hotel.id
            booking.checkIn = fromdate
            booking.checkOut = todate
            booking.totalAmount = totalAmount
            booking.totalDays = totalDays
        }).catch((err) => {
            toast.error(err.message)
        })
    }, [booking, contact, fromdate, room.price, roomId, todate, totalAmount, totalDays]);

    const bookingRoom = async (e) => {
        e.preventDefault()

        if (!booking.checkIn) {
            toast.error("Giriş wagtyny ýazyň")
        }
        else if (!booking.checkOut) {
            toast.error("Çykyş wagtyny ýazyň")
        }
        else if (!booking.phoneNum) {
            toast.error("Telefon belgiňizi ýazyň")
        }
        else if (booking.phoneNum.length < 8) {
            toast.error("Telefon belgisi 8 sandan ybarat bolmaly")
        }
        else if (booking.phoneNum.length > 8) {
            toast.error("Telefon belgisi 8 sandan ybarat bolmaly")
        }
        else {
            dispatch(creatBooking(booking))
            navigate("/")
        }
    }

    //CONTACT
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
                                        <img src={room.img ? `${Api_Address}/img/${room.img}` : '/img/cards/room/1.jpg'} alt="" className='img-fluid w-100' style={{ height: "500px", objectFit: "cover" }} />
                                    </SplideSlide>
                                </SplideTrack>
                            </Splide>
                            <div className='row border p-4' style={{ fontWeight: "500" }}>
                                <div className='col-xl-3 col-6 mt-3 d-flex flex-column align-items-center border-end'>
                                    <div style={{ color: "#afb4bf" }}>Tutýan meýdan :</div>
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
                            <div className='row my-5 align-items-center p-2'>
                                <div className='col-xl-12 p-0 h4'>
                                    Otag Hyzmatlary
                                </div>
                                <div className='col-xl-4 col-6 p-0 d-flex align-items-center my-4'>
                                    <img src={icon_air} alt="Air" className='img-fluid me-3' />
                                    <div>Kondisioner</div>
                                </div>
                                <div className='col-xl-4 col-6 p-0 d-flex align-items-center my-4'>
                                    <img src={icon_drinks} alt="Air" className='img-fluid me-3' />
                                    <div>Mugt içgiler</div>
                                </div>
                                <div className='col-xl-4 col-6 p-0 d-flex align-items-center my-4'>
                                    <img src={icon_plate} alt="Air" className='img-fluid me-3' />
                                    <div>Restoran</div>
                                </div>
                                <div className='col-xl-4 col-6 p-0 d-flex align-items-center mt-4'>
                                    <img src={icon_tv} alt="Air" className='img-fluid me-3' />
                                    <div>Telewizor</div>
                                </div>
                                <div className='col-xl-4 col-6 p-0 d-flex align-items-center mt-4'>
                                    <img src={icon_wifi} alt="Air" className='img-fluid me-3' />
                                    <div>Güýçli Wifi</div>
                                </div>
                                <div className='col-xl-4 col-6 p-0 d-flex align-items-center mt-4'>
                                    <img src={icon_contact} alt="Air" className='img-fluid me-3' />
                                    <div>Habarlaşmak 7/24</div>
                                </div>
                            </div>
                            <form className='row justify-content-between my-5 p-2'>
                                <div className='col-xl-12 p-0 h4'>
                                    Otag barada teswir ugrat
                                </div>
                                <div className="col-xl-6 my-4">
                                    <input onChange={changeContact} name='name' type="text" className="form-control rounded-0" placeholder='Adynyz' autoComplete='off' />
                                </div>
                                <div className="col-xl-6 my-4">
                                    <input onChange={changeContact} name='email' type="email" className="form-control rounded-0" placeholder='E-mail adresiniz' autoComplete='off' />
                                </div>
                                <div className="col-xl-12 mb-4">
                                    <input onChange={changeContact} name='subject' type="text" className="form-control rounded-0" placeholder='Temasy' autoComplete='off' />
                                </div>
                                <div className="col-xl-12 mb-4">
                                    <textarea onChange={changeContact} name='comment' typeof='string' className="form-control rounded-0" rows="6" placeholder='Mazmuny'></textarea>
                                </div>
                                <div className="col-xl-12 mb-4 text-center">
                                    {
                                        !authState.status
                                            ?
                                            <div title='Giriş etmän Teswir ýazyp bilmeýäňiz' className='btn btn-primary px-5' style={{ cursor: "pointer" }}>Ugrat</div>
                                            :
                                            <button onClick={clickContact} className='btn btn-primary px-5'>Ugrat</button>
                                    }
                                </div>
                            </form>
                            <div className='row my-5 align-items-center'>
                                <div className='col-xl-12 p-0 h4'>
                                    Otag barada teswirler:
                                </div>
                                {
                                    roomContacts.map((contact, index) => (
                                        <div className='col-xl-12 p-0 mt-5 text-xl-start text-lg-start text-md-start' key={index}>
                                            <div className='row align-items-center justify-content-center'>
                                                <div className='col-xl-2 col-4 border-end'>
                                                    <img src={user_icon} alt="User" className='rounded-circle' style={{ width: "100px" }} />
                                                </div>
                                                <div className='col-xl-10 col-8 mt-2'>
                                                    <div className='row justify-content-between align-items-center'>
                                                        <div className='col-xl-3 col-12'>
                                                            <div className='mb-3 small text-secondary'>{new Date(contact.createdAt).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}</div>
                                                            <div className='mb-3 text-blue h6'>{contact.name}</div>
                                                        </div>
                                                    </div>
                                                    <div className='text-secondary'>
                                                        {contact.comment}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>


                        <div className='col-xl-4 col-12'>
                            <div className='card p-5 rounded-0'>
                                <div className='h4 mb-5 text-center'>Bronlamak</div>
                                <div className='row'>
                                    <div className='col-xl-12'>
                                        <label className="form-label mb-3">Giriş we Çykyş wagtlary</label>
                                        <div className='row g-0'>
                                            <div className='col-xl-12 mb-3'>
                                                <RangePicker format="DD-MM-YYYY" onChange={filterDate} disabledDate={disabledDate} />
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
                                    <div className='col-xl-12 mb-2 border-top mt-5 pt-3'>
                                        <div className='d-flex justify-content-between align-items-center'>
                                            <div>Giris wagty</div>
                                            <div className='font-italic'>{!fromdate ? "DD-MM-YYYY" : fromdate}</div>
                                        </div>
                                    </div>
                                    <div className='col-xl-12 mb-2'>
                                        <div className='d-flex justify-content-between align-items-center'>
                                            <div>Cykys wagty</div>
                                            <div className='font-italic'>{!todate ? "DD-MM-YYYY" : todate}</div>
                                        </div>
                                    </div>
                                    <div className='col-xl-12 mb-2'>
                                        <div className='d-flex justify-content-between align-items-center'>
                                            <div>Planca gun</div>
                                            <div className='font-italic'>{!totalDays ? "0" : totalDays}</div>
                                        </div>
                                    </div>
                                    <div className='col-xl-12 border-top pt-3'>
                                        <div className='d-flex justify-content-between align-items-center'>
                                            <div className='h4'>Bahasy</div>
                                            <div className='h3 text-blue'>{!totalAmount ? room.price : totalAmount} <small>TMT</small></div>
                                        </div>
                                    </div>
                                    <div className='col-xl-12 d-grid mt-5'>
                                        {
                                            !authState.status
                                                ?
                                                <div className='d-grid'>
                                                    <div title='Giriş etmän Bronlamak ýapykdyr' className="btn btn-lg btn-primary btn-block fw-bold" style={{ cursor: "pointer" }}>
                                                        Bronlamak
                                                    </div>
                                                </div>
                                                :
                                                <div className='d-grid'>
                                                    <button onClick={bookingRoom} type="submit" className="btn btn-lg btn-primary btn-block fw-bold">
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