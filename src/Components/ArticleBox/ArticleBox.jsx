import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import CircleSpinner from '../CircleSpinner/CircleSpinner'

import './ArticleBox.css'

export default function ArticleBox({ cover, title, description, shortName }) {
  const [isShowImage, setIsShowImage] = useState(false)

  return (
    <div className="col-4">
      <div className="article-card">
        <div className="article-card__header">
          <Link to={`/article-info/${shortName}`}>
            <img
              src={`http://127.0.0.1:8000/courses/covers/${cover}`}
              alt="Course img"
              className="course-box__img"
              onLoad={() => setIsShowImage(true)} />
            {
              !isShowImage ? (
                <CircleSpinner />
              ) : null
            }
          </Link>
        </div>
        <div className="article-card__content">
          <Link to={`/article-info/${shortName}`}>
            {title}</Link>
          <p className="article-card__text">
            {description}</p>
          <Link to={`/article-info/${shortName}`}>بیشتر بخوانید</Link>
        </div>
      </div>
    </div>
  )
}
