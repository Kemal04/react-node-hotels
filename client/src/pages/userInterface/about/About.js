import React, { useContext } from 'react'
import BannerImg from '../../../components/banner/BannerImg'
import { ThemeContext } from '../../../context/ThemeContext'
import './about.css'

import about_1 from "../../../assets/cards/about/4.jpg"
import about_5 from "../../../assets/cards/about/5.jpg"
import about_6 from "../../../assets/cards/about/6.jpg"
import about_7 from "../../../assets/cards/about/7.jpg"
import signature from "../../../assets/icons/signature.png"

const About = () => {

    const { darkMode } = useContext(ThemeContext)

    return (
        <>
            <BannerImg name="Biz Barada" />
            <div className={darkMode ? "bg-dark text-white" : "bg-white text-dark"}>
                <div className='container py-5'>
                    <div className='row align-items-center justify-content-between'>
                        <div className='col-xl-5'>
                            <img src={about_1} alt="About Us" className='img-fluid rounded-3' />
                        </div>
                        <div className='col-xl-6'>
                            <div className='h6 ls-2 mb-3' style={{ color: "#1cc3b2" }}>Biz Barada</div>
                            <div className='h2 mb-5'>20 Ýyllyk Tejribe</div>
                            <div className='text-secondary mb-3 w-75'>
                                Myhmanhana: Adamlaryň belli bir töleg üçin wagtlaýyn bolup, iýmit zerurlyklaryny kanagatlandyrýan ýeri.
                            </div>
                            <div className='text-secondary mb-3 w-75'>
                                Stayaşaýan ýerleri ýa-da tanyşlarynyň öýleri ýa-da howpsuz ýerleri. Soň bolsa ýygy-ýygydan gatnaşyp, söwda edip başladylar.
                            </div>
                            <img src={signature} alt="Signature" className='img-fluid mt-5' />
                        </div>
                    </div>
                </div>

                <div className='about-bg-fixed d-flex align-items-center my-5'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-lg-12 text-center mb-3 text-white small'>
                                Web Sahypasy barada düşünje
                            </div>
                            <div className='col-lg-12 text-center mb-3 text-white h2'>
                                Web Sahypasyna düşünmedim,<br /> näme etmeli ?
                            </div>
                        </div>
                    </div>
                </div>

                <div className='container py-5'>
                    <div className='text-center mb-5'>
                        <div className='h6 ls-2 mb-3' style={{ color: "#1cc3b2" }}>Hyzmatlar</div>
                        <div className='h1'>Biziň Otelimiz we Otaglarymyz</div>
                    </div>
                    <div className='row'>
                        <div className='col-xl-4 mb-5'>
                            <div className='position-relative card-about'>
                                <img src={about_5} alt="About Us" className='img-fluid' />
                                <div className='position-absolute bottom-0 start-0 w-100 footer-rgba text-center'>
                                    <div className='h5 text-white py-3'>
                                        Restorant we Bar
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-xl-4 mb-5'>
                            <div className='position-relative card-about'>
                                <img src={about_6} alt="About Us" className='img-fluid' />
                                <div className='position-absolute bottom-0 start-0 w-100 footer-rgba text-center'>
                                    <div className='h5 text-white py-3'>
                                        Spa & Fitnes
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-xl-4 mb-5'>
                            <div className='position-relative card-about'>
                                <img src={about_7} alt="About Us" className='img-fluid' />
                                <div className='position-absolute bottom-0 start-0 w-100 footer-rgba text-center'>
                                    <div className='h5 text-white py-3'>
                                        Howuzlar
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default About