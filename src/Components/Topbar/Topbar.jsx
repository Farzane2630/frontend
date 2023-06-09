import React, { useEffect, useState } from 'react'
import { memo } from 'react'
import { Link } from 'react-router-dom'

import './Topbar.css'

export default memo(function Topbar() {
    const [getAllLinks, setGetAllLinks] = useState([])
    const [indexInfo, setIndexInfo] = useState({})

    useEffect(() => {
        fetch("http://127.0.0.1:8000/v1/infos/index")
            .then(res => res.json())
            .then(info => {
                console.log(info)
                setIndexInfo(info)
            })
    }, [])

    useEffect(() => {
        fetch("http://127.0.0.1:8000/v1/menus/topbar")
            .then(res => res.json())
            .then(links => {
                setGetAllLinks(links)
            })
    }, [])

    const getRandomLinks = (arr, randomCount) => {
        const shuffle = [...arr].sort(() => 0.5 - Math.random())
        return shuffle.slice(0, randomCount)
    }

    return (
        <div className="top-bar">
            <div className="container-fluid">
                <div className="top-bar__content">
                    <div className="top-bar__right">
                        <ul className="top-bar__menu">
                            {
                                getRandomLinks(getAllLinks, 4).map(link => (
                                    <li key={link._id} className="top-bar__item">
                                        <Link to={link.href} className="top-bar__link">
                                            {link.title}
                                        </Link>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    <div className="top-bar__left">
                        <div className="top-bar__email">
                            <a href="#" className="top-bar__email-text top-bar__link">
                                {/* sabzlearn@gmail.com */}
                                {
                                    indexInfo.email
                                }
                            </a>
                            <i className="fas fa-envelope top-bar__email-icon"></i>
                        </div>
                        <div className="top-bar__phone">
                            <a href="#" className="top-bar__phone-text top-bar__link">
                                {/* 09921558293 */}
                                {
                                    indexInfo.phone
                                }
                            </a>
                            <i className="fas fa-phone top-bar__phone-icon"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
})
