import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { AuthContext } from "../../../context/AuthContext";
import { ThemeContext } from '../../../context/ThemeContext';

const Login = () => {

    const { darkMode } = useContext(ThemeContext)

    const [phoneNum, setPhoneNum] = useState("")
    const [password, setPassword] = useState("")
    const { setAuthState } = useContext(AuthContext);

    const navigate = useNavigate();

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
            await axios.post("http://localhost:3001/api/auth/login", data).then((res) => {
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
                }

            })
        }
    }

    return (
        <div style={{ height: "88vh" }} className={`d-flex align-items-center ${darkMode ? 'bg-dark text-white' : 'bg-white'}`}>
            <div className='container'>
                <div className='row align-items-center justify-content-around'>
                    <div className='col-lg-6'>
                        <img alt='' src="/img/cards/auth/1.svg" className="img-fluid" />
                    </div>
                    <div className='col-lg-4'>
                        <form onSubmit={loginUser} className={`card p-4 shadow border-0 ${darkMode ? 'bg-dark text-white' : 'bg-white'}`}>
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