import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import swal from 'sweetalert'
import "./Sidebar.css"
import { AuthContext } from '../../../Contexts/AuthContext'

export default function Sidebar() {
  const navigate = useNavigate()

  const authContext = useContext(AuthContext)


  const logout = (e) => {
    e.preventDefault()
    console.log("logged out");


    swal({
      title: "با موفقیت خارج شدید.",
      icon: "success",
      buttons: "تائید",
    }).then(() => {
      authContext.logout()
      navigate("/");
    })

  }

  return (
    <div id="sidebar" className="col-2">
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <a href="#">
            <img src="/images/logo/Logo.png" alt="Logo" />
          </a>
        </div>

        <div className="sidebar-menu-btn">
          <i className="fas fa-bars"></i>
        </div>
      </div>
      <div className="sidebar-menu">
        <ul>
          <li className="active-menu">
            <Link to="/p-admin">
              <span>صفحه اصلی</span>
            </Link>
          </li>
          <li>
            <Link to="courses">
              <span>دوره ها</span>
            </Link>
          </li>
          <li>
            <Link to="sessions">
              <span>جلسات دوره ها</span>
            </Link>
          </li>
          <li>
            <Link to="articles">
              <span>مقاله ها</span>
            </Link>
          </li>
          <li>
            <Link to="users">
              <span>کاربران</span>
            </Link>
          </li>
       <li>
         <Link to="category">
           <span>دسته‌بندی‌ها</span>
         </Link>
       </li>
       <li>
         <Link to="contacts">
           <span>پیغام‌ها</span>
         </Link>
       </li>
       <li>
         <Link to="menus">
           <span>منوها</span>
         </Link>
       </li>
          <li onClick={(e) => logout(e)}>
            <a href="#">
              <span>خروج</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}
