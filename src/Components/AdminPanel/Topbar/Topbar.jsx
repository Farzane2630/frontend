import React, { useEffect, useState } from 'react'
import "../../../Pages/AdminPanel/Index/AdminPanel.css"

export default function Topbar() {

   const [adminInfos, setAdminInfos] = useState([])
   const [adminINotifs, setAdminNotis] = useState([])
   const [isShowNotifs, setIsShowNotifs] = useState(false)

   useEffect(() => {
      const userLocalStorage = JSON.parse(localStorage.getItem("user"));

      fetch("http://127.0.0.1:8000/v1/auth/me", {
         headers: {
            Authorization: `Bearer ${userLocalStorage.token}`,
         }
      })
         .then((res) => res.json())
         .then(data => {
            setAdminInfos(data)
            setAdminNotis(data.notifications)
         })
   }, [notifSeen])

   function notifSeen(notifID) {

      const userLocalStorage = JSON.parse(localStorage.getItem("user"));

      fetch(`http://127.0.0.1:8000/v1/notifications/see/${notifID}`, {
         method: "PUT",
         headers: {
            "Authorization": `Bearer ${userLocalStorage.token}`,
         }
      }).then(res => res.json())
   }

   return (
      <div className="container-fluid">
         <div className="container">
            <div className={`home-header ${isShowNotifs ? "active-modal-notfication" : ""}`}>
               <div className="home-right">
                  <div className="home-searchbar">
                     <input type="text" className="search-bar" placeholder="جستجو..." />
                  </div>
                  <div className="home-notification">
                     <button type="button"
                        onMouseEnter={() => setIsShowNotifs(true)}
                        >
                        <i className="far fa-bell"></i>
                     </button>
                  </div>
                  <div className="home-notification-modal"
                     onMouseEnter={() => setIsShowNotifs(true)}
                     onMouseLeave={() => setIsShowNotifs(false)}
                  >
                     <ul className="home-notification-modal-list">
                        {
                           adminINotifs.length === 0 ? (
                              <li className="home-notification-modal-item">
                                 نوتیفکیشنی برای نمایش وجود ندارد
                              </li>
                           ) : (
                              adminINotifs.map(notif => (
                                 <li key={notif._id} className="home-notification-modal-item">
                                    <span className="home-notification-modal-text">
                                       {notif.msg}
                                    </span>
                                    <label className="switch">
                                       <a href="javascript:void(0)"
                                          onClick={() => notifSeen(notif._id)}
                                       >
                                          seen
                                       </a>
                                    </label>
                                 </li>
                              ))
                           )
                        }

                     </ul>
                  </div>
               </div>
               <div className="home-left">
                  <div className="home-profile">
                     <div className="home-profile-image">
                        <a href="#">
                           <img src={adminInfos.profile} alt="" />
                        </a>
                     </div>
                     <div className="home-profile-name">
                        <a href="#">{adminInfos.name}</a>
                     </div>
                     <div className="home-profile-icon">
                        <i className="fas fa-angle-down"></i>
                     </div>
                  </div>
               </div>
            </div>
         </div >
      </div >
   )
}
