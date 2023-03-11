import axios from 'axios'
import React, { useContext } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AuthContext } from "../../../context/AuthContext";
import { ThemeContext } from '../../../context/ThemeContext';

import register from "../../../assets/cards/auth/1.svg"
import Api_Address from '../../../env'

const Register = () => {

    const { darkMode } = useContext(ThemeContext)
    const { setAuthState } = useContext(AuthContext);

    const [username, setUsername] = useState("")
    const [phoneNum, setPhoneNum] = useState("")
    const [password, setPassword] = useState("")
    const [cPassword, setCPassword] = useState("")

    const navigate = useNavigate()

    const registerUser = async (e) => {
        e.preventDefault();

        const data = { username: username, phoneNum: phoneNum, password: password }

        if (!username) {
            toast.error("Adyňyzy ýazyň!")
        }
        else if (!phoneNum) {
            toast.error("Telefon belginizi ýazyň!")
        }
        else if (!password) {
            toast.error("Açar sözüňizi ýazyň!")
        }
        else if (!cPassword) {
            toast.error("Açar sözüňizi gaýtadan ýazyň!")
        }
        else if (cPassword !== password) {
            toast.error("Açar sözüňiz gabat gelenok !")
        }
        else if (password.length < 8) {
            toast.error("Açar sözüňiz 8-den uly bolmaly")
        }
        else {
            await axios.post(`${Api_Address}/api/auth/register`, data).then((res) => {
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
        <div style={{ height: "88vh" }} className={`d-flex align-items-center ${darkMode ? 'bg-dark text-white' : 'bg-white'}`}>
            <div className='container'>
                <div className='row align-items-center justify-content-around'>

                    <div className='col-lg-4'>
                        <form onSubmit={registerUser} className={`card p-4 shadow border-0 ${darkMode ? 'bg-dark text-white' : 'bg-white'}`}>

                            <div className="mb-5 h2 text-center">
                                Agza Bolmak
                            </div>

                            <div className="mb-4">
                                <input value={username} onChange={(e) => setUsername(e.target.value)} name="username" type="text" className="form-control" placeholder="Adyňyz" />
                            </div>

                            <div className="mb-4">
                                <div className="input-group">
                                    <span className="input-group-text px-4">+993</span>
                                    <input name='phoneNum' value={phoneNum} onChange={(e) => setPhoneNum(e.target.value)} type="number" className="form-control" placeholder='Telefon belgisi' />
                                </div>
                            </div>

                            <div className="mb-4">
                                <input value={password} onChange={(e) => setPassword(e.target.value)} name="password" type="password" className="form-control" placeholder="Açar sözi" />
                            </div>

                            <div className="mb-4">
                                <input value={cPassword} onChange={(e) => setCPassword(e.target.value)} name="cPassword" type="password" className="form-control" placeholder="Açar sözini gaytalaň" />
                            </div>

                            <div className="d-grid mb-4 mt-3">
                                <button type="submit" className="btn btn-primary">Agza Bol</button>
                            </div>

                            <div className='text-center mb-1 d-flex align-items-center justify-content-center'>
                                Meniň öň hem agza boldym ?<Link to="/giris-etmek" className='nav-link ms-2'>Giriş etmek</Link>
                            </div>

                        </form>
                    </div>

                    <div className='col-lg-6'>
                        <img alt='' src={register} className="img-fluid" />
                    </div>

                </div>
            </div>
        </div>
    )
}


export default Register