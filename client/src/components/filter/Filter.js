import React, { useState } from 'react'
import "../../pages/userInterface/room/room.css"

const Filter = () => {

    const [rememberUser, setRememberUser] = useState(true)

    return (
        <>
            <div className='row'>

                <div className='col-xl-12 mt-5 mb-3' >
                    <div className='label mb-3 fw-bold small'>Otag görnüşleri</div>
                    <div className="d-flex justify-content-center flex-column">
                        <div className="small mb-2" style={{ cursor: "pointer" }} >
                            Standart Otag
                        </div>
                        <div className="small mb-2" style={{ cursor: "pointer" }}>
                            Hemmesi
                        </div>
                    </div>
                </div>

                <div className='col-xl-12 mb-3'>
                    <div className='label mb-3 fw-bold small'>Hoteller</div>
                    <div className="d-flex justify-content-center flex-column" style={{ overflowY: "auto" }}>
                        <div style={{ height: "150px" }}>

                            <label className="small mb-2 fw-normal d-flex align-items-center position-relative ps-4 check" style={{ cursor: "pointer", userSelect: "none" }}>Berkarar
                                <input onChange={() => { setRememberUser(!rememberUser) }} type="checkbox" className="opacity-0" />
                                <span className="position-absolute top-0 start-0 bg-light checkmark" style={{ height: "20px", width: "20px" }}></span>
                            </label>

                            <label className="small mb-2 fw-normal d-flex align-items-center position-relative ps-4 check" style={{ cursor: "pointer", userSelect: "none" }}>Yelken
                                <input onChange={() => { setRememberUser(!rememberUser) }} type="checkbox" className="opacity-0" />
                                <span className="position-absolute top-0 start-0 bg-light checkmark" style={{ height: "20px", width: "20px" }}></span>
                            </label>

                            <label className="small mb-2 fw-normal d-flex align-items-center position-relative ps-4 check" style={{ cursor: "pointer", userSelect: "none" }}>Gami
                                <input onChange={() => { setRememberUser(!rememberUser) }} type="checkbox" className="opacity-0" />
                                <span className="position-absolute top-0 start-0 bg-light checkmark" style={{ height: "20px", width: "20px" }}></span>
                            </label>

                            <label className="small mb-2 fw-normal d-flex align-items-center position-relative ps-4 check" style={{ cursor: "pointer", userSelect: "none" }}>Ashgabat
                                <input onChange={() => { setRememberUser(!rememberUser) }} type="checkbox" className="opacity-0" />
                                <span className="position-absolute top-0 start-0 bg-light checkmark" style={{ height: "20px", width: "20px" }}></span>
                            </label>

                            <label className="small mb-2 fw-normal d-flex align-items-center position-relative ps-4 check" style={{ cursor: "pointer", userSelect: "none" }}>Tolkun
                                <input onChange={() => { setRememberUser(!rememberUser) }} type="checkbox" className="opacity-0" />
                                <span className="position-absolute top-0 start-0 bg-light checkmark" style={{ height: "20px", width: "20px" }}></span>
                            </label>

                            <label className="small mb-2 fw-normal d-flex align-items-center position-relative ps-4 check" style={{ cursor: "pointer", userSelect: "none" }}>Ahal
                                <input onChange={() => { setRememberUser(!rememberUser) }} type="checkbox" className="opacity-0" />
                                <span className="position-absolute top-0 start-0 bg-light checkmark" style={{ height: "20px", width: "20px" }}></span>
                            </label>

                            <label className="small mb-2 fw-normal d-flex align-items-center position-relative ps-4 check" style={{ cursor: "pointer", userSelect: "none" }}>Balkan
                                <input onChange={() => { setRememberUser(!rememberUser) }} type="checkbox" className="opacity-0" />
                                <span className="position-absolute top-0 start-0 bg-light checkmark" style={{ height: "20px", width: "20px" }}></span>
                            </label>

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