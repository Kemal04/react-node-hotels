import React, { useEffect, useState } from 'react'
import "./Search.css"
import axios from "axios"
import { Link } from 'react-router-dom'
import Api_Address from '../../env'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const Search = () => {

    const [value, setValue] = useState("")
    const [result, setResult] = useState([])

    useEffect(() => {
        if (value.length > 0) {
            async function fetchMyAPI() {
                const resHotel = await axios.get(`${Api_Address}/api/hotel`)
                try {
                    setResult([])
                    let searchQuery = value.toLowerCase();

                    const hotels = resHotel.data.hotels

                    // const roomTypes = resRoomType.data.roomTypes

                    for (const key in hotels) {
                        let hotel = hotels[key].name.toLowerCase();
                        if (hotel.slice(0, searchQuery.length).indexOf(searchQuery) !== -1) {
                            setResult(prevResult => {
                                return [...prevResult, hotels[key]]
                            });
                        }
                    }

                    // for (const key in roomTypes) {
                    //     let roomType = roomTypes[key].name.toLowerCase();
                    //     if (roomType.slice(0, searchQuery.length).indexOf(searchQuery) !== -1) {
                    //         setResult(prevResult => {
                    //             return [...prevResult, roomTypes[key].name]
                    //         });
                    //     }
                    // }

                } catch (error) {
                    console.log(error);
                }
            }
            fetchMyAPI()
        }
        else {
            setResult([])
        }
    }, [value])

    return (
        <>
            <form className="d-flex" role="search">
                <div className="input-group">
                    <input className="form-control" type="search" placeholder="Search" aria-label="Search" required onChange={(e) => setValue(e.target.value)} value={value} />
                    <span className="input-group-text" id="basic-addon1"><FontAwesomeIcon icon={faSearch} /></span>
                </div>
            </form>
            <div className='position-relative'>
                <div className='position-absolute shadow w-100 text-white' style={{ zIndex: "1", backgroundColor: "rgb(14, 39, 55)" }}>
                    {
                        result.map((res, index) => (
                            <Link to={`/myhmanhanalar/${res.id}`} className='p-3 d-block text-center text-white text-decoration-none' key={index}>
                                {res.name}
                            </Link>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default Search