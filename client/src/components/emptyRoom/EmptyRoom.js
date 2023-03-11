import React from 'react'

import empty from "../../assets/icons/empty.gif"
const EmptyRoom = () => {
    return (
        <div className='d-flex justify-content-center align-items-center'>
            <img src={empty} className="img-fluid w-50" alt='GIF' />
        </div>
    )
}

export default EmptyRoom