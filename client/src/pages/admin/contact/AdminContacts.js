import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { deleteContact, getAllContacts } from '../../../redux/slices/contact'
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactPaginate from 'react-paginate';

const AdminContact = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch();

    const { contacts, isLoading, isError } = useSelector(state => state.contacts)

    const pageCount = Math.ceil(contacts.length / 10);

    const [page, setPage] = useState(1)

    const changePage = ({ selected }) => {
        setPage(selected + 1)
    }

    const [contact, setContact] = useState([])
    useEffect(() => {
        setContact(contacts)
    }, [contacts])

    useEffect(() => {
        dispatch(getAllContacts(page))
    }, [dispatch, page])

    const handleDelete = async (id) => {
        dispatch(deleteContact(id))
        navigate("/admin/teswirler")
    }


    return (
        <>
            <div className='container py-5'>
                <div className='d-flex justify-content-between aling-items-center h2 mb-5'>
                    Teswirler bölümi
                </div>
                <div className='row'>
                    <div className='col-lg-12'>
                        <table className="table">
                            <thead className='table-dark'>
                                <tr>
                                    <th scope="col">№</th>
                                    <th scope="col">Ady</th>
                                    <th scope="col">E-mail adresi</th>
                                    <th scope="col">Temasy</th>
                                    <th scope="col">Mazmuny</th>
                                    <th scope="col">Düzetmek</th>
                                </tr>
                            </thead>
                            <tbody>
                                {isLoading === true && <tr><td>Loading</td></tr>}
                                {isError === true && <tr><td>Error, please reload page</td></tr>}
                            </tbody>
                            <tbody>
                                {isLoading === false &&
                                    contact.slice().sort((a, b) => (a.id < b.id) ? 1 : -1).map((contact, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{contact.name}</td>
                                            <td>{contact.email}</td>
                                            <td>{contact.subject}</td>
                                            <td>{contact.comment.substring(0, 40)}...</td>
                                            <td>
                                                <Link className='me-3 btn btn-sm btn-warning' to={`/admin/teswir-uytgetmek/${contact.id}`}><FontAwesomeIcon icon={faPencil} /></Link>
                                                <button className='btn btn-sm btn-danger' onClick={() => handleDelete(contact.id)}><FontAwesomeIcon icon={faTrash} /></button>
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

export default AdminContact