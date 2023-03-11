import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { getAllRoomTypes } from '../../../redux/slices/roomTypes'
import Api_Address from '../../../env';

const HotelRoomEdit = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation();
    const roomId = location.pathname.split("/")[3];

    const { roomTypes } = useSelector(state => state.roomTypes)
    useEffect(() => {
        dispatch(getAllRoomTypes())
    }, [dispatch])


    const [roomType, setRoomType] = useState('')
    const [room, setRoom] = useState({
        roomtypeId: "",
        roomNum: "",
        price: "",
        capacity: "",
        size: "",
        description: "",
        img: "",
    })
    const [img, setImg] = useState('')

    const uploadPicture = (e) => {
        setImg({
            picturePreview: URL.createObjectURL(e.target.files[0]),
            pictureAsFile: e.target.files[0],
        });
    };

    const handleChange = (e) => {
        setRoom((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    useEffect(() => {
        axios.get(`${Api_Address}/api/hotelRoom/edit/${roomId}`, {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            },
        }).then((res) => {
            setRoom(res.data.room)
            setRoomType(res.data.room.roomtype)
            setImg(res.data.room.img)
        }).catch((res) => {
            toast.error(res.response.data.error)
            navigate(`/${res.response.status}`)
        })

    }, [navigate, roomId])

    const handleClick = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('roomtypeId', room.roomtypeId === undefined ? roomType.id : room.roomtypeId)
        formData.append('roomNum', room.roomNum)
        formData.append('price', room.price)
        formData.append('description', room.description)
        formData.append('capacity', room.capacity)
        formData.append('size', room.size)
        formData.append('img', img.pictureAsFile === undefined ? img : img.pictureAsFile)


        if (!room.roomtypeId) {
            toast.error("Otagyň görnüşini saýlaň")
        }
        else if (!room.roomNum) {
            toast.error("Adyny ýazyň")
        }
        else if (!room.price) {
            toast.error("Bahasyny ýazyň")
        }
        else if (!room.description) {
            toast.error("Beyany yazyn")
        }
        else if (!room.capacity) {
            toast.error("Adam sanyny ýazyň")
        }
        else if (!room.size) {
            toast.error("Tutýan meýdanyny ýazyň")
        }
        else {
            await axios.post(`${Api_Address}/api/hotelRoom/edit/${roomId}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    accessToken: localStorage.getItem("accessToken"),
                },
            })
                .then((res) => {
                    toast.success(res.data.success)
                    navigate("/hotel/otaglar")
                }).catch((res) => {
                    toast.error(res.response.data.error)
                    navigate(`/${res.response.status}`)
                })
        }
    }

    return (
        <>
            <div className='container'>
                <div className='row justify-content-center'>
                    <div className='col-lg-8'>
                        <div className='my-5 py-5'>
                            <div className='d-flex justify-content-center aling-items-center h2 mb-5'>
                                Otag üýgetmek
                            </div>
                            <form className='row'>

                                <div className="col-lg-12 mb-3">
                                    <select name='roomtypeId' onChange={handleChange} className="form-select">
                                        <option value={roomType.id} defaultValue>{roomType.name}</option>
                                        {roomTypes.map(roomtype => (
                                            <option key={roomtype.id} value={roomtype.id}>{roomtype.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="col-lg-6 mb-3">
                                    <label className="form-label fw-bold">Otagyň Ady</label>
                                    <input name='roomNum' value={room.roomNum} onChange={handleChange} type="number" className="form-control rounded-0" autoComplete="off" />
                                </div>

                                <div className="col-lg-6 mb-3">
                                    <label className="form-label fw-bold">Otagyň Bahasy</label>
                                    <div className="input-group mb-3">
                                        <input name='price' value={room.price} onChange={handleChange} type="number" className="form-control rounded-0" aria-describedby="basic-addon1" autoComplete="off" />
                                        <span className="input-group-text rounded-0" id="basic-addon1">TMT</span>
                                    </div>
                                </div>

                                <div className="col-lg-6 mb-3">
                                    <label className="form-label fw-bold">Otagyň Adam Sany</label>
                                    <input name='capacity' value={room.capacity} onChange={handleChange} type="number" className="form-control rounded-0" autoComplete="off" />
                                </div>

                                <div className="col-lg-6 mb-3">
                                    <label className="form-label fw-bold">Otagyň Tutýan Meýdany</label>
                                    <div className="input-group mb-3">
                                        <input name='size' value={room.size} onChange={handleChange} type="number" className="form-control rounded-0" aria-describedby="basic-addon1" autoComplete="off" />
                                        <span className="input-group-text rounded-0" id="basic-addon1">ft</span>
                                    </div>
                                </div>
                                
                                <div className="col-lg-12 mb-3">
                                    <label className="form-label fw-bold">Otagyň Beyany</label>
                                    <textarea name='description' value={room.description} onChange={handleChange} className="form-control rounded-0" rows={8} ></textarea>
                                </div>

                                <div className="col-lg-12 mb-3">
                                    <label className="form-label fw-bold">Otagyň Suraty</label>
                                    <div className="input-group mb-3">
                                        <input name='img' onChange={uploadPicture} type="file" className="form-control rounded-0" autoComplete="off" />
                                    </div>
                                </div>

                                <div className='d-grid mt-3'>
                                    <button onClick={handleClick} type="submit" className="btn btn-primary">Üýgetmek</button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HotelRoomEdit