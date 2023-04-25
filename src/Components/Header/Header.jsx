import React, { useEffect, useState } from 'react'
import Landing from '../Landing/Landing'
import Navbar from '../Navbar/Navbar'
import Topbar from '../Topbar/Topbar'
import './Header.css'

export default function Header() {
    const [indexInfo, setIndexInfo] = useState({})

    useEffect(() => {
        fetch("http://127.0.0.1:8000/v1/infos/index")
            .then(res => res.json())
            .then(info => {
                console.log(info)
                setIndexInfo(info)
            })
    }, [])
    return (
        <header className="header">
            <Topbar />
            <Navbar />
            <Landing info={indexInfo} />
        </header>
    )
}
