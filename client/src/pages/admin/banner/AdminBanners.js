import { faPencil, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { getAllBanners, deleteBanner } from '../../../redux/slices/banner'

const AdminBanners = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { banners, isLoading, isError } = useSelector(state => state.banner)

    useEffect(() => {
        dispatch(getAllBanners())
    }, [dispatch])

    const handleDelete = async (id) => {
        dispatch(deleteBanner(id))
        navigate("/admin/bannerler")
    }
    return (
        <>
            <div className='container py-5'>
                <div className='d-flex justify-content-between aling-items-center h2 mb-5'>
                    Bannerler bölümi
                    <Link to="/admin/banner-gosmak"><FontAwesomeIcon className='text-dark' icon={faPlus} /></Link>
                </div>
                <div className='row'>
                    <div className='col-lg-12'>
                        <table className="table">
                            <thead className='table-dark'>
                                <tr>
                                    <th scope="col">№</th>
                                    <th scope="col">Suraty</th>
                                    <th scope="col">Ady</th>
                                    <th scope="col">Beýany</th>
                                    <th scope="col">Düzetmek</th>
                                </tr>
                            </thead>
                            <tbody>
                                {isLoading === true && <tr><td>Loading</td></tr>}
                                {isError === true && <tr><td>Error, please reload page</td></tr>}
                            </tbody>
                            <tbody>
                                {isLoading === false &&
                                    banners.slice().sort((a, b) => (a.id < b.id) ? 1 : -1).map((banner, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{banner.img}</td>
                                            <td>{banner.title}</td>
                                            <td>{banner.description}</td>
                                            <td>
                                                <Link className='me-3 btn btn-sm btn-outline-warning mx-1' to={`/admin/banner-uytgetmek/${banner.id}`}><FontAwesomeIcon icon={faPencil} /></Link>
                                                <button className='btn btn-sm btn-outline-danger mx-1' onClick={() => handleDelete(banner.id)}><FontAwesomeIcon icon={faTrash} /></button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminBanners