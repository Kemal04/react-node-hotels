import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { deleteHotel, getAllHotels } from '../../../redux/slices/hotels'
import ReactPaginate from 'react-paginate';

const AdminHotels = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { hotels, isLoading, isError, pages } = useSelector(state => state.hotels)

    const [page, setPage] = useState(1)

    const changePage = ({ selected }) => {
        setPage(selected + 1)
    }

    useEffect(() => {
        dispatch(getAllHotels(page))
    }, [dispatch, page])

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
                                {isLoading === true && <tr><td>Loading</td></tr>}
                                {isError === true && <tr><td>Error, please reload page</td></tr>}
                            </tbody>
                            <tbody>
                                {isLoading === false &&
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
                    <nav className='col-xl-12 d-flex justify-content-center'>
                        <ReactPaginate
                            previousLabel="< previous"
                            nextLabel="next >"
                            pageCount={pages}
                            onPageChange={changePage}
                            containerClassName={"pagination"}
                            pageLinkClassName={"page-link"}
                            previousLinkClassName={"page-link"}
                            nextLinkClassName={"page-link"}
                            activeLinkClassName={"page-link active"}
                            disabledLinkClassName={"page-link disabled"}
                        />
                    </nav>
                </div>
            </div>
        </>
    )
}

export default AdminHotels