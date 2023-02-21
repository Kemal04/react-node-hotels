import React, { useContext, useState } from 'react'
import { ThemeContext } from '../../../context/ThemeContext'
import BannerImg from "../../../components/banner/BannerImg"
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { creatContact } from '../../../redux/slices/contact'

const Contact = () => {

    const { darkMode } = useContext(ThemeContext)

    const dispatch = useDispatch();

    const [contact, setContact] = useState({
        name: "",
        email: "",
        subject: "",
        comment: "",
    })

    const handleChange = (e) => {
        setContact((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const navigate = useNavigate()

    const handleClick = async (e) => {
        e.preventDefault()

        console.log(typeof(contact.name));

        if (!contact.name) {
            toast.error("Adyňyzy ýazyň")
        }
        else if (!contact.email) {
            toast.error("E-mail adresiňizi ýazyň")
        }
        else if (!contact.subject) {
            toast.error("Temaňyzy ýazyň")
        }
        else if (!contact.comment) {
            toast.error("Teswiriňizi ýazyň")
        }
        else if (contact.comment.length < 25) {
            toast.error("Teswiriňizi 25 harpdan ybarat bolmaly")
        }
        else {
            dispatch(creatContact(contact))
            navigate("/")
        }
    }

    return (
        <>
            <div className={darkMode ? 'bg-dark text-white' : 'bg-white'}>
                <BannerImg name="Habarlaşmak" />
                <div className='container pb-5' style={{ marginTop: "-80px" }}>
                    <div className={darkMode ? "card border-0 shadow p-5 bg-white" : "card border-0 shadow p-5 bg-white"}>
                        <div className='row align-items-center'>
                            <div className='col-xl-3 mb-4 text-center'>
                                <img src="/img/icons/phone.svg" alt="" style={{ width: "20px" }} />
                                <div className='h4 mt-3'>Telefon</div>
                                <div className='text-secondary'>499401, 499402, 499403</div>
                            </div>
                            <div className='col-xl-3 mb-4 text-center'>
                                <img src="/img/icons/loc.svg" alt="" style={{ width: "20px" }} />
                                <div className='h4 mt-3'>Salgymyz</div>
                                <div className='text-secondary'>Aşgabat ş., Oguzhan köç., 13 "A"</div>
                            </div>
                            <div className='col-xl-3 mb-4 text-center'>
                                <img src="/img/icons/phone.svg" alt="" style={{ width: "20px" }} />
                                <div className='h4 mt-3'>Iş wagtlarymyz</div>
                                <div className='text-secondary'>09:00-dan, 22:00 çenli</div>
                            </div>
                            <div className='col-xl-3 mb-4 text-center'>
                                <img src="/img/icons/email.svg" alt="" style={{ width: "20px" }} />
                                <div className='h4 mt-3'>E-mail salgymyz</div>
                                <div className='text-secondary'>it@sanly.tm</div>
                            </div>
                        </div>

                        <div className='t-3'>
                            <iframe title='0' src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d29427.223293100265!2d52.85261334369845!3d39.96563932613931!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1str!2s!4v1675774508961!5m2!1str!2s" style={{ border: "1px", width: "100%", height: "500px" }} allowFullScreen loading="lazy"></iframe>
                        </div>

                    </div>

                    <div className='text-center my-5'>
                        <div className='h6 ls-2 mb-3' style={{ color: "#1cc3b2" }}>Habarlaşmak</div>
                        <div className='h1'>Bize hat ugradyň</div>
                    </div>

                    <form className='row justify-content-center'>
                        <div className="col-xl-4 mb-4">
                            <input onChange={handleChange} name='name' type="text" className="form-control rounded-0" placeholder='Adynyz' autoComplete='off' />
                        </div>
                        <div className="col-xl-4 mb-4">
                            <input onChange={handleChange} name='email' type="email" className="form-control rounded-0" placeholder='E-mail adresiniz' autoComplete='off' />
                        </div>
                        <div className="col-xl-8 mb-4">
                            <input onChange={handleChange} name='subject' type="text" className="form-control rounded-0" placeholder='Temasy' autoComplete='off' />
                        </div>
                        <div className="col-xl-8 mb-4">
                            <textarea onChange={handleChange} name='comment' typeof='string' className="form-control rounded-0" rows="6" placeholder='Mazmuny'></textarea>
                        </div>
                        <div className="col-xl-5 mb-4 text-center">
                            <button onClick={handleClick} className='btn btn-primary px-5'>Ugrat</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Contact