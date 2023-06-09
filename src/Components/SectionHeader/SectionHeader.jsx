import React from 'react'
import { Link } from 'react-router-dom'

import './SectionHeader.css'

export default function SectionHeader({title, subTitle, btnTitle, pathname}) {
  return (
    <div className="courses-header">
                    <div className="courses-header__right">
                        <span className="courses-header__title title">{title}</span>
                        <span className="courses-header__text">{subTitle} </span>
                    </div>
                   {
                    btnTitle ? (
                        <div className="courses-header__left">
                        <Link to={pathname} className="courses-header__link">
                          {btnTitle}
                            <i className="fas fa-arrow-left courses-header__icon"></i>
                        </Link>
                    </div>
                    ) : null
                   }
                </div>
  )
}
