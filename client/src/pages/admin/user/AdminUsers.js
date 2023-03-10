import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUsers, getAllUsers } from '../../../redux/slices/users';
import ReactPaginate from 'react-paginate';

const AdminUsers = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { users, isLoading, isError, pages } = useSelector(state => state.users)

    const pageCount = Math.ceil(users.length / 10);

    const [page, setPage] = useState(1)

    const changePage = ({ selected }) => {
        setPage(selected + 1)
    }

    useEffect(() => {
        dispatch(getAllUsers(page))
    }, [dispatch, page])

    const handleDelete = async (id) => {
        dispatch(deleteUsers(id))
        navigate("/admin/ulanyjylar")
    }

    return (
        <>
            <div className='container py-5'>
                <div className='d-flex justify-content-between aling-items-center h2 mb-5'>
                    Ulanyjylar bölümi
                    <Link to="/"><FontAwesomeIcon className='text-dark' icon={faPlus} /></Link>
                </div>
                <div className='row'>
                    <div className='col-lg-12'>
                        <table className="table">
                            <thead className='table-dark'>
                                <tr>
                                    <th scope="col">№</th>
                                    <th scope="col">Ulanyjy ady</th>
                                    <th scope="col">Familyasy</th>
                                    <th scope="col">Telefon Belgisi</th>
                                    <th scope="col">E-mail adresi</th>
                                    <th scope="col">Duzeltmek</th>
                                </tr>
                            </thead>
                            <tbody>
                                {isLoading === true && <tr><td>Loading</td></tr>}
                                {isError === true && <tr><td>Error, please reload page</td></tr>}
                            </tbody>
                            <tbody>
                                {isLoading === false &&
                                    users.slice().sort((a, b) => (a.id < b.id) ? 1 : -1).map((user, index) => (
                                        <tr key={index} className={user.role === "Admin" ? "fw-bold bg-light" : null}>
                                            <td>{index + 1}</td>
                                            <td>{user.username}</td>
                                            <td>{user.surname === null ? "girizilmedik" : user.surname}</td>
                                            <td>+993 {user.phoneNum}</td>
                                            <td>{user.email === null ? "girizilmedik" : user.email}</td>
                                            <td>
                                                <button className='btn btn-sm btn-outline-danger mx-1' onClick={() => handleDelete(user.id)}><FontAwesomeIcon icon={faTrash} /></button>
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

export default AdminUsers