import React from 'react'

const AdminLogin = () => {
    return (
        <div style={{ height: "100vh" }} className='bg-dark d-flex justify-content-center align-items-center'>
            <form className='card border-0 shadow p-5 rounded-0 bg-dark'>
                <div className='h2 text-center text-white mx-5 mb-5'>Admin Panel</div>
                <div class="mb-3">
                    <input type="email" class="form-control rounded-0 bg-dark border-0" style={{ backgroundColor: "" }} placeholder='Email address' />
                </div>
                <div class="mb-5">
                    <input type="password" class="form-control rounded-0 bg-dark border-0" style={{ backgroundColor: "" }} placeholder='Password' />
                </div>
                <button type="submit" class="btn btn-primary rounded-0">Giriş</button>
            </form>
        </div>
    )
}

export default AdminLogin