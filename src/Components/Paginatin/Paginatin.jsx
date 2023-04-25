import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import './Paginatin.css'

export default function Paginatin({ pathname, items, itemsCount, setShownCourses }) {

  const [pageCount, setPageCount] = useState(null)
  const { page } = useParams()

  useEffect(() => {
    let lastIndex = itemsCount * page
    let firstIndex = lastIndex - itemsCount
    let paginatedItems = items.slice(firstIndex, lastIndex)
    setShownCourses(paginatedItems)

    let pageTotal = Math.ceil(items.length / itemsCount)
    setPageCount(pageTotal)
  }, [page, items])
  return (
    <div className="courses-pagination">
      <ul className="courses__pagination-list">
        <li className="courses__pagination-item">
          <Link to={
            page > 1 ? `${pathname}/${page - 1}` : `${pathname}/${page}`
          }
            className="courses__pagination-link">
            <i className="fas fa-long-arrow-alt-right courses__pagination-icon"></i>
          </Link>
        </li>
        {
          Array(pageCount).fill(0).map((item, index) => (
            <li key={index} className="courses__pagination-item">
              <Link to={`${pathname}/${(index + 1)}`}
                className={
                  (index + 1) == page ? "courses__pagination-link courses__pagination-link--active " : 'courses__pagination-link'
                }>
                {index + 1}
              </Link>
            </li>
          ))
        }
        <li className="courses__pagination-item">
          <Link
            to={
              page >= pageCount ? `${pathname}/${pageCount}` :  `${pathname}/${Number(page) + 1}`
            } className="courses__pagination-link">
            <i className="fas fa-long-arrow-alt-left courses__pagination-icon"></i>
          </Link>
        </li>
      </ul>
    </div>
  )
}
