import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { ThemeContext } from '../../../context/ThemeContext';
import { AuthContext } from '../../../context/AuthContext';

import login from "../../../assets/cards/auth/1.svg"
import Api_Address from '../../../env';

const Login = () => {

    const { darkMode } = useContext(ThemeContext)
    const { setAuthState } = useContext(AuthContext);

    const [phoneNum, setPhoneNum] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    const loginUser = async (e) => {
        e.preventDefault();

        const data = { phoneNum: phoneNum, password: password }

        if (!phoneNum) {
            toast.error("Telefon belginizi ýazyň!")
        }
        else if (!password) {
            toast.error("Açar sözüňizi ýazyň!")
        }
        else if (password.length < 8) {
            toast.error("Açar sözüňiz 8-den uly bolmaly")
        }
        else {
            await axios.post(`${Api_Address}/api/auth/login`, data).then((res) => {
                if (res.data.error) {
                    toast.error(res.data.error)
                } else {
                    localStorage.setItem("accessToken", res.data.token)
                    setAuthState({
                        phoneNum: res.data.phoneNum,
                        id: res.data.id,
                        status: true,
                        role: res.data.role,
                    });
                    toast.success(res.data.success)
                    navigate("/")
                    window.location.reload()
                }

            })
        }
    }

    return (
        <div className={`d-flex align-items-center ${darkMode ? 'bg-dark text-white' : 'bg-white'}`}>
            <div className='container'>
                <div className='row align-items-center justify-content-around mt-5'>
                    <div className='col-xl-6 col-lg-6 col-md-6 col-12 my-5'>
                        <img alt='' src={login} className="img-fluid" />
                    </div>
                    <div className='col-xl-4 col-lg-6 col-md-6 col-12 my-5'>
                        <form onSubmit={loginUser} className={`card p-4 shadow border-0 ${darkMode ? 'bg-white text-dark' : 'bg-white'}`}>
                            <div className="mb-5 h2 text-center">
                                Login
                            </div>
                            <div className="mb-4">
                                <div className="input-group">
                                    <span className="input-group-text px-4">+993</span>
                                    <input name='phoneNum' value={phoneNum} onChange={(e) => setPhoneNum(e.target.value)} type="number" className="form-control" placeholder='Telefon belgisi' />
                                </div>
                            </div>
                            <div className="mb-4">
                                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" placeholder="Açar sözi" />
                            </div>
                            <div className="d-grid mb-1">
                                <button type="submit" className="btn btn-primary">Login</button>
                            </div>
                            <div className='mb-3 small'>
                                <Link to="/reset" className='nav-link'>Açar sözüni täzele</Link>
                            </div>
                            <div className='text-center mb-1 d-flex align-items-center justify-content-center'>
                                Sen agza bolmadyňmy ? <Link to="/hasaba-durmak" className='nav-link ms-2'> Agza Bol</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login