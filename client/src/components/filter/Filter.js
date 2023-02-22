import React from 'react'
import "../../pages/userInterface/room/room.css"

const Filter = ({ filterItem, setRoom, roomType, rooms, filterHotel, hotel }) => {
    return (
        <>
            <div className='row'>

                <div className='col-xl-12 mt-5 mb-3' >
                    <div className='label mb-3 fw-bold small'>Otag görnüşleri</div>
                    <div className="d-flex justify-content-center flex-column">
                        {roomType.map((name, id) => {
                            return (
                                <div className="small mb-2" style={{ cursor: "pointer" }} onClick={() => filterItem(name)} key={id} >
                                    {name} Otag
                                </div>
                            )
                        })}
                        <div className="small mb-2" style={{ cursor: "pointer" }} onClick={() => setRoom(rooms)} >
                            Hemmesi
                        </div>
                    </div>
                </div>

                <div className='col-xl-12 mb-3'>
                    <div className='label mb-3 fw-bold small'>Hoteller</div>
                    <div className="d-flex justify-content-center flex-column" style={{ overflowY: "auto" }}>
                        <div style={{ height: "150px" }}>

                            {hotel.map((hotel, index) => {
                                return (
                                    <label key={index} className="small mb-2 fw-normal d-flex align-items-center position-relative ps-4 check" style={{ cursor: "pointer", userSelect: "none" }}>{hotel.name}
                                        <input id={hotel.id} onChange ={() => filterHotel(hotel.name)} type="checkbox" className="opacity-0" />
                                        <span className="position-absolute top-0 start-0 bg-light checkmark" style={{ height: "20px", width: "20px" }}></span>
                                    </label>
                                )
                            })}
                            <div className="small mb-2" style={{ cursor: "pointer" }} onClick={() => setRoom(rooms)} >
                                Hemmesi
                            </div>
                        </div>
                    </div>
                </div>

                <div className='col-xl-12 mb-3'>
                    <div className='label mb-3 fw-bold small'>Adam sany</div>
                    <div className="d-flex justify-content-center flex-column">

                        <label className="small mb-2 fw-normal d-flex align-items-center position-relative ps-4 check" style={{ cursor: "pointer", userSelect: "none" }}>1 we 2 adamlyk
                            <input type="radio" className="opacity-0" />
                            <span className="position-absolute top-0 start-0 bg-light checkmark" style={{ height: "20px", width: "20px" }}></span>
                        </label>

                        <label className="small mb-2 fw-normal d-flex align-items-center position-relative ps-4 check" style={{ cursor: "pointer", userSelect: "none" }}>3 we 4 adamlyk
                            <input type="radio" className="opacity-0" />
                            <span className="position-absolute top-0 start-0 bg-light checkmark" style={{ height: "20px", width: "20px" }}></span>
                        </label>

                        <label className="small mb-2 fw-normal d-flex align-items-center position-relative ps-4 check" style={{ cursor: "pointer", userSelect: "none" }}>5 köp adamlyk
                            <input type="radio" className="opacity-0" />
                            <span className="position-absolute top-0 start-0 bg-light checkmark" style={{ height: "20px", width: "20px" }}></span>
                        </label>

                    </div>
                </div>

            </div>
        </>
    )
}

export default Filter