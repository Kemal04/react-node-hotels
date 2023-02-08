import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { deleteHotel, getAllHotels } from '../../../redux/slices/hotels'

const AdminHotels = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { hotels } = useSelector(state => state.hotels)

    useEffect(() => {
        dispatch(getAllHotels())
    }, [dispatch])

    const handleDelete = async (id) => {
        dispatch(deleteHotel(id))
        navigate("/admin/hotellar")
    }

    return (
        <>
            <div className='container py-5'>
                <div className='d-flex justify-content-between aling-items-center h2 mb-5'>
                    Hotellar bölümi
                    <Link to="/admin/hotel-gosmak"><FontAwesomeIcon className='text-dark' icon={faPlus} /></Link>
                </div>
                <div className='row'>
                    <div className='col-lg-12'>
                        <table className="table">
                            <thead className='table-dark'>
                                <tr>
                                    <th scope="col">№</th>
                                    <th scope="col">Ady</th>
                                    <th scope="col">E-mail adresi</th>
                                    <th scope="col">Acar sozi</th>
                                    <th scope="col">Düzetmek</th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    hotels.slice().sort((a, b) => (a.id < b.id) ? 1 : -1).map((hotel, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{hotel.name}</td>
                                            <td>{hotel.email}</td>
                                            <td>*************</td>
                                            <td>
                                                <Link className='me-3 btn btn-sm btn-outline-warning mx-1' to={`/admin/hotel-uytgetmek/${hotel.id}`}><FontAwesomeIcon icon={faPencil} /></Link>
                                                <button className='btn btn-sm btn-outline-danger mx-1' onClick={() => handleDelete(hotel.id)}><FontAwesomeIcon icon={faTrash} /></button>
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

export default AdminHotels