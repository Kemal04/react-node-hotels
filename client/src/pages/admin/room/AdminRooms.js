import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch, useSelector } from 'react-redux'
import { deleteRoom, getAllRooms } from '../../../redux/slices/rooms'
import ReactPaginate from 'react-paginate'

const AdminRooms = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { rooms, isLoading, isError, pages } = useSelector(state => state.rooms)

    const pageCount = Math.ceil(rooms.length / 10);

    const [page, setPage] = useState(1)

    const changePage = ({ selected }) => {
        setPage(selected + 1)
    }

    useEffect(() => {
        dispatch(getAllRooms(page))
    }, [dispatch, page])

    const handleDelete = async (id) => {
        dispatch(deleteRoom(id))
        navigate("/admin/otaglar")
    }

    return (
        <>
            <div className='container py-5'>
                <div className='d-flex justify-content-between aling-items-center h2 mb-5'>
                    Otaglar bölümi
                </div>
                <div className='row'>
                    <div className='col-xl-12'>
                        <table className="table">
                            <thead className='table-dark'>
                                <tr>
                                    <th scope="col">№</th>
                                    <th scope="col">Oteli</th>
                                    <th scope="col">Görnüşi</th>
                                    <th scope="col">Belgisi</th>
                                    <th scope="col">Meýdany</th>
                                    <th scope="col">Adam sany</th>
                                    <th scope="col">Bahasy</th>
                                    <th scope="col">Pozmak</th>
                                </tr>
                            </thead>
                            <tbody>
                                {isLoading === true && <tr><td>Loading</td></tr>}
                                {isError === true && <tr><td>Error, please reload page</td></tr>}
                            </tbody>
                            <tbody >
                                {isLoading === false &&
                                    rooms.slice().sort((a, b) => (a.id < b.id) ? 1 : -1).map((room, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            {/* <td><img src={`${Api_Address}/img/${room.img}`} alt={room.roomType.name} style={{width:"100px"}}/></td> */}
                                            <td>{room.hotel.name}</td>
                                            <td>{room.roomtype.name}</td>
                                            <td>№ {room.roomNum}</td>
                                            <td>{room.size} m<sup>2</sup></td>
                                            <td>{room.capacity} adam</td>
                                            <td>{room.price}<span className='small'> TMT</span></td>
                                            <td>
                                                <button className='btn btn-sm btn-outline-danger mx-1' onClick={() => handleDelete(room.id)}><FontAwesomeIcon icon={faTrash} /></button>
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
                            pageCount={pageCount}
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

export default AdminRooms