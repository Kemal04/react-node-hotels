import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { creatBanner } from '../../../redux/slices/banner'

const AdminBannerCreate = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [img, setImg] = useState('')
    const [banner, setBanner] = useState({
        title: "",
        description: "",
    })

    const handleChange = (e) => {
        setBanner((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleClick = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('img', img)
        formData.append('title', banner.title)
        formData.append('description', banner.description)

        if (!banner.title) {
            toast.error("Adyny ýazyň")
        }
        else if (!banner.description) {
            toast.error("Beyanyny ýazyň")
        }
        else if (!img) {
            toast.error("Surat yok")
        }
        else {
            dispatch(creatBanner(formData))
            navigate("/admin/bannerler")
        }
    }

    return (
        <>
            <div className='container'>
                <div className='row justify-content-center'>
                    <div className='col-lg-6'>
                        <div className='my-5 py-5'>
                            <div className='d-flex justify-content-center aling-items-center h2 mb-5'>
                                Banner Goşmak
                            </div>
                            <form className='row'>

                                <div className="col-lg-6 mb-3">
                                    <label className="form-label fw-bold">Ady</label>
                                    <input name='title' onChange={handleChange} type="text" className="form-control rounded-0" autoComplete="off" />
                                </div>

                                <div className="col-lg-6 mb-3">
                                    <label className="form-label fw-bold">Beyany</label>
                                    <input name='description' onChange={handleChange} type="text" className="form-control rounded-0" autoComplete="off" />
                                </div>

                                <div className="col-lg-12 mb-3">
                                    <label className="form-label fw-bold">Suraty</label>
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

export default AdminBannerCreate