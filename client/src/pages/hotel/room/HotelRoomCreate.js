import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { creatHotelRoom } from '../../../redux/slices/hotelRooms'
import { getAllRoomTypes } from '../../../redux/slices/roomTypes'

const HotelRoomCreate = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { roomTypes } = useSelector(state => state.roomTypes)
    useEffect(() => {
        dispatch(getAllRoomTypes())
    }, [dispatch])

    const [img, setImg] = useState('')
    const [room, setRoom] = useState({
        roomtypeId: "",
        roomNum: "",
        price: "",
        capacity: "",
        description: "",
        size: "",
    })

    const handleChange = (e) => {
        setRoom((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleClick = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('img', img)
        formData.append('roomtypeId', room.roomtypeId)
        formData.append('description', room.description)
        formData.append('roomNum', room.roomNum)
        formData.append('price', room.price)
        formData.append('capacity', room.capacity)
        formData.append('size', room.size)

        console.log(formData);

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
        else if (!img) {
            toast.error("Surat yok")
        }
        else {
            dispatch(creatHotelRoom(formData))
            navigate("/myhmanhana/otaglar")
        }
    }

    return (
        <>
            <div className='container'>
                <div className='row justify-content-center'>
                    <div className='col-lg-8'>
                        <div className='pb-5'>
                            <div className='d-flex justify-content-center aling-items-center h2 mb-5'>
                                Otag goşmak
                            </div>
                            <form className='row' encType='multipart/form-data'>

                                <div className="col-lg-12 mb-3">
                                    <select name='roomtypeId' className="form-select" onChange={handleChange}>
                                        <option defaultValue>Otag görnüşini sayla</option>
                                        {roomTypes.map(roomtype => (
                                            <option key={roomtype.id} value={roomtype.id}>{roomtype.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="col-lg-6 mb-3">
                                    <label className="form-label fw-bold">Otagyň belgisi</label>
                                    <input name='roomNum' onChange={handleChange} type="number" className="form-control rounded-0" autoComplete="off" />
                                </div>

                                <div className="col-lg-6 mb-3">
                                    <label className="form-label fw-bold">Otagyň bahasy</label>
                                    <div className="input-group mb-3">
                                        <input name='price' onChange={handleChange} type="number" className="form-control rounded-0" autoComplete="off" />
                                        <span className="input-group-text rounded-0" id="basic-addon1">TMT</span>
                                    </div>
                                </div>

                                <div className="col-lg-6 mb-3">
                                    <label className="form-label fw-bold">Otagyň adam sany</label>
                                    <input name='capacity' onChange={handleChange} type="number" className="form-control rounded-0" autoComplete="off" />
                                </div>

                                <div className="col-lg-6 mb-3">
                                    <label className="form-label fw-bold">Otagyň tutýan meýdany</label>
                                    <div className="input-group mb-3">
                                        <input name='size' onChange={handleChange} type="number" className="form-control rounded-0" autoComplete="off" />
                                        <span className="input-group-text rounded-0" id="basic-addon1">m <sup>2</sup></span>
                                    </div>
                                </div>

                                <div className="col-lg-12 mb-3">
                                    <label className="form-label fw-bold">Otagyň Beyany</label>
                                    <textarea name='description' onChange={handleChange} className="form-control rounded-0" rows={8} ></textarea>
                                </div>

                                <div className="col-lg-12 mb-3">
                                    <label className="form-label fw-bold">Otagyň Suraty</label>
                                    <div className="input-group mb-3">
                                        <input name='img' onChange={(e) => setImg(e.target.files[0])} type="file" className="form-control rounded-0" autoComplete="off" />
                                    </div>
                                </div>

                                <div className='d-grid mt-3'>
                                    <button onClick={handleClick} type="submit" className="btn btn-primary">Goşmak</button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HotelRoomCreate