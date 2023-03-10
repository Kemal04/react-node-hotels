import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AdminBannerEdit = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation();
    const bannerId = location.pathname.split("/")[3];

    const [banner, setBanner] = useState({
        title: "",
        description: "",
        img: "",
        check: ""
    })
    const [img, setImg] = useState('')

    const uploadPicture = (e) => {
        setImg({
            picturePreview: URL.createObjectURL(e.target.files[0]),
            pictureAsFile: e.target.files[0],
        });
    };

    const handleChange = (e) => {
        setBanner((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    useEffect(() => {
        axios.get(`http://localhost:3001/api/banner/edit/${bannerId}`, {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            },
        }).then((res) => {
            setBanner(res.data.banner)
            setImg(res.data.banner.img)
        }).catch((res) => {
            toast.error(res.response.data.error)
            navigate(`/${res.response.status}`)
        })

    }, [navigate, bannerId])

    const handleClick = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('title', banner.title)
        formData.append('description', banner.description)
        formData.append('check', banner.check)
        formData.append('img', img.pictureAsFile === undefined ? img : img.pictureAsFile)

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
            await axios.post(`http://localhost:3001/api/banner/edit/${bannerId}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    accessToken: localStorage.getItem("accessToken"),
                },
            })
                .then((res) => {
                    toast.success(res.data.success)
                    navigate("/admin/bannerler")
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
                                Banner üýgetmek
                            </div>
                            <form className='row'>

                                <div className="col-lg-6 mb-3">
                                    <label className="form-label fw-bold">Ady</label>
                                    <input name='title' value={banner.title} onChange={handleChange} type="text" className="form-control rounded-0" autoComplete="off" />
                                </div>

                                <div className="col-lg-6 mb-3">
                                    <label className="form-label fw-bold">Beyany</label>
                                    <input name='description' value={banner.description} onChange={handleChange} type="text" className="form-control rounded-0" autoComplete="off" />
                                </div>

                                <div className="col-lg-12 mb-3">
                                    <label className="form-label fw-bold">Otagyň Suraty</label>
                                    <div className="input-group mb-3">
                                        <input name='img' onChange={uploadPicture} type="file" className="form-control rounded-0" autoComplete="off" />
                                    </div>
                                </div>

                                <div className="col-lg-12 mb-3">
                                    <select name='check' onChange={handleChange} className="form-select">
                                        <option value={0} defaultValue>Tassyklanmadyk</option>
                                        <option value={1}>Tassyklamak</option>
                                    </select>
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

export default AdminBannerEdit